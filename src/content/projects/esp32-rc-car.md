---
title: ESP32 RC car
description: A wirelessly controlled RC car driven from a phone, with 12 V motors on dual L298N drivers.
date: 2026-03-05
tools: [ESP32, L298N, buck converter, 12 V DC motors]
featured: false
repo: https://github.com/hahahibaa/esp-based-rc-car
---

An ESP32 handles both the wireless link to a phone and the motor control logic.

Two 12 V, 200 RPM DC motors are wired diagonally across a pair of L298N drivers, and a buck converter steps the battery voltage down for the electronics.

<!-- TODO: the phone control interface, wiring diagram, and photos -->
