(() => {
  "use strict";
  const header = document.querySelector(".refined-header");
  const menu = document.getElementById("mobile-navigation");
  const menuButton = document.querySelector(".mobile-menu-button");
  const setMenu = (open, restoreFocus = false) => {
    menu.hidden = !open;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    if (restoreFocus) menuButton.focus();
  };
  menuButton.addEventListener("click", () => setMenu(menu.hidden));
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) setMenu(false, true);
  });
  window
    .matchMedia("(min-width: 992px)")
    .addEventListener("change", (event) => {
      if (event.matches) setMenu(false);
    });
  const updateHeader = () =>
    header.classList.toggle("is-scrolled", window.scrollY > 50);
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
  document.getElementById("copyright-year").textContent =
    new Date().getFullYear();

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -10px 0px" },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
    document.documentElement.classList.add("motion-ready");
    reducedMotion.addEventListener("change", (event) => {
      if (event.matches) {
        document.documentElement.classList.remove("motion-ready");
        observer.disconnect();
      }
    });
  }

  let toastTimer;
  document.getElementById("copy-email").addEventListener("click", async () => {
    const toast = document.getElementById("copy-toast");
    clearTimeout(toastTimer);
    try {
      await navigator.clipboard.writeText("artem.yaroshenko0513@gmail.com");
      toast.textContent = "Email copied successfully";
    } catch {
      toast.textContent =
        "Couldn’t copy automatically. Select the email address or use the email link.";
    }
    toast.classList.add("show");
    toastTimer = setTimeout(() => toast.classList.remove("show"), 4500);
  });
})();
