import { NenSkillName } from "./NenDetails"

export type NenSkill = {
    name: NenSkillName
    rank: number
    costPerRound: number
    active: boolean
}

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