import { AuraType, makeAuraTypes } from "./AuraType"
import { NenSkillDict } from "./Game/NenBattler"
import nenDetails, { AuraTypeName, NenSkillName } from "./NenDetails"
import { NenSkill, makeSkills } from "./NenSkills/NenSkills"
import { NenSkillBase } from "./NenSkills/NenSkillBase"
import { PhysicalSkill, PhysicalSkillName } from "./PhysicalSkills"



class NenUser {
    name: string
    auraTypeAffinity: AuraTypeName
    skills: NenSkillDict<NenSkill>
    auraTypes: {[k: string]: AuraType}
    physicalSkills: {
        stamina: PhysicalSkill
        aerobic: PhysicalSkill
        unaerobic: PhysicalSkill
    }
    
    maxAura = 5

    constructor(name: string, auraTypeAffinity: AuraTypeName) {
        this.name = name
        this.auraTypeAffinity = auraTypeAffinity
        this.skills = makeSkills()
        this.auraTypes = makeAuraTypes()
        this.physicalSkills = {
            stamina: {name: 'stamina', rank: 3, costPerRound: 2},
            aerobic: {name: "aerobic", rank: 5, costPerRound: 2},
            unaerobic: {name: "anaerobic", rank: 2, costPerRound: 4}
        }
    }

    get skillables() {
        return Object.values(this.skills).filter(s => this.basesCovered(s.name))
    }
    
    basesCovered(skillName: NenSkillName) {
        const basesNames = nenDetails.skillBases(skillName)
        if (!basesNames) return true

        for (const name of basesNames) {
            if (!name) continue

            const skill = this.skills[name as NenSkillName]

            if (skill.rank < 3) {
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