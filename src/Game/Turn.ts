import { BattleAction } from "./Engine"



class Turn {
    // isOver = false
    actions: (BattleAction | undefined)[] = [undefined, undefined]
    duration: number
    whoWentFirst: 'p1' | 'p2' | 'n/a'

    constructor(durationSeconds: number) {
        this.duration = durationSeconds
        this.whoWentFirst = 'n/a'
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
        if (this.actions[player]) return

        this.actions[player] = action
        
        if (this.whoWentFirst === 'n/a') {
            this.whoWentFirst = (player === 0 ? 'p1' : 'p2')
        }
    }
}


export default Turn