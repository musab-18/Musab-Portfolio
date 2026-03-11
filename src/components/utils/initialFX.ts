export function initialFX() {
  document.body.style.overflowY = "auto";
  document.getElementsByTagName("main")[0]?.classList.add("main-active");

  // Fade in landing text with CSS transitions
  const elements = [
    ".landing-info h3",
    ".landing-intro h2",
    ".landing-intro h1",
    ".header",
    ".icons-section",
    ".nav-fade",
  ];
  elements.forEach((selector, i) => {
    const els = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 100 + i * 80);
    });
  });
}
