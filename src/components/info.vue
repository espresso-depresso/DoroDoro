<script setup>
import { ref } from 'vue';
</script>

<template>
    <div class="container py-4 style-wrapper">
        <header class="mb-4 pb-3 border-bottom border-pastelpurple">
        <h1 class="font-bitcount fw-semibold text-darkpurple mb-3">
            Welcome to DoroDoro!
        </h1>
        <p class="text-darkpurple">
            DoroDoro is your tiny productivity sidekick for when your brain wants to do everything at once and your focus is doing the medieval dance of disappearing. It turns your work time into clear, manageable chunks so you can stop procrastinating, start moving, and actually finish what matters.
        </p>
        </header>

        <p class="mb-4 text-darkpurple">
        <span class="fw-semibold fs-5 font-bitcount">Why use DoroDoro?</span> Because it gives you a simple rhythm: start a timer, work without distractions, take a break, reset, repeat. It’s built to help you stay on task without turning your day into a chaotic pile of unfinished to-dos. The app lets you start, pause, and reset the timer, keep track of your work rounds, write tasks in a to-do list, and even search for music to set the mood while you focus.
        </p>

        <section class="card bg-pastelpurple bg-opacity-50 border-0 p-4 mb-4">
        <h2 class="font-bitcount fw-semibold text-darkpurple h3 mb-3">
            What is the Pomodoro technique?
        </h2>
        <p class="mb-3 text-darkpurple">
            The Pomodoro technique is a time-management method that breaks work into short, focused blocks and gives your brain a proper little reset in between. Instead of staring at a giant task and feeling overwhelmed, you work for a set period, then take a break, then repeat.
        </p>
        <p class="mb-0 text-muted">
            Why use it? Because most of us do better when we stop trying to sprint for hours and instead work in steady, focused bursts. Short work sessions help reduce mental fatigue, keep attention sharp, and make progress feel real.
        </p>
        </section>

        <section>
        <h2 class="font-bitcount fw-semibold text-darkpurple h3 mb-3">
            How to use DoroDoro
        </h2>
        <ul class="ps-3 d-flex justify-content-between  border-skyblue list-group">
            <li class="list-group-item mb-2 ps-2">
                <span class="badge bg-pastelpurple badge-pill">1</span>
                Start the timer and choose a focused work session.</li>
            <li class="list-group-item mb-2 ps-2">
                <span class="badge bg-pastelpurple badge-pill">2</span>
                Work on one task without getting distracted, using the countdown as your gentle accountability coach.</li>
            <li class="mb-2 list-group-item ps-2">
                <span class="badge bg-pastelpurple badge-pill">3</span>
                When the timer ends, take a short break and breathe for a moment.</li>
            <li class="mb-2 list-group-item ps-2">
                <span class="badge bg-pastelpurple badge-pill">4</span>
                Repeat the cycle to complete several rounds and build momentum.</li>
            <li class="mb-2 list-group-item ps-2">
                <span class="badge bg-pastelpurple badge-pill">5</span>
                Use the to-do list to organize tasks and mark them as done as you go.</li>
            <li class="mb-0 list-group-item ps-2">
                <span class="badge bg-pastelpurple badge-pill">6</span>
                Search for music when you want a little energy boost or a calm background vibe while you work.</li>
        </ul>
        </section>
    </div>
</template>


