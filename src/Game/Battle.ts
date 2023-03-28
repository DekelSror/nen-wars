import NenUser from "../NenUser";
import { BattleAction, GameEngine, NenEngine } from "./Engine";
import { NenBattler } from "./NenBattler";


class Battle {
    turnCount: number
    battler1: NenBattler
    battler2: NenBattler
    engine: GameEngine

    constructor(user1: NenUser, user2: NenUser) {
        this.turnCount = 0
        this.engine = new NenEngine()
        this.battler1 = this.engine.generatePlayer(user1)
        this.battler2 = this.engine.generatePlayer(user2)
    }


    start() {

    }

    
    turn() {
        // listeners
        // 
        const turnTime = setTimeout(() => {
            // force end turn
            // hide human controls
            this.turnCount++
            // check for battle end
        }, 5000)

        // request decisionst
        // const player1Decision: BattleAction = {
            
        // }

        // const user2Decision = []

        // engine.calcDecisions(player1Decision, user2Decision)

        // execute turn
    }
}



export default Battle