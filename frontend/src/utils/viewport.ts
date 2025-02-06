const setRealVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
window.addEventListener("DOMContentLoaded", setRealVh);
window.addEventListener("resize", setRealVh);
window.addEventListener("orientationchange", setRealVh);
document.body.addEventListener(
  "touchmove",
  (e: any) => {
    if (e.scale !== 1) e.preventDefault();
  },
  { passive: false }
);
