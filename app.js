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

    let html = `<h2>${g.name}: <span class="risk-${g.risk.toLowerCase()}">${g.risk} risk</span></h2>`;
    if (g.meanSurvival != null) {
        html += `<p>Cancer-specific survival (mean)<br><strong>${yearsMonths(g.meanSurvival)}</strong></p>`;
    }
    html += g.medianSurvival == null
        ? `<p>Median survival: not reached</p>`
        : `<p>Median survival: ${g.medianSurvival} months</p>`;
    if (g.ci) {
        html += `<p>CI ${ciValue(g.ci.lower)} – ${ciValue(g.ci.upper)}</p>`;
    }

    document.getElementById("resultContent").innerHTML = html;
    document.getElementById("result").showModal();
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