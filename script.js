const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const navLinks = [...document.querySelectorAll(".nav a")];
const sectionTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const matchingLink = navLinks.find(
        (link) => link.getAttribute("href") === `#${entry.target.id}`
      );

      if (matchingLink && entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        matchingLink.classList.add("active");
      }
    });
  },
  {
    threshold: 0.35,
    rootMargin: "-10% 0px -35% 0px",
  }
);

sectionTargets.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));
