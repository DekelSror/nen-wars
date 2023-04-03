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
    const [attackPower, setAttackPower] = useState(0)
    const [blockPower, setBlockPower] = useState(0)
    // const [humanAction, setHumanAction] = useState<BattleAction>()

    // do only once per turn
    useEffect(() => {
        if (battle.current.isOver) return
        battle.current.turn().then(f5)
        battle.current.submitTurnAction(machine.strategy.decide(battle.current.turnCount), 1)
    }, [battle.current.turnCount])
    
    return <div>

        {battle.current.isOver && <div>
            {battle.current.battler1.hp <= 0 && battle.current.battler2.user.name + ' is the winner'}     
            {battle.current.battler2.hp <= 0 && battle.current.battler1.user.name + ' is the winner'}     
        </div>}

        <div> distance: {battle.current.distanceBetweenBattlers} </div>
        <div>
            {battle.current.battler1.user.name}

            <button onClick={() => {
                battle.current.submitTurnAction({actionType: 'attack', actionPower: attackPower}, 0)
            }} > GO! </button>

            <input size={20} type={'number'} min= {0} max={battle.current.battler1.aura} step={1} onChange={() => setAttackPower(attackPower + 1)}/>
            {/* <input type={'number'} min= {0} max={battle.current.battler1.aura} step={1} onChange={() => setBlockPower(blockPower + 1)}/> */}
            <div>your hp: {battle.current.battler1.hp}</div>
            <div>enemy hp: {battle.current.battler2.hp}</div>
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