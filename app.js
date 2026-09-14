import { Localizations, TumorGrade, TnmStage, NStage, Groups, populateDropdown } from './variables.js';
function calculate(localization, grade, sarcomatoid, n, age, t){
    if (localization == Localizations.DISTANT){
        // CHECK THIS WITH LAURA: grade < 0.001 or does g1g2/g3g4 split have the same effect?
        if (grade == TumorGrade.G1 || grade ==TumorGrade.G2){
            if (sarcomatoid == 0.002){
                return Groups.GROUP_3;
            }
            else{
                if (age > 34) return Groups.GROUP_2;
                else return Groups.GROUP_1;
            }
        }
        else{

            // CHECK THIS WITH LAURA: do I input N as a number and compare pos or neg w a max dec numbers of 0.001 or have them say pos/neg?
            if (n == NStage.NEG){

                // CHECK WITH LAURA: how to input sarcomatoid? Number (for diff) or yes/no?
                if (sarcomatoid < 0.001){
                    // yes
                    return Groups.GROUP_5
                }
                else return Groups.GROUP_4
            }
            else{
                if (t == TnmStage.T1 || t == TnmStage.T2) return Groups.GROUP_6;
                else return Groups.GROUP_7;
            }

        }
    }
    else{
        if (grade == TumorGrade.G4){
            if (t == TnmStage.T1 || t == TnmStage.T2) {
                if (sarcomatoid < 0.001)return Groups.GROUP_13;
                return Groups.GROUP_12;
            }
            else {
                if (n == NStage.NEG) return Groups.GROUP_14;
                return Groups.GROUP_15;
            }
        }
        else{
            if (t == TnmStage.T1 || t == TnmStage.T2) {
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
populateDropdown("tnmStage", TnmStage);
populateDropdown("nStage", NStage);


document.getElementById("submit").addEventListener("click", () => {
    const localization = document.getElementById("localization").value;
    const grade = document.getElementById("tumorGrade").value;
    const sarcomatoid = document.getElementById("sarcomDiff");
    const n = document.getElementById("nStage").value;
    const age = document.getElementById("age");
    const t = document.getElementById("tnmStage").value;

    // validate all fields are filled
    if (!localization || !grade || !sarcomatoid || !n || !age || !t) {
        document.getElementById("error").textContent = "Please fill in all fields.";
        return;
    }

    const resultGroup = calculate(localization=localization, grade=grade, sarcomatoid=sarcomatoid, n=n, age=age, t=t);

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
    navigator.serviceWorker.register("/sw.js");
}