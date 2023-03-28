

export class NenBattler {
    skills: {[k: string]: number}
    constructor(hit: number, defense: number){
        this.skills = {
            hit     : hit,
            defense : defense 
        }
    }
    enter
    useSkill(skill: string, usage: number){
        if (this.skills[skill] >= usage){
            this.skills[skill] = this.skills[skill] - usage
        }
        else{
            console.log(`not enough ${skill} in storage}`)
        }
    }
}