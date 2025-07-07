"use client";

export function useFloatingLayer(
  parent: HTMLElement | null | undefined,
  id = "radial-polygon-floating-container",
) {
  if (typeof window === "undefined") return null;

  if (!document.getElementById(id) && parent) {
    const container = document.createElement("div");
    container.id = id;
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.zIndex = "0";
    container.style.pointerEvents = "none";

    // make it the first child of the parent
    parent.insertBefore(container, parent.firstChild);
  }
  return document.getElementById(id);
}
