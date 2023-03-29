import { useEffect, useRef, useState } from "react"
import Battle from "../Game/Battle"
import { BattleAction } from "../Game/Engine"
import { HumanPlayer, AiPlayer } from "../Player"

type SinglePlayerBattleProps = {
    human: HumanPlayer
    machine: AiPlayer
}

const SinglePlayerBattle = ({human, machine}: SinglePlayerBattleProps) => {
    const [refresh, setRefresh] = useState(true)
    const f5 = () => setRefresh(!refresh)
    const battle = useRef(new Battle(human.collection[0], machine.nenUser))
    // const [humanAction, setHumanAction] = useState<BattleAction>()


    // submit bot action after 4 seconds
    // do only once per turn
    useEffect(() => {
        if (battle.current.isOver) return
        console.log('starting turn', battle.current.turnCount)
        battle.current.turn()
        console.log('setting machine action at 4 seconds')
        setTimeout(() => {
            battle.current.submitTurnAction(machine.strategy.decide(battle.current.turnCount), 1)
            f5()
        }, 4000)
    }, [battle.current.turnCount])
    
    return <div>

        <div>
            {battle.current.battler1.user.name}

            <button disabled={Boolean(battle.current.currentTurn && battle.current.currentTurn.actions[0])} onClick={() => {
                console.log('submitting human action')
                battle.current.submitTurnAction({actionType: 'attack'}, 0)
                f5()
            }} > GO! </button>
        </div>


        <div>
            {battle.current.battler2.user.name}
        </div>

        <div>
            {battle.current.history.map((item, i) => <div key={i}>
                {JSON.stringify(item)}
            </div> )}
        </div>
        
        
    </div>
}

export default SinglePlayerBattle