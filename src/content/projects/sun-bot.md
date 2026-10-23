---
title: sun_bot, a robot that keeps a plant in the sun
description: A ROS 2 robot that maps a warehouse, learns where the sun lands each hour, then chases the light to keep a potted plant in it.
date: 2026-10-23
tools: [ROS 2 Humble, Gazebo Fortress, Nav2, slam_toolbox, Python]
repo: https://github.com/hahahibaa/sun_bot
featured: true
---

A small differential-drive robot carries a potted plant around a closed warehouse and keeps it in the sunlight.

The warehouse is 20 × 12 m with a roof, so light only gets in through three 2 m windows facing east, south and west. The bright patches those windows cast move, shrink and vanish as the sun crosses the sky. The robot maps the room, learns on day 1 where the sun lands at each hour, and from day 2 drives to the sun, creeps into it, follows it as it moves, waits out clouds, and honks when the plant is thirsty.

Everything runs in simulation with ROS 2 Humble, Gazebo Fortress and Nav2, with a physically based sun computed for Jabalpur (23.18° N, 79.95° E).

**Videos:** [the full day demo](https://youtu.be/Y-nxJU4SM40) · [following the sun at the east window](https://youtu.be/7o5_FzFHMYk) · [the plant buzzing when it dries out](https://youtube.com/shorts/SMcU9C-fGbg) · [building the map with SLAM](https://youtu.be/y3u-i91V3TA)

## Does learning actually beat just parking?

Three strategies, same simulated day, same random clouds:

| strategy | panel in the sun | sun energy | distance driven |
| -------- | ---------------- | ---------- | --------------- |
| Park at the best window spot (south) | 32 % of daylight | 0.82 A·h | 5 m |
| Greedy: wander and follow the light sensors | 19 % | 0.42 A·h | 97 m |
| **Learn where the sun lands, then chase it** | **50 %** | **1.27 A·h** | 37 m |

Learning collects **54 % more sun energy than the best parking spot, and three times more than the greedy approach**.

**Why parking isn't enough:** each window's patch only covers its parking spot for part of the day. East works from 08:45 to 09:40, south from 10:05 to 14:05, west from 14:12 to 15:07, because the patches slide across the floor as the sun moves.

**Why greedy fails:** indoor light sits at about 300 lux almost everywhere, so away from a patch the light sensors give no hint which way the sun is. There's nothing to follow until the robot is already touching sunlight, and patches cover only about 1 % of the floor at any moment. Finding one by wandering is mostly luck.

## How it works

The system splits cleanly in two.

**`sun_sensor` plays the physical world.** It computes the sun's position from the NOAA equations, casts each window's light onto the floor (including the window reveal and the pallets' shadows), and fakes the robot's sensors from its true pose: a 10 W panel on the roof reporting current, and four light sensors on the body edges reporting lux. It also rolls random clouds.

**`sun_brain` only sees what a real robot would:** its AMCL pose, the panel current, the edge sensors, the lidar and the clock. It runs as a state machine. On day 1 it surveys every sunlit window every two hours and saves the best spot per hour to a YAML file. From day 2 it picks the best learned spot for the current time, drives there with Nav2, creeps into the light using the edge sensors, tracks the patch as it slides, holds still when a cloud dims everything at once, and parks for the night.

Every motion goes through a collision monitor that stops the robot when anything comes within 30 cm.

## Building it up

The warehouse and robot were generated from a script: a 0.4 × 0.3 m box on two wheels and a caster, with the pot on top and a 360° lidar to map the floor. `slam_toolbox` builds the map while the robot drives a fixed route. The lidar scans at 0.26 m, well below the windows, so they show up as solid wall and had to be marked by hand from the building plan.

The safety stop was tested by spawning a box 0.28 m in front of the robot while it drove at 0.25 m/s. It stopped 0.13 m short, waited while the box was there, and carried on once it was removed. The trade-off is that anything parked inside the 30 cm zone blocks the robot completely, since the stop zone also prevents turning and backing up.

<!-- TODO: add the replay GIF and the strategies plot. They're in the repo under docs/ — the GIF is 8.7 MB, so compress it before putting it in public/images/ -->
