---
title: Automating a lab furnace
description: Putting a microcontroller in charge of a furnace so it runs alongside the LCR meter automation.
date: 2026-07-01
status: in progress
draft: false
---

The [LCR meter automation](/projects/impedance-measurement/) handles impedance sweeps and temperature logging. The missing piece was the furnace itself, which still had to be driven by hand.

I'm automating it with a microcontroller so that heating profiles and measurements run as one sequence: the furnace holds a setpoint, the LCR meter sweeps, and both are logged together.

<!-- TODO: microcontroller, how the furnace is switched, the temperature range, and how it talks to the LCR software -->
