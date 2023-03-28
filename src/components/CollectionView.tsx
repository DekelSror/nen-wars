import { useState } from "react"
import NenUser from "../NenUser"
import { HumanPlayer } from "../Player"
import NenUserView from "./NenUserView"

const CollectionView = (props: {player: HumanPlayer}) => {
    const [chosen, setChosen] = useState<NenUser>()
    const {player} = props


    return <div>
        {!chosen && player.collection.map(nenUser => {

            return <div 
                key={nenUser.name}
                onClick={() => setChosen(nenUser)}
            >
                <span>{nenUser.name}</span>
                <span>{nenUser.auraTypeAffinity}</span>
                <span>{nenUser.maxAura}</span>
            </div>
        })}

        {chosen && <div>
            <NenUserView 
                user={chosen}
                onSKillInto={skillName => player.skillInto(chosen, skillName, 10)}
                onUpgradeAuraType={auraTypeName => player.upgradeAuraType(chosen, auraTypeName, 10)}
            />
            <button>BACK TO COLLECTION</button>
        </div>}

    </div>
}

export default CollectionView