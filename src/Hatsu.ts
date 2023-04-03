import Battle from "./Game/Battle";
import { AuraTypeName } from "./NenDetails";

type Buff = 'raise stat' | 'drain aura' | 'increase speed'
type Debuff = 'lower stat' | 'slow' | 'poison' | 'stun'
type Setup = 'sum damage' | 'sum attack' | 'count blocks' | 'sum aura'
type Condition = 'no damage dealt' | 'no damage taken' | 'enemy uses aura' | 'enemy blocks' | 'no block'
type Spell = 'projectile' | 'summon' | 'bind' | 'copy hatsu' | 'drain aura' | 'drain hp'

interface IHatsu {
    isActive: () => boolean
    isReady: () => boolean
    do: (battle: Battle) => void
}

export class Hatsu {
    auraType: AuraTypeName
    turnsToLoad: number
    auraCostPlan: number[] = []
    damagePlan: number[] = []
    buffs: Buff[] = []
    debuffs: Debuff[] = []
    setups: Setup[] = []
    conditions: Condition[] = []


    constructor(auraType: AuraTypeName, turnsToLoad: number) {
        this.auraType = auraType
        this.turnsToLoad = turnsToLoad
    }

    
}


const JajankenRock = (() => {
    let h = new Hatsu('enhancement', 2)

    h.damagePlan = [0, 0, 99]
    h.auraCostPlan = [10, 10, 10]
    h.conditions = ['no damage taken']
    h.buffs = ['raise stat']
    
    return h

})()





