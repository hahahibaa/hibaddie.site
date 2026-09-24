---
title: SCARA colour-sorting robot
description: A 4-DOF SCARA arm that learns with PPO to pick up coloured cubes and drop them in matching bins, deployed on ROS 2.
date: 2026-08-13
tools: [ROS 2 Humble, PyBullet, PPO, OpenCV, Python]
repo: https://github.com/hahahibaa/scara_ws
featured: true
---

A 4-DOF SCARA arm (RRPR) learns, through reinforcement learning, to pick up a coloured cube and drop it in the bin that matches its colour. Training happens in PyBullet. The trained policy then runs as a ROS 2 node, driving a PyBullet-backed simulator, with an OpenCV node supplying the object detections.

<!-- TODO: add a GIF of the arm sorting cubes, e.g. ![SCARA sorting](/images/scara.gif) -->

## Why PyBullet and not Gazebo for training

PPO needs on the order of a million environment steps. Gazebo runs at roughly real time, so that would take days of wall-clock time. PyBullet in `DIRECT` mode with 8 parallel workers covers the same number of steps in about **15 minutes**. Gazebo is still set up for visualisation, but the learning doesn't happen there.

## The system

- **`scara_kinematics.py`:** the single source of truth for link lengths, joint limits, bin positions and the camera model, plus forward kinematics and closed-form inverse kinematics
- **`scara_env.py` + `train_ppo.py`:** a Gymnasium environment and PPO training, with progress tracked in TensorBoard
- **`vision_node.py`:** HSV colour detection that publishes `DetectedObject` messages
- **`policy_node.py`:** runs the trained policy against live ROS 2 topics
- **`sim_node.py`:** PyBullet exposed on the ROS graph

## The robot

| joint          | type      | range         |
| -------------- | --------- | ------------- |
| `shoulder_pan` | revolute  | ±135°         |
| `elbow_pan`    | revolute  | ±145°         |
| `z_lift`       | prismatic | −0.27 … 0 m   |
| `wrist_roll`   | revolute  | ±180°         |

Planar reach is 0.05–0.45 m, and tool tip height is 0.00–0.27 m.

## Design decisions

- **The analytic IK is kept as a baseline.** A SCARA's inverse kinematics has an exact closed-form solution, which the RL policy can only approximate. That makes it a good yardstick for how well the policy has learned.
- **The policy isn't told where the bins are.** It only gets the colour as a one-hot input and has to discover the colour-to-bin mapping by exploring. The reach phase is learned early; the sorting takes longer.
- **Bins are visual-only discs.** Solid walls would add collisions the policy has to fight through, which is a different and much harder problem.
- **Gripping is a proximity-triggered constraint** rather than simulated finger contact, which suits a suction-style SCARA end effector.

## Results

Evaluated over 90 episodes, 30 per colour:

| colour | success rate | episodes |
| ------ | ------------ | -------- |
| red    | 100.0 %      | 30       |
| green  | 100.0 %      | 30       |
| blue   | 100.0 %      | 30       |
| total  | 100.0 %      | 90       |

The arm averages **47 steps, about 1.6 seconds, to place a cube**. Since the policy is never told where the bins are, that means the colour-to-bin mapping was learned entirely through exploration.

## Known limitations

That 100% is a simulation number. Two things would need fixing before this goes near real hardware.

**No margin on the Z axis.** The policy drives `z_lift` all the way down to −0.2700 m, which is its hard mechanical limit, leaving zero clearance. In simulation that costs nothing. On a real table, a millimetre of tilt, a slightly taller workpiece or a bit of tracking overshoot would put the tool tip into the table or the mechanical stop. The fix is a cushion above the limit that the policy is never allowed to spend.

**No recovery when vision drops.** The ROS 2 policy bridge has no search or retry state. If a detection is missed or the cube is occluded, the arm just waits, indefinitely. Real hardware needs a watchdog and a search behaviour instead of a silent stall.

<!-- TODO: optional, add training curves from TensorBoard and a comparison against the analytic IK baseline -->
