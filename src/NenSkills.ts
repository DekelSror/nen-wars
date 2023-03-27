import { NenSkillName } from "./NenDetails"

export type NenSkill = {
    name: NenSkillName
    rank: number
    costPerRound: number
    active: boolean
}

// export type NenSkills = {
//     ten: NenSkill,
//     ren: NenSkill,
//     zetsu: NenSkill,
//     gyo: NenSkill,
//     the_in: NenSkill,
//     en: NenSkill,
//     shu: NenSkill,
//     kou: NenSkill,
//     ken: NenSkill,
//     ryo: NenSkill,
// }

export const makeSkills: () => ({[k: string]: NenSkill}) = () => ({
    ten: {name: 'ten', rank: 1, costPerRound: 1, active: false},
    ren: {name: 'ren', rank: 0, costPerRound: 1, active: false},
    zetsu: {name: 'zetsu', rank: 1, costPerRound: 1, active: false},
    gyo: {name: 'gyo', rank: 0, costPerRound: 1, active: false},
    the_in: {name: 'the_in', rank: 0, costPerRound: 1, active: false},
    en: {name: 'en', rank: 0, costPerRound: 1, active: false},
    shu: {name: 'shu', rank: 0, costPerRound: 1, active: false},
    kou: {name: 'kou', rank: 0, costPerRound: 1, active: false},
    ken: {name: 'ken', rank: 0, costPerRound: 1, active: false},
    ryo: {name: 'ryo', rank: 0, costPerRound: 1, active: false},
})