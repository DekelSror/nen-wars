import { BattleAction } from "./Engine"



class Turn {
    // isOver = false
    actions: (BattleAction | undefined)[] = [undefined, undefined]
    duration: number

    constructor(durationSeconds: number) {
        this.duration = durationSeconds
    }
    
    async end() {
        for (let tick = 0; tick < this.duration; tick++) {
            const interval = await new Promise(r => setTimeout(r, 1000))
        
            if ((this.actions[0] && this.actions[1])) {
                break
            }
        }

        return this
    }

    submitAction(action: BattleAction, player: number) {
        this.actions[player] = action
    }
}


export default Turn