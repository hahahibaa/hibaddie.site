---
title: ESP32 drone
description: A drone flight controller on an open-source ESP32 PCB, with IMU and barometer sensing and ESP-to-ESP wireless control.
date: 2026-03-05
tools: [ESP32, MPU6050, barometer, JLCPCB]
repo: https://github.com/hahahibaa/esp-32-drone
featured: false
---

A flight controller built around an ESP32, using an open-source PCB design from CircuitDigest that I had fabricated through JLCPCB.

An MPU6050 IMU handles attitude, a barometric sensor estimates altitude, and control comes over an ESP-to-ESP wireless link. Most of the work was in sensor interfacing and firmware rather than in the airframe.

<!-- TODO: frame, motors and props, how stabilisation is tuned, and first-flight notes -->
