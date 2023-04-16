import { NenSkillDict } from "../Game/NenBattler"
import { NenSkillName } from "../NenDetails"

export type NenSkill = {
    name: NenSkillName
    rank: number
    costPerRound: number
}



export const makeSkills: () => (NenSkillDict<NenSkill>) = () => ({
    ten: {name: 'ten', rank: 1, costPerRound: 1},
    ren: {name: 'ren', rank: 0, costPerRound: 1},
    zetsu: {name: 'zetsu', rank: 1, costPerRound: 1},
    gyo: {name: 'gyo', rank: 1, costPerRound: 1},
    the_in: {name: 'the_in', rank: 0, costPerRound: 1},
    en: {name: 'en', rank: 0, costPerRound: 1},
    shu: {name: 'shu', rank: 0, costPerRound: 1},
    kou: {name: 'kou', rank: 0, costPerRound: 1},
    ken: {name: 'ken', rank: 0, costPerRound: 1},
    ryo: {name: 'ryo', rank: 0, costPerRound: 1},
})