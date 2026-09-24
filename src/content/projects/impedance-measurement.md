---
title: Temperature-dependent impedance measurement system
description: Automating an LCR meter to sweep impedance across frequency while controlling and logging sample temperature.
date: 2026-06-28
tools: [Python, Arduino Uno, PT100 + MAX31865, Newtons4th PSM1735]
repo: https://github.com/hahahibaa/LCR-Meter
featured: true
---

Built with Sohum Biswas at the Smart Materials Lab, IIT Indore.

## The goal

The lab had a capable LCR meter (a Newtons4th PSM1735 NumetrIQ) sitting mostly unused. We wanted to make it easy to run **temperature-dependent impedance measurements**: sweep across frequencies, log the sample temperature, and capture everything to Excel with live plots, all from one application. The target range went down to −200 °C.

An LCR meter applies a small AC signal and measures the resulting voltage and current. From that it derives inductance, capacitance, resistance, |Z|, phase, Q-factor and loss tangent. Sweeping the frequency builds up Bode or Nyquist curves that characterise dielectrics, sensors and thin films.

## It took three tries

**Try 1: the lab's iTherm ULT-99 controller.** We spent a lot of effort decoding its Modbus protocol, then found out it only goes down to −99 °C. We abandoned it.

**Try 2: thermocouple + MAX31856 + ESP32.** The wiring worked and the readings checked out, until the thermocouple junction got accidentally cut. A makeshift repair wasn't good enough, and we lost two days.

**Try 3: PT100 + MAX31865 + Arduino Uno.** We switched to an industrial PT100 RTD with a MAX31865 converter. The Arduino runs PID control and switches heating through a relay. Temperature control was stable and reliable, and this is the version that works.

## What the software does

- Talks to the PSM1735 over USB using its ASCII command set
- Runs frequency sweeps and records the full set of impedance parameters
- Logs temperature alongside every measurement
- Plots results live and exports to Excel

<!-- TODO: add a photo of the setup and a sample plot, e.g.
![Measurement setup](/images/lcr-setup.jpg) -->

## Thanks

Prof. Somadiya Sen for lab access and the idea, Mohd Vasim Sir for guidance, and the lab team.
<!-- TODO: double-check the spelling of names -->
