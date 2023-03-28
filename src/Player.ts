import nenDetails, { NenSkillName, AuraTypeName } from "./NenDetails"
import NenUser from "./NenUser"
import { BattleStrategy } from "./SimpleEnemy"


class Player {
    balance: number
    collection: NenUser[]

    // 
    constructor(collection: NenUser[], balance: number) {
        this.collection = collection
        this.balance = balance
    }

    // belongs to humanPlayer class
}

export class HumanPlayer extends Player {
    constructor(collection: NenUser[], balance: number) {
        super(collection, balance)
    }

    async searchForMatches() {
        // api....
        // add to queue - matchmaking...
    }

    singlePlayerBattle(chosenUser: NenUser) {
        
    }


    skillInto(user: NenUser, skillName: NenSkillName, cost: number) {
        if (cost > this.balance) {
            return this
        }

        const uIndex = this.collection.findIndex(u => u.name === user.name)

        this.balance -= cost
        this.collection[uIndex].skills[skillName].rank++
    }

    upgradeAuraType(user: NenUser, auraTypeName: AuraTypeName, cost: number) {
        const uIndex = this.collection.findIndex(u => u.name === user.name)

        const eff = nenDetails.auraTypeEffectiveness(this.collection[uIndex].auraTypeAffinity)

        const upgradeAmount = eff[auraTypeName]

        if (cost <= this.balance) {
            this.balance -= cost
            this.collection[uIndex].auraTypes[auraTypeName].rank += upgradeAmount
        }
    }
}

class AiPlayer {
    strategy: BattleStrategy
    nenUser: NenUser

    constructor(user: NenUser,strategy: BattleStrategy) {
        this.nenUser = user
        this.strategy = strategy
    }
}


export {Player, AiPlayer}