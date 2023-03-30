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
        if(actions[0] && actions[1]){
            this.battler1.useMove(actions[0]?.actionType, actions[0]?.actionPower)
            this.battler2.useMove(actions[1]?.actionType, actions[1]?.actionPower)           
        }

        if (actions[0]?.actionType == 'attack' && actions[1]?.actionType == 'attack'){
            if (actions[0].actionPower > actions[1].actionPower)
                this.battler2.hp -= (actions[0].actionPower - actions[1].actionPower)
            else if (actions[0].actionPower < actions[1].actionPower)
                this.battler1.hp -= (actions[1].actionPower - actions[0].actionPower)        
        }

        else if (actions[0]?.actionType == 'block' && actions[1]?.actionType == 'attack'){
            this.blockerAttacker(this.battler1, this.battler2, actions[0].actionPower, actions[1].actionPower) 
        }
        else if (actions[1]?.actionType == 'block' && actions[0]?.actionType == 'attack'){
            this.blockerAttacker(this.battler2, this.battler1, actions[1].actionPower, actions[0].actionPower)    
        }
        else{
            this.battler1.blockCount += 1
            this.battler2.blockCount += 1
        }

        if (this.battler1.hp <= 0 || this.battler2.hp <= 0 ) {
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

    blockerAttacker(blocker: NenBattler, attacker: NenBattler, attackPower: number, blockPower: number){
        //maybe count the blockCount in battler
        if (blocker.blockCount > 2){
            blocker.hp -= attackPower
            blocker.blockCount = 0
        } 
        else{
            blocker.hp -= attackPower - blockPower < 0 ? 0 : attackPower - blockPower
            blocker.blockCount += 1
        }    
    }
}



export default Battle