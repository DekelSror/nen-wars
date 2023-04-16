import { NenSkillName } from "../NenDetails";
import NenUser from "../NenUser";
import { BattlePhysicalSkillName, NenBattler } from "./NenBattler";



export interface GameEngine {
    generatePlayer: (user: NenUser) => NenBattler
}

export type PhysicalBattleAction = {
    physicalSkillName: BattlePhysicalSkillName
    power: number
}

export type NenBattleAction = {
    nenSkillName: NenSkillName
    power: number
}

class NenEngine implements GameEngine{

    generatePlayer(user: NenUser){
        const skills = user.skills
        // this should be done in battler ?
        const defense = 1
        const hit = 1

        return new NenBattler(hit, defense, user)
    }

    clacZetsu(zetsu: number){
        return zetsu * 10
    }
    
    calcTen(ten: number){
        return ten * 10
    }
} 
export {NenEngine} 
