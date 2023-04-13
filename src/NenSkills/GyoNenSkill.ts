import { basename } from "path"
import { NenSkillName } from "../NenDetails"
import { NenSkillBase } from "./NenSkillBase"


export class GyoNenSkill extends NenSkillBase{
    // amountOfTurnsActive: number = 2
    // effectOnPhysicalSkill: {[k: string]: number} = {hit: 2, block: 2, advance: 0, retreat: 0}
    
    constructor(initAmountOfTurnsActive: number, initEffectOnPhysicalSkill: {[k: string]: number}, auraUsage: number){
        super("gyo" as NenSkillName, initAmountOfTurnsActive, initEffectOnPhysicalSkill, auraUsage)
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
}
export default GyoNenSkill