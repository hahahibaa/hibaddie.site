---
title: EMG-controlled robotic hand
description: A robotic hand driven by muscle signals picked up with gel electrodes and a BioAmp EXG Pill.
date: 2026-03-05
tools: [ESP32, BioAmp EXG Pill, gel electrodes]
repo: https://github.com/hahahibaa/emg-controlled-robotic-hand-
featured: true
---

Muscle signals are captured with gel electrodes and amplified by a BioAmp EXG Pill. An ESP32 processes them and drives the hand, so flexing a forearm muscle closes the fingers.

The project is an exercise in bio-signal acquisition, embedded processing and human–machine interfaces: getting a usable signal out of noisy skin-surface electrodes, then turning it into a movement that feels responsive rather than laggy.

<!-- TODO: hand mechanism and servos, electrode placement, filtering and thresholds, and a demo video -->
