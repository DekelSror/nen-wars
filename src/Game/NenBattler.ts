import { NenSkillName } from "../NenDetails"
import { NenSkill } from "../NenSkills"
import NenUser from "../NenUser"



export type BattleSkill = NenSkill & {
    active: boolean
}

export type BattlePhysicalSkillName = "hit" | "block" | "advance" | "retreat"

export class NenBattler {
    user: NenUser
    aura: number
    battleSkills: {[k: string]: BattleSkill}
    hp: number
    blockCount: number//redundntetttt?
    battlePhysicalSkill: {[k: string]: number}
    moves: any

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
    
    usePhysicalSkill(move: BattlePhysicalSkillName, power: number) {

        if (move == "hit")
        {
                if (this.checkIfHit(power)) {
                console.log(`awesome Hit!!!!`)
            }
            else {
                console.log(`not enough ${move}. need ${power} got ${this.moves[move]}`)
            }
        }
        else if (move == "block")
        {
                if (this.checkIfBlock(power)) {
                console.log(`awesome Block!!!!`)
            }
            else {
                console.log(`not enough ${move}. need ${power} got ${this.moves[move]}`)
            }
        }
        else if (move == "advance")
        {
                if (this.checkIfAdvance(power)) {
                console.log(`damn youre quick!!!!`)
            }
            else {
                console.log(`not enough ${move}. need ${power} got ${this.moves[move]}`)
            }
        }
        else if (move == "retreat")
        {
                if (this.checkIfRetreat(power)) {
                console.log(`damn youre quick!!!!`)
            }
            else {
                console.log(`not enough ${move}. need ${power} got ${this.moves[move]}`)
            }
        }
    }

    checkIfHit(power: number){
        var flag = true
        if (this.battlePhysicalSkill['stamina'] - (power / 4) <= 0)
            flag = false
        if (this.battlePhysicalSkill['erobic'] - (power / 3) <= 0)
            flag = false
        if (this.battlePhysicalSkill['anerobic'] - (power / 2) <= 0)
            flag = false
        if (flag){
            this.battlePhysicalSkill['stamina'] = this.battlePhysicalSkill['stamina'] - (power / 4)
            this.battlePhysicalSkill['erobic'] = this.battlePhysicalSkill['erobic'] - (power / 3)
             this.battlePhysicalSkill['anerobic'] = this.battlePhysicalSkill['anerobic'] - (power / 2)
        }
        return flag
    }

    checkIfBlock(power: number){
        var flag = true
        if (this.battlePhysicalSkill['stamina'] - (power / 4) <= 0)
            flag = false
        if (this.battlePhysicalSkill['erobic'] - (power / 3) <= 0)
            flag = false
        if (this.battlePhysicalSkill['anerobic'] - (power / 2) <= 0)
            flag = false
        if (flag){
            this.battlePhysicalSkill['stamina'] = this.battlePhysicalSkill['stamina'] - (power / 4)
            this.battlePhysicalSkill['erobic'] = this.battlePhysicalSkill['erobic'] - (power / 3)
             this.battlePhysicalSkill['anerobic'] = this.battlePhysicalSkill['anerobic'] - (power / 2)
        }
        return flag
    }

    checkIfAdvance(power: number){
        var flag = true
        if (this.battlePhysicalSkill['stamina'] - (power / 4) <= 0)
            flag = false
        if (this.battlePhysicalSkill['erobic'] - (power / 3) <= 0)
            flag = false
        if (this.battlePhysicalSkill['anerobic'] - (power / 2) <= 0)
            flag = false
        if (flag){
            this.battlePhysicalSkill['stamina'] = this.battlePhysicalSkill['stamina'] - (power / 4)
            this.battlePhysicalSkill['erobic'] = this.battlePhysicalSkill['erobic'] - (power / 3)
             this.battlePhysicalSkill['anerobic'] = this.battlePhysicalSkill['anerobic'] - (power / 2)
        }
        return flag
    }

    checkIfRetreat(power: number){
        var flag = true
        if (this.battlePhysicalSkill['stamina'] - (power / 4) <= 0)
            flag = false
        if (this.battlePhysicalSkill['erobic'] - (power / 3) <= 0)
            flag = false
        if (this.battlePhysicalSkill['anerobic'] - (power / 2) <= 0)
            flag = false
        if (flag){
            this.battlePhysicalSkill['stamina'] = this.battlePhysicalSkill['stamina'] - (power / 4)
            this.battlePhysicalSkill['erobic'] = this.battlePhysicalSkill['erobic'] - (power / 3)
             this.battlePhysicalSkill['anerobic'] = this.battlePhysicalSkill['anerobic'] - (power / 2)
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