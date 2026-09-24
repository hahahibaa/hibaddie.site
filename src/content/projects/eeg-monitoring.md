---
title: EEG-based mental health monitor
description: Reading EEG signals with a BioAmp EXG Pill and streaming them to a live web dashboard.
date: 2026-03-12
tools: [BioAmp EXG Pill, ESP8266, React, Vite]
repo: https://github.com/hahahibaa/neuromentalhealth-monitor
featured: true
---

A mental health monitor built on EEG readings.

Electrodes feed a BioAmp EXG Pill, which amplifies the signal for an ESP8266. The board streams the data to a dashboard built with React and Vite, so the signal can be watched live in a browser. The repo also includes an EEG simulator, which lets the dashboard be developed and tested without wearing electrodes.

<!-- TODO: which features you extract (e.g. alpha/beta band power), what the dashboard shows, and why per-session calibration matters -->
