import { Localizations, TumorGrade, TStage, NStage, populateDropdown, SarcomDiff } from './variables.js';
import { calculate } from './calculate.js';


populateDropdown("localization", Localizations);
populateDropdown("tumorGrade", TumorGrade);
populateDropdown("tStage", TStage);
populateDropdown("nStage", NStage);
populateDropdown("sarcomDiff", SarcomDiff);


const val = id => document.getElementById(id).value;

document.getElementById("submit").addEventListener("click", () => {
    const fields = ["localization", "tumorGrade", "sarcomDiff", "nStage", "age", "tStage"].map(val);
    const error = document.getElementById("error");

    // text the browser can't read as a number (e.g. "--5") arrives as ""
    if (document.getElementById("age").validity.badInput) {
        error.textContent = "Please enter a valid age.";
        return;
    }
    if (fields.some(v => v === "")) {
        error.textContent = "Please fill in all fields.";
        return;
    }

    const [localization, grade, sarcomatoid, n, age, t] = fields;
    let g;
    try {
        g = calculate(localization, grade, sarcomatoid, n, Number(age), t);
    } catch (e) {
        error.textContent = e.message; // e.g. "Age must be a number between 0 and 130."
        return;
    }
    error.textContent = "";

    let html = `
        ${g.risk === "Low" ? ICONS.tick : ICONS.alert}
        <p class="group">${g.name}</p>
        <h2>${g.risk} risk</h2>`;
    const row = (label, value) => `<div><dt>${label}</dt><dd>${value}</dd></div>`;
    html += "<dl>";
    if (g.meanSurvival != null) html += row("Cancer-specific survival (mean)", yearsMonths(g.meanSurvival));
    html += row("Median survival", g.medianSurvival == null ? "Not reached" : `${g.medianSurvival} months`);
    if (g.ci) html += row("CI", `${ciValue(g.ci.lower)} – ${ciValue(g.ci.upper)}`);
    html += "</dl>";

    const dialog = document.getElementById("result");
    dialog.className = `risk-${g.risk.toLowerCase()}`;
    document.getElementById("resultContent").innerHTML = html;
    dialog.showModal();
});

// Result icons: white symbol with thick rounded strokes on a circle in the risk color
const ICONS = {
    tick: `<svg class="icon" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="24" fill="currentColor"/>
        <path d="M14 25l7 7 13-14" fill="none" stroke="#fff" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    alert: `<svg class="icon" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="24" fill="currentColor"/>
        <path d="M24 13v14" stroke="#fff" stroke-width="5.5" stroke-linecap="round"/>
        <circle cx="24" cy="35" r="3.25" fill="#fff"/>
    </svg>`
};

// 26.4 months -> "2 years and 2 months"
function yearsMonths(totalMonths) {
    const rounded = Math.round(totalMonths);
    const years = Math.floor(rounded / 12);
    const months = rounded % 12;
    const parts = [];
    if (years) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
    if (months || !years) parts.push(`${months} ${months === 1 ? "month" : "months"}`);
    return parts.join(" and ");
}

// null = not estimable
function ciValue(v) {
    return v == null ? "NE" : v.toFixed(1);
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}