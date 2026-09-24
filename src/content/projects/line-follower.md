---
title: Line follower robot
description: A three-sensor line follower that corrects its path on curves and junctions.
date: 2025-11-21
tools: [Arduino, L298N, IR sensors]
repo: https://github.com/hahahibaa/line-follower-robot-pid-control
featured: false
---

Three IR reflective sensors, left, centre and right, pick up the contrast between a black line and a white surface. The centre sensor keeps the robot tracking straight, and when either side sensor catches the line, the Arduino adjusts motor speeds through an L298N driver to steer back on course. That's enough to handle curves and junctions without losing the line.

Hardware: an Arduino Uno or Nano, an L298N driver, three IR reflective sensors, BO motors, wheels, a battery pack and a chassis. The repo has the code, the circuit diagram and an explanation of the sensor logic.

<!-- TODO: add a video of it running a track -->
