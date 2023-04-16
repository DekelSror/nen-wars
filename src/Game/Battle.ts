import NenUser from "../NenUser";
import { GameEngine, NenEngine, PhysicalBattleAction } from "./Engine";
import { NenBattler } from "./NenBattler";
import Turn from "./Turn";


export type PhysicalSkillModifier = {
    hit: number
    block: number
    advance: number
    retreat: number
}

export const zeroPhysicalSkillMod = () => ({hit: 0, block: 0, advance: 0, retreat: 0})

class Battle {
    battler1: NenBattler
    battler2: NenBattler
    engine: GameEngine
    isOver = false
    history: Turn[] = []
    currentTurn?: Turn = undefined
    distanceBetweenBattlers: number

    battler1Mods = zeroPhysicalSkillMod()
    battler2Mods = zeroPhysicalSkillMod()

    constructor(user1: NenUser, user2: NenUser) {
        this.engine = new NenEngine()
        this.battler1 = this.engine.generatePlayer(user1)
        this.battler2 = this.engine.generatePlayer(user2)

        this.distanceBetweenBattlers = 10
    }

    get turnCount() {
        return this.history.length
    }

    calculateEffects(rawActions: (PhysicalBattleAction | undefined)[]) {
        const actions: PhysicalBattleAction[] = rawActions.map(a => (a ?? {physicalSkillName: 'block', power: 1}))

        this.battler1.usePhysicalSkill(actions[0])
        this.battler2.usePhysicalSkill(actions[1])

        const action1Power = this.battler1.physicalActionPower(actions[0])
        const action2Power = this.battler2.physicalActionPower(actions[1])

        // determine hit / hit | block / block | hit / block
        if (actions[0].physicalSkillName === 'hit' && actions[1].physicalSkillName === 'hit') {
            if (action1Power > action2Power)
                this.battler2.hp -= (action1Power - action2Power)
            else if (action1Power < action2Power)
                this.battler1.hp -= (action2Power - action1Power)        
        }

        else if (actions[0].physicalSkillName === 'block' && actions[1].physicalSkillName === 'hit') {
            this.blockerAttacker(this.battler1, this.battler2, action1Power, action2Power) 
        }
        else if (actions[1].physicalSkillName === 'block' && actions[0].physicalSkillName === 'hit') {
            this.blockerAttacker(this.battler2, this.battler1, action2Power, action1Power)    
        }
        else {
            this.battler1.blockCount += 1
            this.battler2.blockCount += 1
        }

        if (this.battler1.hp <= 0 || this.battler2.hp <= 0 ) {
            this.isOver = true
        }
    }

    async turn() {
        this.currentTurn = new Turn(3)

        
        if (this.currentTurn) {
            this.battler1Mods = this.battler1.physicalSkillsModifiers()
            this.battler2Mods = this.battler2.physicalSkillsModifiers()

            await this.currentTurn.end()

            this.calculateEffects(this.currentTurn.actions)
            this.history.push(this.currentTurn)

            this.currentTurn = undefined

            if (this.battler1.hp <= 0 || this.battler2.hp <= 0) {
                this.isOver = true
            }
        }
    }

    submitTurnAction(action: PhysicalBattleAction, player: number) {
        if (this.currentTurn) {
            this.currentTurn.submitAction(action, player)
        } else console.log('no currentTurn!')
    }

    blockerAttacker(blocker: NenBattler, attacker: NenBattler, attackPower: number, blockPower: number){
        //maybe count the blockCount in battler
        if (blocker.blockCount > 2){
            blocker.hp -= attackPower
            blocker.blockCount = 0
        } 
        else {
            blocker.hp -= attackPower - blockPower < 0 ? 0 : attackPower - blockPower
            blocker.blockCount += 1
        }    
    }
}



export default Battle