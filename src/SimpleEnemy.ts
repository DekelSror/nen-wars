import { PhysicalBattleAction } from "./Game/Engine"
import { NenSkillName } from "./NenDetails"
import NenUser from "./NenUser"
import { AiPlayer } from "./Player"


// type BattleAction = {
//     actionType: 'activate skill' | 'deactivate skill' | 'attack' | 'block'
//     skillName?: NenSkillName
// }

export interface BattleStrategy {
    decide: (turnCount: number) => PhysicalBattleAction
}



class SimpleStrategy implements BattleStrategy {
    decide(turnCount: number) {
        if (turnCount % 2 === 0) {
            return {physicalSkillName: 'hit', power: 1} as PhysicalBattleAction
        } else {
            return {physicalSkillName: 'block', power: 1 }as PhysicalBattleAction
        }
        }
}


export interface Enemy {
    nenUser: NenUser
    strategy: BattleStrategy
}


const simpleEnemy = () => new AiPlayer(new NenUser('Leol', 'conjuration'), new SimpleStrategy())


export default simpleEnemy