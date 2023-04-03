import Battle from "./Game/Battle"


export type NenSkillName =  'ten' | 'ren' | 'zetsu' | 'gyo' | 'the_in' | 'en' | 'shu' | 'kou' | 'ken' | 'ryo'
export type AuraTypeName = 'enhancement' | 'transmutation' | 'conjuration' | 'specialist' | 'manipulation' | 'emission'

class NenDetails {
    skillDescription(skill: NenSkillName) {
        return {
            ten: 'contain aura',
            ren: 'increase aura',
            zetsu: 'stop aura flow',
            gyo: 'concentrate aura in body part',
            the_in: 'conceal aura',
            en: 'sphere of awareness',
            shu: 'give aura to object',
            kou: 'extreme gyo',
            ken: 'fortify self',
            ryo: 'distribute aura',
        }[skill]
    }

    skillEffectDescription(skill: NenSkillName) {
        return {
            ten: 'contain aura: other skills cost less -> enemy skills cost more',
            ren: 'increase aura: replenish aura every turn / increase skill effectiveness',
            zetsu: 'stop aura flow: evade aura based attacks',
            gyo: 'concentrate aura in body part: increase attack / block power',
            the_in: 'conceal aura: make enemy block less effective -> avoid aura based conditions',
            en: 'sphere of awareness: your block is more effective',
            shu: 'give aura to object',
            kou: 'extreme gyo: drastically increase attack / block, lower defense',
            ken: 'fortify self: increase defense (even if not blocking)',
            ryo: 'distribute aura',
        }[skill]
    }

    skillEffects(skill: NenSkillName) {
        const jumpTable: {[k: string]: (b: Battle) => void} = {
            ten: (b: Battle) => {},
            ren: (b: Battle) => {},
            zetsu: (b: Battle) => {},
            gyo: (b: Battle) => {},
            the_in: (b: Battle) => {},
            en: (b: Battle) => {},
            shu: (b: Battle) => {},
            kou: (b: Battle) => {},
            ken: (b: Battle) => {},
            ryo: (b: Battle) => {},
        }

        return jumpTable[skill]
    }

    skillBases(skill: NenSkillName) {
        return {
            ten: undefined,
            zetsu: undefined,
            ren: ['ten'],
            shu: ['ten'],
            ken: ['ren'],
            gyo: ['ren'],
            ryo: ['ken', 'gyo'],
            the_in: ['zetsu'],
            kou: ['gyo', 'zetsu'],
            en: ['ken']
        }[skill]
    }

    auraTypeDescription(auraTypeName: AuraTypeName){
        return {
            enhancement: 'use aura to strengthen or increase the natural abilities of an object or one\'s own body',
            manipulation: 'control living or non-living things, including aura constructs',
            conjuration: 'create a physical, independent, material object out of one\'s aura',
            specialist: '',
            transmutation: 'change the properties of their aura to mimic something else or replicate specific attributes.',
            emission: 'separate aura from body; ranged / long lasting attacks'
        }[auraTypeName]
    }

    auraTypeEffectiveness: (userNenType: AuraTypeName) => ({[k: string]: number}) = userNenType => {
        const nenTypes =  ['enhancement', 'transmutation', 'conjuration', 'specialist', 'manipulation', 'emission']
        const userIndex = nenTypes.indexOf(userNenType)

        const toNenType = (i: number) => {
            return nenTypes[i >= 0 ? i % nenTypes.length : nenTypes.length + i]
        }

        const near = [userIndex + 1, userIndex - 1].map(toNenType).reduce((d, t) => ({...d, [t]: 80}), {})
        const far = [userIndex + 2, userIndex - 2].map(toNenType).reduce((d, t) => ({...d, [t]: 60}), {})
        const whereverYouAre = toNenType(userIndex + 3)

        return {
            [userNenType]: 100,
            ...near,
            ...far,
            [whereverYouAre]: 40
        }
    }
}

const nenDetails = new NenDetails()

export default nenDetails