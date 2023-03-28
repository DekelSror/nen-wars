import { useState } from "react"
import Battle from "../Game/Battle"
import { HumanPlayer, AiPlayer } from "../Player"

type SinglePlayerBattleProps = {
    human: HumanPlayer
    machine: AiPlayer
}

const SinglePlayerBattle = ({human, machine}: SinglePlayerBattleProps) => {
    const [battle, setBattle] = useState(new Battle(human.collection[0], machine.nenUser))


    return <div>
        
    </div>
}

export default SinglePlayerBattle