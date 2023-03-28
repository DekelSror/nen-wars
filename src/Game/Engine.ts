import { NenSkillName } from "../NenDetails";
import NenUser from "../NenUser";
import { NenBattler } from "./NenBattler";



export interface GameEngine {
    generatePlayer: (user: NenUser) => NenBattler
}

export type BattleAction = {
    actionType: 'activate skill' | 'deactivate skill' | 'attack' | 'block'
    skillName?: NenSkillName
}

class NenEngine implements GameEngine{

    generatePlayer(user: NenUser){
        const skills = user.skills
        const defense = this.clacZetsu(skills["zetsu"].rank)
        const hit = this.clacZetsu(skills["ten"].rank)

        return new NenBattler(hit, defense)
    }
    clacZetsu(zetsu: number){
        return zetsu * 10
    }
    calcTen(ten: number){
        return ten * 10
    }
} 
export {NenEngine} 
