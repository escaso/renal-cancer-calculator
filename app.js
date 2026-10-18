import { Localizations, TumorGrade, TStage, NStage, Groups, populateDropdown, SarcomDiff } from './variables.js';
function calculate(localization, grade, sarcomatoid, n, age, t){
    if (localization == Localizations.DISTANT){
        if (grade == TumorGrade.G1 || grade ==TumorGrade.G2){
            if (sarcomatoid == SarcomDiff.YES){
                return Groups.GROUP_3;
            }
            else{
                if (age > 34) return Groups.GROUP_2;
                else return Groups.GROUP_1;
            }
        }
        else{
            if (n == NStage.NEG){
                if (sarcomatoid == SarcomDiff.YES) return Groups.GROUP_5;
                else return Groups.GROUP_4;
            }
            else{
                if (t == TStage.T1 || t == TStage.T2) return Groups.GROUP_6;
                else return Groups.GROUP_7;
            }
        }
    }
    else{
        if (grade == TumorGrade.G4){
            if (t == TStage.T1 || t == TStage.T2) {
                if (sarcomatoid == SarcomDiff.YES) return Groups.GROUP_13;
                return Groups.GROUP_12;
            }
            else {
                if (n == NStage.NEG) return Groups.GROUP_14;
                return Groups.GROUP_15;
            }
        }
        else{
            if (t == TStage.T1 || t == TStage.T2) {
                if (age > 70)return Groups.GROUP_9;
                return Groups.GROUP_8;
            }
            else {
                if (n == NStage.NEG) return Groups.GROUP_10;
                return Groups.GROUP_11;
            }
        }
    }
}


populateDropdown("localization", Localizations);
populateDropdown("tumorGrade", TumorGrade);
populateDropdown("tStage", TStage);
populateDropdown("nStage", NStage);
populateDropdown("sarcomDiff", SarcomDiff);


const val = id => document.getElementById(id).value;

document.getElementById("submit").addEventListener("click", () => {
    const fields = ["localization", "tumorGrade", "sarcomDiff", "nStage", "age", "tStage"].map(val);
    const error = document.getElementById("error");
    const result = document.getElementById("result");

    if (fields.some(v => v === "")) {
        error.textContent = "Please fill in all fields.";
        result.innerHTML = "";
        return;
    }
    error.textContent = "";

    const [localization, grade, sarcomatoid, n, age, t] = fields;
    const g = calculate(localization, grade, sarcomatoid, n, Number(age), t);

    const median = g.medianSurvival == null
        ? "not reached"
        : `${g.medianSurvival}` + (g.ci ? ` (95% CI ${g.ci.lower}–${g.ci.upper ?? "NR"})` : "");

    result.innerHTML = `
        <h2>${g.name}: ${g.risk} risk</h2>
        <p>Mean survival: ${g.meanSurvival}<br>Median survival: ${median}</p>
    `;
});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/renal-cancer-calculator/sw.js");
}