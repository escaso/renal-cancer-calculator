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


document.getElementById("submit").addEventListener("click", () => {
    const localization = document.getElementById("localization").value;
    const grade = document.getElementById("tumorGrade").value;
    const sarcomatoid = document.getElementById("sarcomDiff").value;
    const n = document.getElementById("nStage").value;
    const age = document.getElementById("age").value;
    const t = document.getElementById("tStage").value;

    // validate all fields are filled
    if (!localization || !grade || !sarcomatoid || !n || !age || !t) {
        document.getElementById("error").textContent = "Please fill in all fields.";
        return;
    }

    const resultGroup = calculate(localization, grade, sarcomatoid, n, age, t);

    // hide the form, show the result
    document.querySelector(".calculator").innerHTML = `
        <h1>Result</h1>
        <p style="text-align:center; font-size: 20px;">${resultGroup.name}</p>
        <p style="text-align:center; color: #555;">n = ${resultGroup.n}</p>
        <p style="text-align:center; color: #555;">Your description text here</p>
        <button onclick="location.reload()">Start Over</button>
    `;
});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/renal-cancer-calculator/sw.js");
}