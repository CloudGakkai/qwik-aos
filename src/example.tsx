import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { useAOS } from "./hooks/useAos";

export const ExamplePage = component$(() => {
  const { aosInit } = useAOS();

  useVisibleTask$(
    () => {
      aosInit();
    },
    { strategy: "document-ready" }
  );

  return (
    <>
      <div data-aos="fade-in">Your Content Here</div>
    </>
  );
});
