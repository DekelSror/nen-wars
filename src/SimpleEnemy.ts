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
        let res: BattleAction = {actionType: 'activate skill'} 

        if (turnCount < 3) {
            res = {actionType: 'activate skill', skillName: 'ren'}
        }
        else {
            if (turnCount % 2 === 0) {
                res = {actionType: 'attack'}
            } else {
                res = {actionType: 'block'}
            }
        }

        return res
    }
}


export interface Enemy {
    nenUser: NenUser
    strategy: BattleStrategy
}


const simpleEnemy = () => new AiPlayer(new NenUser('Leol', 'conjuration'), new SimpleStrategy())


export default simpleEnemy