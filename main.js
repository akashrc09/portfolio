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

var typedElement = document.querySelector(".text");
var roles = ["Digital Forensic Analyst", "OSINT Researcher", "OPSEC Advisor", "PCB Designer", "Electronics Enthusiast"];

if (typedElement) {
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
        typedElement.textContent = roles[0];
    } else {
        var roleIndex = 0;
        var characterIndex = roles[0].length;
        var deleting = true;

        function animateRole() {
            if (deleting) {
                characterIndex -= 1;
                typedElement.textContent = roles[roleIndex].slice(0, characterIndex);

                if (characterIndex === 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    window.setTimeout(animateRole, 400);
                    return;
                }

                window.setTimeout(animateRole, 100);
                return;
            }

            characterIndex += 1;
            typedElement.textContent = roles[roleIndex].slice(0, characterIndex);

            if (characterIndex === roles[roleIndex].length) {
                deleting = true;
                window.setTimeout(animateRole, 1000);
                return;
            }

            window.setTimeout(animateRole, 100);
        }

        window.setTimeout(animateRole, 1000);
    }
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
