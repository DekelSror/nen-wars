import { NenSkillName } from "../NenDetails"
import { NenSkill } from "../NenSkills"
import { NenSkillBase } from "../NenSkills/NenSkillBase"
import NenUser from "../NenUser"
import { NenBattleAction, PhysicalBattleAction } from "./Engine"



export type NenBattleSkill = NenSkillBase & {
    power: number
}

export type BattlePhysicalSkillName = "hit" | "block" | "advance" | "retreat"

export class NenBattler {
    user: NenUser
    
    // skills
    battleSkills: {[k: string]: NenBattleSkill}
    battlePhysicalSkill: {hit: number, block: number, advance: number, retreat: number}
    
    moves: any
    
    // resources
    hp: number
    aura: number
    physicalResources = {
        stamina: 10,
        aerobic: 10,
        unaerobic: 10
    }

    // related to battle history
    blockCount: number//redundntetttt?
    
    constructor(hit: number, defense: number, user: NenUser){
        this.user = user
        this.aura = user.maxAura
        this.hp = 10
        this.blockCount = 0

        this.moves = {
            hit     : hit,
            defense : defense 
        }
        this.battlePhysicalSkill = this.calcPhysicalSkills()
        // turn nenskills to battleskils!
        this.battleSkills = Object.values(user.skills).reduce((dict, skill) => ({...dict, [skill.name]: {...skill, power: 0}}), {})
    }

    get totalAuraCost() {
        return this.activeSkills.reduce((total, s) => total + s.auraUsage, 0)
    }

    get activeSkills() {
        return Object.values(this.battleSkills).filter(s => s.power > 0)
    }

    calcPhysicalSkills(){
        //TODO:: calculate based on physical skill of user
        return {
            hit: 5, //calcHit(),
            block: 4, //calcBlock()......
            advance: 3,
            retreat: 4
        }
    }

    actualHitPower(power: number, hitModifier: number) {
        return this.battlePhysicalSkill['hit'] + hitModifier + power
    }

    modifiers: (skill: NenBattleSkill) => ({[k: string]: number}) = skill => {
        switch (skill.name) {
            case 'gyo':
                const gyoSkill = this.activeSkills.find(s => s.name === 'gyo')
                if (gyoSkill) {
                    // have a function instead of +
                    return gyoSkill.effectOnPhysicalSkill
                } else {
                    return {hit: 0, block: 0, advance: 0, retreat: 0}
                }
            default:
                return {hit: 0, block: 0, advance: 0, retreat: 0}
        }
    }

    physicalSkillsModifiers() {
        return this.activeSkills.reduce((mods, skill) => {
            const skillMods = this.modifiers(skill)
            return {
                hit: mods.hit + skillMods.hit,
                block: mods.block + skillMods.block,
                advance: mods.advance + skillMods.advance,
                retreat: mods.retreat + skillMods.retreat,
            }
        }, {hit: 0, block: 0, advance: 0, retreat: 0})
    }
    
    usePhysicalSkill(action: PhysicalBattleAction) {
        const {physicalSkillName, power} = action

        if (physicalSkillName == "hit")
        {
                if (this.checkIfHit(power)) {
                console.log(`awesome Hit!!!!`)
            }
            else {
                console.log(`not enough ${physicalSkillName}. need ${power} got ${this.moves[physicalSkillName]}`)
            }
        }
        else if (physicalSkillName == "block")
        {
                if (this.checkIfBlock(power)) {
                console.log(`awesome Block!!!!`)
            }
            else {
                console.log(`not enough ${physicalSkillName}. need ${power} got ${this.moves[physicalSkillName]}`)
            }
        }
        else if (physicalSkillName == "advance")
        {
                if (this.checkIfAdvance(power)) {
                console.log(`damn youre quick!!!!`)
            }
            else {
                console.log(`not enough ${physicalSkillName}. need ${power} got ${this.moves[physicalSkillName]}`)
            }
        }
        else if (physicalSkillName == "retreat")
        {
                if (this.checkIfRetreat(power)) {
                console.log(`damn youre quick!!!!`)
            }
            else {
                console.log(`not enough ${physicalSkillName}. need ${power} got ${this.moves[physicalSkillName]}`)
            }
        }
    }

    checkIfHit(power: number){
        var flag = true
        if (this.physicalResources.stamina - (power / 4) <= 0)
            flag = false
        if (this.physicalResources.aerobic - (power / 3) <= 0)
            flag = false
        if (this.physicalResources.unaerobic - (power / 2) <= 0)
            flag = false
        if (flag){
            this.physicalResources.stamina = this.physicalResources.stamina - (power / 4)
            this.physicalResources.aerobic = this.physicalResources.aerobic - (power / 3)
            this.physicalResources.unaerobic = this.physicalResources.unaerobic - (power / 2)
        }
        return flag
    }

    checkIfBlock(power: number){
        var flag = true
        if (this.physicalResources.stamina - (power / 4) <= 0)
            flag = false
        if (this.physicalResources.aerobic - (power / 3) <= 0)
            flag = false
        if (this.physicalResources.unaerobic - (power / 2) <= 0)
            flag = false
        if (flag){
            this.physicalResources.stamina = this.physicalResources.stamina - (power / 4)
            this.physicalResources.aerobic = this.physicalResources.aerobic - (power / 3)
             this.physicalResources.unaerobic = this.physicalResources.unaerobic - (power / 2)
        }
        return flag
    }

    checkIfAdvance(power: number){
        var flag = true
        if (this.physicalResources.stamina - (power / 4) <= 0)
            flag = false
        if (this.physicalResources.aerobic - (power / 3) <= 0)
            flag = false
        if (this.physicalResources.unaerobic - (power / 2) <= 0)
            flag = false
        if (flag){
            this.physicalResources.stamina = this.physicalResources.stamina - (power / 4)
            this.physicalResources.aerobic = this.physicalResources.aerobic - (power / 3)
             this.physicalResources.unaerobic = this.physicalResources.unaerobic - (power / 2)
        }
        return flag
    }

    checkIfRetreat(power: number){
        var flag = true
        if (this.physicalResources.stamina - (power / 4) <= 0)
            flag = false
        if (this.physicalResources.aerobic - (power / 3) <= 0)
            flag = false
        if (this.physicalResources.unaerobic - (power / 2) <= 0)
            flag = false
        if (flag){
            this.physicalResources.stamina = this.physicalResources.stamina - (power / 4)
            this.physicalResources.aerobic = this.physicalResources.aerobic - (power / 3)
             this.physicalResources.unaerobic = this.physicalResources.unaerobic - (power / 2)
        }
        return flag
    }

    deductAura() {
        this.aura -= this.totalAuraCost
        return this
    }
    
    activateSkill(action: NenBattleAction) {
        this.battleSkills[action.nenSkillName].power = action.power

        return this
    }

}