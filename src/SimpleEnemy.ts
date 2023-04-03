import { BattleAction } from "./Game/Engine"
import { NenSkillName } from "./NenDetails"
import NenUser from "./NenUser"
import { AiPlayer } from "./Player"


// type BattleAction = {
//     actionType: 'activate skill' | 'deactivate skill' | 'attack' | 'block'
//     skillName?: NenSkillName
// }

export interface BattleStrategy {
    decide: (turnCount: number) => BattleAction
}



class SimpleStrategy implements BattleStrategy {
    decide(turnCount: number) {
        if (turnCount % 2 === 0) {
            return {actionType: 'attack', actionPower: 1} as BattleAction
        } else {
            return {actionType: 'block', actionPower: 1} as BattleAction
        }
        }
}


export interface Enemy {
    nenUser: NenUser
    strategy: BattleStrategy
}


const simpleEnemy = () => new AiPlayer(new NenUser('Leol', 'conjuration'), new SimpleStrategy())


export default simpleEnemy