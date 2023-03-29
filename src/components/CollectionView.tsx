import { useState } from "react"
import NenUser from "../NenUser"
import { HumanPlayer } from "../Player"
import NenUserView from "./NenUserView"

const CollectionView = (props: {player: HumanPlayer}) => {
    const {player} = props
    
    const [chosen, setChosen] = useState<NenUser>()

    return <div>
        <div style={{padding: 15}}>
            {!chosen && player.collection.map(nenUser => {

                return <div 
                    key={nenUser.name}
                    onClick={() => setChosen(nenUser)}
                    style={{display: 'flex', gap: 15}}
                >
                    <span>{nenUser.name}</span>
                    <span>{nenUser.auraTypeAffinity}</span>
                    <span>{nenUser.maxAura}</span>
                </div>
            })}

        </div>

        {chosen && <div>
            <NenUserView 
                user={chosen}
                onSKillInto={skillName => player.skillInto(chosen, skillName, 10)}
                onUpgradeAuraType={auraTypeName => player.upgradeAuraType(chosen, auraTypeName, 10)}
            />
            <button onClick={() => setChosen(undefined)}>BACK TO COLLECTION</button>
        </div>}

    </div>
}

export default CollectionView