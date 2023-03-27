import { AuraType, makeAuraTypes } from "./AuraType"
import nenDetails, { AuraTypeName, NenSkillName } from "./NenDetails"
import { NenSkill, makeSkills } from "./NenSkills"

class NenUser {
    name: string
    auraTypeAffinity: AuraTypeName

    skills: {[k: string]: NenSkill}
    auraTypes: {[k: string]: AuraType}
    
    aura = 5
    balance = 100 // belongs to player


    constructor(name: string, auraTypeAffinity: AuraTypeName) {
        this.name = name
        this.auraTypeAffinity = auraTypeAffinity
        this.skills = makeSkills()
        this.auraTypes = makeAuraTypes()
    }

    calculateBattleResult(didIWin: boolean) {

    }

    get skillables() {
        return Object.values(this.skills).filter(s => this.basesCovered(s.name))
    }
    
    get totalAuraCost() {
        return this.activeSkills.reduce((total, s) => total + s.costPerRound, 0)
    }

    get activeSkills() {
        return Object.values(this.skills).filter(s => s.active)
    }
    
    basesCovered(skillName: NenSkillName) {
        const basesNames = nenDetails.skillBases(skillName)
        if (!basesNames) return true

        for (const name of basesNames) {
            if (!name) continue
            if (this.skills[name].rank < 3) {
                return false
            }
        }

        return true
    }
    
    // actions
    deductAura() {
        this.aura -= this.totalAuraCost
        return this
    }
    
    activateSkill(skillName: NenSkillName) {
        this.skills[skillName].active = true

        return this
    }

    skillInto(skillName: NenSkillName, cost: number) {
        if (cost > this.balance) {
            return this
        }

        this.balance -= cost
        this.skills[skillName].rank++

        return this
    }

    upgradeAuraType(auraTypeName: AuraTypeName, cost: number) {
        const eff = nenDetails.auraTypeEffectiveness(this.auraTypeAffinity)

        const upgradeAmount = eff[auraTypeName]

        if (cost <= this.balance) {
            console.log('before', this.auraTypes[auraTypeName])
            this.balance -= cost
            this.auraTypes[auraTypeName].rank += upgradeAmount
            console.log('after', this.auraTypes[auraTypeName])
        }

        return this
    }


}

const copydict = (dict: {[k: string]: any}) => Object.values(dict).reduce((d, v) => ({...d, [v.name]: v}), {})

export const copy = (from: NenUser) => {
    const user = new NenUser(from.name, from.auraTypeAffinity)
    user.skills = copydict(from.skills)
    user.auraTypes = copydict(from.auraTypes)
    user.aura = from.aura
    user.balance = from.balance

    return user
}

export default NenUser