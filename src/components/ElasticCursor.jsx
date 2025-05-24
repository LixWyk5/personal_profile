import { useEffect } from "react";

export default function ElasticCursor() {
  useEffect(() => {
    const dot = document.createElement("div");
    dot.className =
      "pointer-events-none fixed top-0 left-0 w-4 h-4 rounded-full bg-accent mix-blend-difference transition-transform duration-150 ease-out z-50";
    document.body.appendChild(dot);

    const move = (e) => {
      dot.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      dot.remove();
    };
  }, []);

  return null;
}
