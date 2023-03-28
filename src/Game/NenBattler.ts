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

    constructor(hit: number, defense: number, user: NenUser){
        this.user = user
        this.aura = user.maxAura

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
    
    useMove(move: string, usage: number) {
        if (this.moves[move] >= usage) {
            this.moves[move] = this.moves[move] - usage
        }
        else {
            console.log(`not enough ${move}. need ${usage} got ${this.moves[move]}`)
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