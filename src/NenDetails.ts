

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