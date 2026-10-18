import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { calculate } from './calculate.js';
import { Localizations, TumorGrade, TStage, NStage, SarcomDiff, Groups } from './variables.js';

const L = Localizations, G = TumorGrade, T = TStage, N = NStage, S = SarcomDiff;

// Every value each field can take. Ages sit on and around both split
// points (34 and 70) plus the extremes, so an ignored age that leaked
// into the logic would flip the result.
const DOMAIN = {
    localization: Object.values(L),
    grade: Object.values(G),
    sarcomatoid: Object.values(S),
    n: Object.values(N),
    age: [0, 1, 34, 35, 70, 71, 120],
    t: Object.values(T),
};

const NON_DISTANT = [L.IN_SITU, L.LOCALIZED, L.REGIONAL];

// One entry per leaf. `fixed` holds the fields that decide the outcome
// (an array means any of those values belongs to the same partition);
// every other field is "don't care" and gets the full DOMAIN.
const PARTITIONS = [
    { group: Groups.GROUP_1,  fixed: { localization: [L.DISTANT], grade: [G.G1, G.G2], sarcomatoid: [S.NO], age: [0, 1, 34] } },
    { group: Groups.GROUP_2,  fixed: { localization: [L.DISTANT], grade: [G.G1, G.G2], sarcomatoid: [S.NO], age: [35, 70, 71, 120] } },
    { group: Groups.GROUP_3,  fixed: { localization: [L.DISTANT], grade: [G.G1, G.G2], sarcomatoid: [S.YES] } },
    { group: Groups.GROUP_4,  fixed: { localization: [L.DISTANT], grade: [G.G3, G.G4], n: [N.NEG], sarcomatoid: [S.NO] } },
    { group: Groups.GROUP_5,  fixed: { localization: [L.DISTANT], grade: [G.G3, G.G4], n: [N.NEG], sarcomatoid: [S.YES] } },
    { group: Groups.GROUP_6,  fixed: { localization: [L.DISTANT], grade: [G.G3, G.G4], n: [N.POS], t: [T.T1, T.T2] } },
    { group: Groups.GROUP_7,  fixed: { localization: [L.DISTANT], grade: [G.G3, G.G4], n: [N.POS], t: [T.T3, T.T4] } },
    { group: Groups.GROUP_8,  fixed: { localization: NON_DISTANT, grade: [G.G1, G.G2, G.G3], t: [T.T1, T.T2], age: [0, 1, 34, 35, 70] } },
    { group: Groups.GROUP_9,  fixed: { localization: NON_DISTANT, grade: [G.G1, G.G2, G.G3], t: [T.T1, T.T2], age: [71, 120] } },
    { group: Groups.GROUP_10, fixed: { localization: NON_DISTANT, grade: [G.G1, G.G2, G.G3], t: [T.T3, T.T4], n: [N.NEG] } },
    { group: Groups.GROUP_11, fixed: { localization: NON_DISTANT, grade: [G.G1, G.G2, G.G3], t: [T.T3, T.T4], n: [N.POS] } },
    { group: Groups.GROUP_12, fixed: { localization: NON_DISTANT, grade: [G.G4], t: [T.T1, T.T2], sarcomatoid: [S.NO] } },
    { group: Groups.GROUP_13, fixed: { localization: NON_DISTANT, grade: [G.G4], t: [T.T1, T.T2], sarcomatoid: [S.YES] } },
    { group: Groups.GROUP_14, fixed: { localization: NON_DISTANT, grade: [G.G4], t: [T.T3, T.T4], n: [N.NEG] } },
    { group: Groups.GROUP_15, fixed: { localization: NON_DISTANT, grade: [G.G4], t: [T.T3, T.T4], n: [N.POS] } },
];

// All combinations of the given field -> values map.
function* combinations(spec) {
    const keys = Object.keys(spec);
    function* walk(i, acc) {
        if (i === keys.length) { yield { ...acc }; return; }
        for (const v of spec[keys[i]]) {
            acc[keys[i]] = v;
            yield* walk(i + 1, acc);
        }
    }
    yield* walk(0, {});
}

const run = c => calculate(c.localization, c.grade, c.sarcomatoid, c.n, c.age, c.t);

describe('ignored fields do not change the result', () => {
    for (const { group, fixed } of PARTITIONS) {
        const ignored = Object.keys(DOMAIN).filter(f => !(f in fixed));

        test(`${group.name} ignores ${ignored.join(', ')}`, () => {
            const spec = { ...DOMAIN, ...fixed };
            let count = 0;
            for (const c of combinations(spec)) {
                assert.equal(run(c), group,
                    `expected ${group.name}, got ${run(c)?.name} for ${JSON.stringify(c)}`);
                count++;
            }
            assert.ok(count > 0);
        });
    }
});

// Sanity check on the table above: together the partitions must cover
// every possible input exactly once, otherwise a gap or overlap in
// PARTITIONS could make the tests above pass for the wrong reason.
test('partitions cover the whole input space with no overlap', () => {
    const inPartition = (c, fixed) =>
        Object.entries(fixed).every(([f, vals]) => vals.includes(c[f]));

    for (const c of combinations(DOMAIN)) {
        const hits = PARTITIONS.filter(p => inPartition(c, p.fixed));
        assert.equal(hits.length, 1,
            `${JSON.stringify(c)} matches ${hits.length} partitions`);
    }
});