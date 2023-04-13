import { BattlePhysicalSkillName } from "../Game/NenBattler"
import { NenSkillName } from "../NenDetails"


export abstract class NenSkillBase{
    name: NenSkillName
    amountOfTurnsActive: number
    effectOnPhysicalSkill: {[k:string]: number}
    auraUsage: number

    constructor(name: NenSkillName, amountOfTurnsActive: number, effectOnPhysicalSkill: {[k:string]: number}, auraUsage: number){
        this.name = name
        this.amountOfTurnsActive = amountOfTurnsActive
        this.effectOnPhysicalSkill = effectOnPhysicalSkill
        this.auraUsage = auraUsage
    }

    abstract upgradeAmountOfTurnsActive(multiplier: number): void
    abstract upgradeEffectOnPhysicalSkill(skill: string, multiplier: number): void
    abstract upgradeAuraUsage(multiplier: number): void
}