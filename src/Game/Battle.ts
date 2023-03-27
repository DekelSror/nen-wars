import NenUser from "../NenUser";



class Battle {
    turnCount: number
    player1: NenUser
    user2: NenUser

    constructor(player1: NenUser, user2: NenUser) {
        this.turnCount = 0
        this.player1 = player1
        this.user2 = user2
    }


    turn() {
        // listeners
        // 
        const turnTime = setTimeout(() => {
            // force end turn
            // hide human controls
            this.turnCount++
            // check for battle end
        }, 5000)

        // request decisionst
        const player1Decision = []
        const user2Decision = []

        engine.calcDecisions(player1Decision, user2Decision)

        // execute turn
    }
}



export default Battle