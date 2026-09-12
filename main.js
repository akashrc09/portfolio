document.body.classList.add("js");

var header = document.querySelector(".header");
var menuToggle = document.querySelector(".menu-toggle");
var navigationLinks = document.querySelectorAll(".navbar a");

if (menuToggle) {
    menuToggle.addEventListener("click", function () {
        var isOpen = header.classList.toggle("nav-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
        menuToggle.querySelector("i").className = isOpen ? "bx bx-x" : "bx bx-menu";
    });

    navigationLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            header.classList.remove("nav-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
            menuToggle.querySelector("i").className = "bx bx-menu";
        });
    });
}

window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 24);
}, { passive: true });

if (window.Typed) {
    new Typed(".text", {
        strings: ["Digital Forensic Analyst", "OSINT Researcher", "OPSEC Advisor", "PCB Designer", "Electronics Enthusiast"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
}

var certificateCards = document.querySelectorAll(".cert-card");

if ("IntersectionObserver" in window) {
    var certificateObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    certificateCards.forEach(function (card) {
        certificateObserver.observe(card);
    });
} else {
    certificateCards.forEach(function (card) {
        card.classList.add("is-visible");
    });
}

