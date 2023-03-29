import NenUser from "../NenUser";
import { BattleAction, GameEngine, NenEngine } from "./Engine";
import { NenBattler } from "./NenBattler";
import Turn from "./Turn";


class Battle {
    battler1: NenBattler
    battler2: NenBattler
    engine: GameEngine
    isOver = false
    history: Turn[] = []
    currentTurn?: Turn = undefined
    pollingInterval?: NodeJS.Timer

    constructor(user1: NenUser, user2: NenUser) {
        this.engine = new NenEngine()
        this.battler1 = this.engine.generatePlayer(user1)
        this.battler2 = this.engine.generatePlayer(user2)
    }

    get turnCount() {
        return this.history.length
    }

    calculateEffects(actions: (BattleAction | undefined)[]) {
        const a_battler_died = false

        if (a_battler_died) {
            this.isOver = true
        }
    }

    async turn() {
        this.currentTurn = new Turn(5)

        await this.currentTurn!.end()

        if (this.currentTurn) {
            this.history.push(this.currentTurn)
            this.calculateEffects(this.currentTurn.actions)

            this.currentTurn = undefined
        }
    }

    submitTurnAction(action: BattleAction, player: number) {
        if (this.currentTurn) {
            console.log('submitting', action, 'for', player)
            this.currentTurn.submitAction(action, player)
        } else console.log('no currentTurn!')
    }
}



export default Battle