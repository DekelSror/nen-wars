import { AuraType, makeAuraTypes } from "./AuraType"
import nenDetails, { AuraTypeName, NenSkillName } from "./NenDetails"
import { NenSkill, makeSkills } from "./NenSkills"

class NenUser {
    name: string
    auraTypeAffinity: AuraTypeName
    skills: {[k: string]: NenSkill}
    auraTypes: {[k: string]: AuraType}
    
    maxAura = 5

    constructor(name: string, auraTypeAffinity: AuraTypeName) {
        this.name = name
        this.auraTypeAffinity = auraTypeAffinity
        this.skills = makeSkills()
        this.auraTypes = makeAuraTypes()
    }

    get skillables() {
        return Object.values(this.skills).filter(s => this.basesCovered(s.name))
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
}

const copydict = (dict: {[k: string]: any}) => Object.values(dict).reduce((d, v) => ({...d, [v.name]: v}), {})

export const copy = (from: NenUser) => {
    const user = new NenUser(from.name, from.auraTypeAffinity)
    user.skills = copydict(from.skills)
    user.auraTypes = copydict(from.auraTypes)
    user.maxAura = from.maxAura

    return user
}

export default NenUser