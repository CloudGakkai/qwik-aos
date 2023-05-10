# Qwik AOS ⚡️

A suitable Animated on Scroll library for QwikJS.

## Installation

Using NPM:

```
npm install @cloudgakkai/qwik-aos
```

or
Using Yarn:

```
yarn add @cloudgakkai/qwik-aos
```

## Usage

```
import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { useAOS } from "@cloudgakkai/qwik-aos";

export default component$(() => {
    const { aosInit } = useAOS();

    useVisibleTask$(() => {
        aosInit();
    }, { strategy: "document-ready" })

    return (
        <div data-aos="fade-in">Your Content Here</div>
    )
})
```

### Attribute

You need to add `data-aos="animation-name"` to your HTML Element that you want to add animation.

### Animation

| Name            |
| --------------- |
| fade-in         |
| fade-up         |
| fade-down       |
| fade-right      |
| fade-left       |
| fade-up-right   |
| fade-up-left    |
| fade-down-right |
| fade-down-left  |
| flip-left       |
| flip-right      |
| flip-uo         |
| flip-down       |
| zoom-in         |
| zoom-in-up      |
| zoom-in-down    |
| zoom-in-right   |
| zoom-in-left    |
| zoom-out        |
| zoom-out-up     |
| zoom-out-down   |
| zoom-out-right  |
| zoom-out-left   |
| slide-up        |
| slide-down      |
| slide-right     |
| slide-left      |
