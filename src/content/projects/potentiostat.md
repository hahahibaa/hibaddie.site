---
title: Potentiostat for a vacuum sputter coater
description: A potentiostat built to replace the broken Pirani gauge on a sputter coater, using a PT100 in a Wheatstone bridge and Keithley ICs for I–V measurement.
date: 2026-05-01
tools: [PT100, Wheatstone bridge, Keithley ICs]
featured: true
---

The Pirani gauge on the lab's vacuum sputter coater broke, so I built a potentiostat to take its place.

A PT100 temperature sensor sits inside the vacuum environment as one arm of a Wheatstone bridge, and Keithley ICs handle the I–V measurements. A Pirani gauge works by measuring how quickly a heated element loses heat to the surrounding gas, so with the right sensing electronics the same physics can be read out through a different instrument.

<!-- TODO: add the circuit, the calibration method, the pressure range it covers, and a photo of the setup -->
