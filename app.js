const Localizations = Object.freeze({
    IN_SITU = "In situ",
    LOCALIZED = "Localized",
    REGIONAL = "Regional",
    DISTANT = "Distant"
})

const Groups = Object.freeze({
    GROUP_1 = {name: "Group 1", n: 37},
    GROUP_2 = {name: "Group 2", n: 537},
    GROUP_3 = {name: "Group 3", n: 33},
    GROUP_4 = {name: "Group 4", n: 1281},
    GROUP_5 = {name: "Group 5", n: 521},
    GROUP_6 = {name: "Group 6", n: 115},
    GROUP_7 = {name: "Group 7", n: 789},
    GROUP_8 = {name: "Group 8", n: 30107},
    GROUP_9 = {name: "Group 9", n: 7699},
    GROUP_10 = {name: "Group 10", n: 7247},
    GROUP_11 = {name: "Group 11", n: 417},
    GROUP_12 = {name: "Group 12", n: 1450},
    GROUP_13 = {name: "Group 13", n: 490},
    GROUP_14 = {name: "Group 14", n: 1917},
    GROUP_15 = {name: "Group 15", n: 377},
})

const TumorGrade = Object.freeze({
    G1 = "G1",
    G2 = "G2",
    G3 = "G3",
    G4 = "G4"
})

const TnmStage = Object.freeze({
    T1 = "T1",
    T2 = "T2",
    T3 = "T3",
    T4 = "T4"
})

function calculate(localization: Localizations, ): Groups{
    return value1 * value2 + value3;
}


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