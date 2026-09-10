var typed = new Typed(".text", {
    strings: ["Digital Forensic Analyst", "OSINT Researcher", "OPSEC Advisor", "PCB Designer", "Electronics Enthusiast"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

if (window.pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    document.querySelectorAll(".cert-pdf").forEach(function (certificateLink) {
        var canvas = document.createElement("canvas");
        var fallback = certificateLink.querySelector("span");

        certificateLink.appendChild(canvas);

        pdfjsLib.getDocument(certificateLink.dataset.pdf).promise
            .then(function (pdf) {
                return pdf.getPage(1);
            })
            .then(function (page) {
                var availableWidth = certificateLink.clientWidth;
                var baseViewport = page.getViewport({ scale: 1 });
                var scale = Math.min(availableWidth / baseViewport.width, 1.5);
                var viewport = page.getViewport({ scale: scale });
                var context = canvas.getContext("2d");

                canvas.width = viewport.width;
                canvas.height = viewport.height;
                return page.render({ canvasContext: context, viewport: viewport }).promise;
            })
            .then(function () {
                fallback.hidden = true;
            })
            .catch(function () {
                canvas.remove();
            });
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

