---
title: Making a transformer DC supply programmable
description: Adding a microcontroller-driven power stage to a fixed-output bench supply so it becomes a regulated, programmable source.
date: 2026-08-01
status: working
draft: false
---

The lab's transformer-based supply gave a fixed DC output after rectification and filtering, which is fine until you need a specific voltage.

I added a controllable power stage between the rectified DC bus and the load: a switching element driven by a microcontroller. Output voltage and current are sensed continuously and fed back to the controller, which adjusts the switching duty cycle to hold the output at whatever value it has been programmed to. The result is a programmable, regulated DC source with current limiting and protection, built on top of the supply that was already there.

<!-- TODO: which microcontroller and switching element, the voltage and current range, and a photo -->
