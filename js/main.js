(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("is-open"));
      document.body.classList.toggle("menu-open", nav.classList.contains("is-open"));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  document.querySelectorAll("form[data-demo]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const success = form.querySelector(".form-success");
      const original = btn?.textContent;
      if (btn) {
        btn.textContent = "Richiesta inviata ✓";
        btn.disabled = true;
      }
      success?.classList.add("is-visible");
      setTimeout(() => {
        form.reset();
        if (btn) {
          btn.textContent = original;
          btn.disabled = false;
        }
        success?.classList.remove("is-visible");
      }, 2400);
    });
  });

  document.querySelectorAll(".filter-bar").forEach((bar) => {
    bar.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        bar.querySelectorAll(".filter-chip").forEach((item) => item.classList.remove("is-active"));
        chip.classList.add("is-active");
      });
    });
  });
})();
