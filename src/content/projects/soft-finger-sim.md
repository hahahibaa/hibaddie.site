---
title: Soft pneumatic finger simulation
description: MATLAB and SoRoSim models of an Ecoflex soft finger, from hyperelastic bending to valve dynamics and cascade PID control.
date: 2026-10-17
tools: [MATLAB, SoRoSim, Cosserat rod, PID]
repo: https://github.com/hahahibaa/soft-finger-sim
featured: true
---

Simulation-first groundwork for a December internship at a soft robotic gripper lab. Every number here comes from simple models with literature or guessed parameters, so they show **trends and design trade-offs**, not final values. The lab work is to measure the real finger and calibrate the models against it.

**The baseline finger:** 100 × 20 × 17 mm, with one 12 mm air chamber, 2 mm side walls and a 3 mm strain-limiting bottom layer, cast in Ecoflex 00-30 (shear modulus around 25 kPa).

## What each step shows

**1. Material model.** Neo-Hookean holds up to about 30% stretch (8% error against Yeoh), but is off by 21% at 50% and 73% at 100%.

**2. Pressure to bend angle.** About 111° at 10 kPa. The model over-predicts past roughly 16 kPa because it ignores wall ballooning.

**3. Design sweeps.** Pressure needed for a 90° bend: 9 kPa for Ecoflex 00-30, 17 kPa for 00-50, 29 kPa for Dragon Skin 10, and 89 kPa for Elastosil. Thinner side walls bend more. Bottom-layer thickness barely matters in this model, which is worth checking in the lab.

**4. Valve sizing.** A 1.2 mm valve hits 90% pressure in 0.16 s but overshoots to 130° and wobbles. A 0.6 mm valve takes 0.64 s and is smooth. 0.3 mm is too slow.

**5. Control.** Tested against a finger 20% stiffer than the model. Pressure-only control ends up to 20° off target, and a single PID from angle straight to the valves oscillated badly. A two-loop cascade (angle → target pressure → valves) lands within 1.5° with almost no overshoot.

**6. Grip force.** Only about 0.2–0.3 N at the fingertip at 20 kPa. Pinching a 60 g egg by friction with three fingers needs around 50 kPa, so a wrapping grasp is the better strategy.

**7. Cosserat-rod cross-check.** The same finger modelled in SoRoSim bends 11.5°/kPa, linearly. The Step 2 hyperelastic model starts about 25% lower and catches up by 12 kPa, where both land at 136–138°. Two very different models agreeing that closely is a good sign.

## Known limits

No chamber-wall ballooning, so large-bend predictions run high. The finger's springiness (4 Hz, damping 0.15) and the valve discharge coefficient are guesses. Real solenoids switch on and off with PWM rather than opening smoothly. The PID gains came from a coarse grid search, and several sit at the edge of the grid.

## What December measures

Bend angle vs pressure to fit the shear modulus, video of a fast inflate and vent to fit the damping guess, tip force with a load cell to check the grip estimate, and the two-loop controller running on an ESP32 with a pressure sensor and an IMU. Comparing a simple model against the real finger, then calibrating it, is a small paper's worth of results.
