import { HumanPlayer } from "../Player"
import CollectionView from "./CollectionView"

const PlayerHome = (props: {player: HumanPlayer}) => {
    const {player} = props

    return <div>

        <CollectionView player={player} />


    </div>
}

export default PlayerHome