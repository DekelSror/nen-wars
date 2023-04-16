import { PhysicalSkillModifier, zeroPhysicalSkillMod } from "../Game/Battle"
import { PhysicalBattleAction } from "../Game/Engine"
import { NenBattler } from "../Game/NenBattler"
import { NenSkillBase } from "./NenSkillBase"
import { NenSkill } from "./NenSkills"


export class GyoNenSkill extends NenSkillBase{
    // amountOfTurnsActive: number = 2
    // effectOnPhysicalSkill: {[k: string]: number} = {hit: 2, block: 2, advance: 0, retreat: 0}
    
    constructor(nenSkill: NenSkill, initEffectOnPhysicalSkill: {[k: string]: number}, auraUsage: number){
        super(nenSkill, initEffectOnPhysicalSkill, auraUsage)
    }

    upgradeAmountOfTurnsActive(multiplier: number){
        this.amountOfTurnsActive = this.amountOfTurnsActive * multiplier
    }
    upgradeEffectOnPhysicalSkill(skill: string, multiplier: number){
        if(this.effectOnPhysicalSkill[skill] !== undefined){
            this.effectOnPhysicalSkill[skill] = this.effectOnPhysicalSkill[skill] * multiplier
        }
        else{
            console.log("Gyo doesnt effect this skill {}", skill)
        }
        
    }

    upgradeAuraUsage(multiplier: number){
        this.auraUsage = this.auraUsage * multiplier
    }

    physicalMods(battler: NenBattler, physicalAction: PhysicalBattleAction): PhysicalSkillModifier {
        switch (physicalAction.physicalSkillName) {
            case 'hit':
                return {
                    hit: physicalAction.power + battler.battlePhysicalSkill.hit,
                    block: 0,
                    advance: 0,
                    retreat: 0
                }
                
        
            default:
                return zeroPhysicalSkillMod()
        }
    }
}
export default GyoNenSkill