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

    if (fields.some(v => v === "")) {
        error.textContent = "Please fill in all fields.";
        return;
    }
    error.textContent = "";

    const [localization, grade, sarcomatoid, n, age, t] = fields;
    const g = calculate(localization, grade, sarcomatoid, n, Number(age), t);

    const icon = g.risk === "Low" ? "✓" : "!";
    let html = `
        <div class="icon">${icon}</div>
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