import { NenSkillName } from "../NenDetails"
import { NenSkill } from "../NenSkills"
import NenUser from "../NenUser"
import { PhysicalBattleAction } from "./Engine"



export type NenBattleSkill = NenSkill & {
    active: boolean
}

export type BattlePhysicalSkillName = "hit" | "block" | "advance" | "retreat"

export class NenBattler {
    user: NenUser
    
    // skills
    battleSkills: {[k: string]: NenBattleSkill}
    battlePhysicalSkill: {[k: string]: number}
    
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
        this.battleSkills = Object.values(user.skills).reduce((dict, skill) => ({...dict, [skill.name]: {...skill, active: false}}), {})
    }

    get totalAuraCost() {
        return this.activeSkills.reduce((total, s) => total + s.costPerRound, 0)
    }

    get activeSkills() {
        return Object.values(this.battleSkills).filter(s => s.active)
    }

    calcPhysicalSkills(){
        //TODO:: calculate based on physical skill of user
        return {
            "hit": 5, //calcHit(),
            "block": 4, //calcBlock()......
            "advance": 3,
            "retreate": 4
        }
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
    
    activateSkill(skillName: NenSkillName) {
        this.battleSkills[skillName].active = true

        return this
    }

}