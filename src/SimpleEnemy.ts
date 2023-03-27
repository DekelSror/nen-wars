import NenUser from "./NenUser"




interface BattleStrategy {

}

class SimpleEnemy {
    nenUser: NenUser
    strategy: BattleStrategy

    constructor(strategy: BattleStrategy) {
        this.nenUser = new NenUser('simple enemy', 'enhancement')
        this.strategy = strategy
    }


}


export default SimpleEnemy