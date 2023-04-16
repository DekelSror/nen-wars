import { PhysicalSkillModifier, zeroPhysicalSkillMod } from "../Game/Battle"
import { PhysicalBattleAction } from "../Game/Engine"
import { NenBattler } from "../Game/NenBattler"
import { NenSkillName } from "../NenDetails"
import GyoNenSkill from "./GyoNenSkill"
import { NenSkill } from "./NenSkills"

export abstract class NenSkillBase {
    name: NenSkillName
    amountOfTurnsActive: number
    effectOnPhysicalSkill: {[k:string]: number}
    auraUsage: number
    power = 0

    constructor(skill: NenSkill, effectOnPhysicalSkill: {[k:string]: number}, auraUsage: number){
        this.name = skill.name
        this.amountOfTurnsActive = 0
        this.effectOnPhysicalSkill = effectOnPhysicalSkill
        this.auraUsage = auraUsage
    }

    abstract upgradeAmountOfTurnsActive(multiplier: number): void
    abstract upgradeEffectOnPhysicalSkill(skill: string, multiplier: number): void
    abstract upgradeAuraUsage(multiplier: number): void
    abstract physicalMods(battler: NenBattler, physicalAction: PhysicalBattleAction): PhysicalSkillModifier
}

class EmptyNenSkill extends NenSkillBase {

    constructor(nenSkill: NenSkill) {
        super(nenSkill, zeroPhysicalSkillMod(), 0)
    }

    upgradeAmountOfTurnsActive(multiplier: number): void {
        
    }

    upgradeAuraUsage(multiplier: number): void {
        
    }

    upgradeEffectOnPhysicalSkill(skill: string, multiplier: number): void {
        
    }

    physicalMods(battler: NenBattler, physicalAction: PhysicalBattleAction): PhysicalSkillModifier {
        return zeroPhysicalSkillMod()
    }
}

export const nenSkillFactory: (nenSkill: NenSkill) => NenSkillBase = nenSkill => {
    switch (nenSkill.name) {
        case 'gyo':
            return new GyoNenSkill(nenSkill, zeroPhysicalSkillMod(), 0)            
        default:
            return new EmptyNenSkill(nenSkill)
    }
}
