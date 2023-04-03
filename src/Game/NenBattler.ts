import { NenSkillName } from "../NenDetails"
import { NenSkill } from "../NenSkills"
import NenUser from "../NenUser"



export type BattleSkill = NenSkill & {
    active: boolean
}

export class NenBattler {
    moves: {[k: string]: number}
    user: NenUser
    aura: number
    battleSkills: {[k: string]: BattleSkill}
    hp: number
    blockCount: number

    constructor(hit: number, defense: number, user: NenUser){
        this.user = user
        this.aura = user.maxAura
        this.hp = 10
        this.blockCount = 0

        this.moves = {
            hit     : hit,
            defense : defense 
        }

        // turn nenskills to battleskils!
        this.battleSkills = Object.values(user.skills).reduce((dict, skill) => ({...dict, [skill.name]: {...skill, active: false}}), {})
    }

    get totalAuraCost() {
        return this.activeSkills.reduce((total, s) => total + s.costPerRound, 0)
    }

    get activeSkills() {
        return Object.values(this.battleSkills).filter(s => s.active)
    }
    
    useMove(move: string, power: number) {
        if (this.moves[move] >= power) {
            this.moves[move] = this.moves[move] - power
        }
        else {
            console.log(`not enough ${move}. need ${power} got ${this.moves[move]}`)
        }
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