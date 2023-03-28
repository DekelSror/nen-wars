import { HumanPlayer } from "../Player"
import CollectionView from "./CollectionView"

const PlayerHome = (props: {player: HumanPlayer}) => {
    const {player} = props

    return <div>

        <CollectionView player={player} />

        <button>SINGLE PLAYER BATTLE</button>
        <button>MULTIPLAYER BATTLE</button>
    </div>
}

export default PlayerHome