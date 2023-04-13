import { NenSkillName } from "./NenDetails"
import { GyoNenSkill } from "./NenSkills/GyoNenSkill"
import { NenSkillBase } from "./NenSkills/NenSkillBase"

export type NenSkill = {
    name: NenSkillName
    rank: number
    costPerRound: number
}



export const makeSkills: () => ({[k: string]: NenSkillBase}) = () => ({
    // ten: {name: 'ten', rank: 1, costPerRound: 1, active: false},
    // ren: {name: 'ren', rank: 0, costPerRound: 1, active: false},
    // zetsu: {name: 'zetsu', rank: 1, costPerRound: 1, active: false},
    gyo: new GyoNenSkill(2, { hit: 2, block: 2, advance: 0, retreat: 0 }, 2),
    // the_in: {name: 'the_in', rank: 0, costPerRound: 1, active: false},
    // en: {name: 'en', rank: 0, costPerRound: 1, active: false},
    // shu: {name: 'shu', rank: 0, costPerRound: 1, active: false},
    // kou: {name: 'kou', rank: 0, costPerRound: 1, active: false},
    // ken: {name: 'ken', rank: 0, costPerRound: 1, active: false},
    // ryo: {name: 'ryo', rank: 0, costPerRound: 1, active: false},
})