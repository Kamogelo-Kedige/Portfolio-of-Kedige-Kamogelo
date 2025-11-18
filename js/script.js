// Theme Toggle
const html = document.documentElement;
const themeToggleDesktop = document.getElementById("theme-toggle-desktop");
const themeToggleMobile = document.getElementById("theme-toggle-mobile");

function toggleTheme() {
  html.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    html.classList.contains("dark") ? "dark" : "light"
  );
}

// Initialize theme from localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.classList.toggle("dark", savedTheme === "dark");
} else {
  html.classList.add("dark"); // Default to dark mode
}

if (themeToggleDesktop) {
  themeToggleDesktop.addEventListener("click", toggleTheme);
}

if (themeToggleMobile) {
  themeToggleMobile.addEventListener("click", toggleTheme);
}

// Image performance improvements:
// - Ensure non-critical images are lazy-loaded
// - Disable heavy animations on small screens to reduce CPU/GPU
(function optimizeImagesAndAnimations() {
  try {
    const imgs = Array.from(document.querySelectorAll("img"));
    imgs.forEach((img) => {
      // keep the hero/profile image high priority by class
      if (img.classList.contains("profile-image")) {
        img.loading = img.loading || "eager";
        img.decoding = img.decoding || "async";
        return;
      }
      // apply lazy loading and async decoding to non-critical images
      img.loading = img.loading || "lazy";
      img.decoding = img.decoding || "async";
    });

    // Reduce heavy animations and backdrop filters on small screens
    const smallScreen = window.matchMedia("(max-width: 600px)").matches;
    if (smallScreen) {
      // remove float animations
      document
        .querySelectorAll(
          ".animate-float, .animate-scale-in, .animate-gradient"
        )
        .forEach((el) => {
          el.classList.remove(
            "animate-float",
            "animate-scale-in",
            "animate-gradient"
          );
        });
      // reduce use of backdrop-filter by toggling a helper class
      document.documentElement.classList.add("reduced-motion-mobile");
    }
  } catch (e) {
    // fail silently — performance optimizations are progressive
    console.warn("perf init error", e);
  }
})();

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = mobileMenuToggle?.querySelector(".menu-icon");
const closeIcon = mobileMenuToggle?.querySelector(".close-icon");

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    const isActive = mobileMenu.classList.toggle("active");
    // toggle body scroll lock
    document.body.classList.toggle("menu-open", isActive);

    if (isActive) {
      menuIcon.style.display = "none";
      closeIcon.style.display = "block";
    } else {
      menuIcon.style.display = "block";
      closeIcon.style.display = "none";
    }
  });
}

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    // remove body scroll lock
    document.body.classList.remove("menu-open");
    menuIcon.style.display = "block";
    closeIcon.style.display = "none";
  });
});

// Smooth Scrolling for navigation links
function scrollToSection(event, href) {
  event.preventDefault();
  const targetId = href.substring(1);
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" });
  }
}

// Add smooth scrolling to all navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (href !== "#") {
      scrollToSection(e, href);
    }
  });
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Contact Form Submission
const contactForm = document.getElementById("contact-form");
const toast = document.getElementById("toast");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      if (response.ok) {
        showToast();
        contactForm.reset();
      } else {
        const data = await response.json();
        alert(
          data.error ||
            "There was a problem sending your message. Please try again later."
        );
      }
    } catch (error) {
      alert("Network error. Please try again later.");
    }
  });
}

function showToast() {
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll(".animate-scale-in").forEach((el) => {
  observer.observe(el);
});

// Add hover effects to project cards
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
});

// Add hover effects to skill categories
const skillCategories = document.querySelectorAll(".skill-category");
skillCategories.forEach((category) => {
  category.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.02)";
  });

  category.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
});

// Log page load
console.log(
  "%c🚀 Portfolio Loaded Successfully!",
  "color: #0bc5ea; font-size: 16px; font-weight: bold;"
);
console.log("%c👋 Thanks for visiting!", "color: #a855f7; font-size: 14px;");
