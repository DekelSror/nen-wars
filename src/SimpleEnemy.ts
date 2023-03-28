import { NenSkillName } from "./NenDetails"
import NenUser from "./NenUser"
import { AiPlayer } from "./Player"


// type BattleAction = {
//     actionType: 'activate skill' | 'deactivate skill' | 'attack' | 'block'
//     skillName?: NenSkillName
// }

export interface BattleStrategy {
    decide: (user: NenUser, foe: NenUser, game: any) => BattleAction
}



class SimpleStrategy implements BattleStrategy {
    decide(user: NenUser, foe: NenUser, game: any) {
        let res: BattleAction = {actionType: 'activate skill'} 

        if (game.turn < 3) {
            res = {actionType: 'activate skill', skillName: 'ren'}
        }
        else {
            if (game.turn % 2 === 0) {
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

class SimpleEnemy extends AiPlayer {
    nenUser: NenUser
    
    constructor() {
        super(new SimpleStrategy())
        
        this.nenUser = this.collection[0]
    }
}


export default SimpleEnemy