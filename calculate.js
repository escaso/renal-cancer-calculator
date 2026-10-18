import { Localizations, TumorGrade, TStage, NStage, Groups, SarcomDiff } from './variables.js';

export const MIN_AGE = 0;
export const MAX_AGE = 130;

export function calculate(localization, grade, sarcomatoid, n, age, t){
    if (typeof age !== "number" || Number.isNaN(age) || age < MIN_AGE || age > MAX_AGE) {
        throw new RangeError(`Age must be a number between ${MIN_AGE} and ${MAX_AGE}.`);
    }

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