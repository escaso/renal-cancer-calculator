export const Localizations = Object.freeze({
    IN_SITU : "In situ",
    LOCALIZED : "Localized",
    REGIONAL : "Regional",
    DISTANT : "Distant"
})

export const TumorGrade = Object.freeze({
    G1 : "G1",
    G2 : "G2",
    G3 : "G3",
    G4 : "G4"
})

export const TStage = Object.freeze({
    T1 : "T1",
    T2 : "T2",
    T3 : "T3",
    T4 : "T4"
})

export const NStage = Object.freeze({
    POS : "+",
    NEG : "-"
})

export const SarcomDiff = Object.freeze({
    YES: "Yes",
    NO: "No"
})

export const RiskLevels = Object.freeze({
    LOW: "Low",
    INTERMEDIATE: "Intermediate",
    HIGH: "High"
})

export const Groups = Object.freeze({
    GROUP_1 : {name: "Group 1",
                risk: RiskLevels.LOW,
                meanSurvival: 81,
                medianSurvival: null,
                ci: null
            },
    GROUP_2 : {name: "Group 2",
                risk: RiskLevels.INTERMEDIATE,
                meanSurvival: 57,
                medianSurvival: null,
                ci: {lower:70, upper:null}
            },
    GROUP_3 : {name: "Group 3",
                risk: RiskLevels.HIGH,
                meanSurvival: 26.4,
                medianSurvival: 22,
                ci: {lower:16, upper:null}
            },
    GROUP_4 : {name: "Group 4",
                risk: RiskLevels.HIGH,
                meanSurvival: 44.7,
                medianSurvival: 38,
                ci: {lower:34, upper:43}
            },
    GROUP_5 : {name: "Group 5",
                risk: RiskLevels.HIGH,
                meanSurvival: 30.6,
                medianSurvival: 17,
                ci: {lower:14, upper:22}
            },
    GROUP_6 : {name: "Group 6",
                risk: RiskLevels.HIGH,
                meanSurvival: 44.7,
                medianSurvival: 36,
                ci: {lower:30, upper:null}
            },
    GROUP_7 : {name: "Group 7",
                risk: RiskLevels.HIGH,
                meanSurvival: 23.6,
                medianSurvival: 13,
                ci: {lower:11, upper:14}
            },
    GROUP_8 : {name: "Group 8",
                risk: RiskLevels.LOW,
                meanSurvival: 81.3,
                medianSurvival: null,
                ci: null
            },
    GROUP_9 : {name: "Group 9",
                risk: RiskLevels.LOW,
                meanSurvival: 77.9,
                medianSurvival: null,
                ci: null
            },
    GROUP_10 : {name: "Group 10",
                risk: RiskLevels.LOW,
                meanSurvival: 73.9,
                medianSurvival: null,
                ci: null
            },
    GROUP_11 : {name: "Group 11",
                risk: RiskLevels.INTERMEDIATE,
                meanSurvival: 49.7,
                medianSurvival: 54,
                ci: {lower:42, upper:null}
            },
    GROUP_12 : {name: "Group 12",
                risk: RiskLevels.LOW,
                meanSurvival: 74.4,
                medianSurvival: null,
                ci: null
            },
    GROUP_13 : {name: "Group 13",
                risk: RiskLevels.INTERMEDIATE,
                meanSurvival: 62.4,
                medianSurvival: null,
                ci: null
            },
    GROUP_14 : {name: "Group 14",
                risk: RiskLevels.INTERMEDIATE,
                meanSurvival: 59.7,
                medianSurvival: null,
                ci: null
            },
    GROUP_15 : {name: "Group 15",
                risk: RiskLevels.HIGH,
                meanSurvival: 37.8,
                medianSurvival: 25,
                ci: {lower:22, upper:32}
            },
})


export function populateDropdown(selectId, enumOptions){
    const select = document.getElementById(selectId);

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "-- Select one --";
    select.appendChild(defaultOption);

    for (const key in enumOptions) {
        const option = document.createElement("option");
        const value = enumOptions[key];
        option.value = typeof value === "object" ? key : value;
        option.textContent = typeof value === "object" ? value.name : value;
        select.appendChild(option);
    }
}