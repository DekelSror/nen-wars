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
    async searchForMatches() {
        // api....
        // add to queue - matchmaking...

    }
}



class AiPlayer extends Player {
    strategy: BattleStrategy
    
    constructor(strategy: BattleStrategy) {
        super([], 1000)
        this.strategy = strategy
    }

}


const makePlayer = () => {
    return new Player([], 1000)
}

export {Player, makePlayer, AiPlayer}