let punten = Number(localStorage.getItem("ontdekPunten")) || 0;

function updatePunten() {

    const teller = document.getElementById("puntenTeller");
    const level = document.getElementById("levelTeller");

    if (teller) {
        teller.textContent = "⭐ " + punten + " punten";
    }

    if (level) {

        if (punten >= 200) {
            level.textContent = "🚀 Expert";
        } else if (punten >= 100) {
            level.textContent = "🧠 Kenner";
        } else if (punten >= 50) {
            level.textContent = "🔎 Ontdekker";
        } else {
            level.textContent = "🌱 Nieuwsgierig";
        }

    }
}


function verdienPunten(aantal, vraag) {

    let beantwoordeVragen =
        JSON.parse(localStorage.getItem("beantwoordeVragen")) || [];

    if (beantwoordeVragen.includes(vraag)) {
        return;
    }

    punten += aantal;

    beantwoordeVragen.push(vraag);

    localStorage.setItem("ontdekPunten", punten);

    localStorage.setItem(
        "beantwoordeVragen",
        JSON.stringify(beantwoordeVragen)
    );

    updatePunten();
}


function antwoord(goed, id, knop) {

    const resultaat = document.getElementById(id);

    if (resultaat.dataset.beantwoord === "true") {
        return;
    }

    resultaat.dataset.beantwoord = "true";

    // Alleen de knoppen van DEZE vraag uitschakelen
    const vraag = knop.closest(".vraag");

    if (vraag) {
        const knoppen = vraag.querySelectorAll("button");

        knoppen.forEach(function(button) {
            button.disabled = true;
        });
    }

    if (goed) {
        resultaat.textContent = "✓ Juist! +10 punten.";
    } else {
        resultaat.textContent = "✗ Helaas! Geen punten.";
    }
}


updatePunten();
const levelKnop = document.getElementById("levelTeller");
const levelsMenu = document.getElementById("levelsMenu");

levelKnop.onclick = function () {
    levelsMenu.classList.toggle("zichtbaar");
};