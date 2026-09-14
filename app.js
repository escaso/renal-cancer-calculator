import { Localizations, TumorGrade, TnmStage, Groups, populateDropdown } from './variables.js';
// function calculate(localization: Localizations, ): Groups{
//     return value1 * value2 + value3;
// }


populateDropdown("localization", Localizations);
populateDropdown("tumorGrade", TumorGrade);
populateDropdown("tnmStage", TnmStage);


document.getElementById("submit").addEventListener("click", function() {

    const value1 = Number(document.getElementById("value1").value);
    const value2 = Number(document.getElementById("value2").value);
    const value3 = Number(document.getElementById("value3").value);

    const error = document.getElementById("error");
    const result = document.getElementById("result");

    error.textContent = "";
    result.textContent = "";

    if (
        !Number.isFinite(value1) ||
        !Number.isFinite(value2) ||
        !Number.isFinite(value3)
    ) {
        error.textContent = "Please enter all three values.";
        return;
    }

    try {
        const answer = calculate(value1, value2, value3);

        result.textContent = `Result: ${answer}`;

    } catch (e) {
        error.textContent = "Something went wrong. Please try again.";
    }
});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
}