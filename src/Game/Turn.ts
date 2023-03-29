import { BattleAction } from "./Engine"



class Turn {
    isOver = false
    actions: (BattleAction | undefined)[] = [undefined, undefined]

    constructor(durationSeconds: number) {
        const time = setTimeout(() => {
            this.isOver = true
        }, durationSeconds * 1000)
    }
    
    async end() {
        while (true) {
            // sleep 1 second
            const interval = await new Promise(r => setTimeout(r, 1000))

            if (this.isOver) {
                console.log('turn over')
                return this
            }
        }
    }

    submitAction(action: BattleAction, player: number) {
        this.actions[player] = action
        console.log('turn action', action, player)
        if (this.actions[0] && this.actions[1]) {
            console.log('turn got both actions')
            this.isOver = true
        }
    }
}


export default Turn