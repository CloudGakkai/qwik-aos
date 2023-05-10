import { $, useStyles$, useStore } from "@builder.io/qwik";
import aosStyles from "../aos.css?inline";

interface AOSConfig {
  showThreshold: number;
  hideThreshold: number;
}

export const useAOS = () => {
  // Load CSS Animation
  useStyles$(aosStyles);

  // Config
  const config = useStore({
    showThreshold: 0.5,
    hideThreshold: 0.8,
  });

  // Function to check if an element is visible in the viewport
  const isInViewport = $(
    (element: HTMLElement, showThreshold = 0.5, hideThreshold = 0.8) => {
      const rect = element.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const visibleHeight =
        Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const visibleRatio = visibleHeight / rect.height;

      return visibleRatio >= showThreshold
        ? "show"
        : visibleRatio <= hideThreshold
        ? "hide"
        : "ignore";
    }
  );

  const getInitClass = $((animationClass: string) => {
    if (animationClass.startsWith("fade-")) {
      return "aos-init";
    } else if (
      animationClass.startsWith("flip-") ||
      animationClass.startsWith("zoom-")
    ) {
      return `${animationClass}-init`;
    } else {
      return null;
    }
  });

  const animateOnScroll = $(async (animatedElements: HTMLElement[]) => {
    animatedElements.forEach(async (element) => {
      const visibilityStatus = await isInViewport(element);
      const animationClass = element.getAttribute("data-aos")!;
      const initClass = await getInitClass(animationClass);

      if (visibilityStatus === "show") {
        element.classList.add(animationClass);
        if (initClass) element.classList.remove(initClass);
      } else if (visibilityStatus === "hide") {
        element.classList.remove(animationClass);
        if (initClass) element.classList.add(initClass);
      }
    });
  });

  const aosInit = $(async (initConfig?: AOSConfig) => {
    config.showThreshold = initConfig?.showThreshold ?? 0.5;
    config.hideThreshold = initConfig?.hideThreshold ?? 0.8;

    // Initialization
    const animatedElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-aos]")
    );
    for (let i = 0; i < animatedElements.length; i++) {
      const animationClass = animatedElements[i].getAttribute("data-aos")!;
      const initClass = await getInitClass(animationClass);
      if (initClass) {
        animatedElements[i].classList.add(initClass);
      }
    }

    // Event listeners
    window.addEventListener("scroll", () => animateOnScroll(animatedElements));
    window.addEventListener("resize", () => animateOnScroll(animatedElements));
  });

  return {
    aosInit,
    aosStyles,
  };
};
