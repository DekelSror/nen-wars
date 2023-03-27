import nenDetails from "./NenDetails"
import NenUser from "./NenUser"

export const AuraTypeSkilling = (props: {user: NenUser, setUser: (u: NenUser) => void}) => {
    const {user, setUser} = props

    const eff = nenDetails.auraTypeEffectiveness(user.auraTypeAffinity)

    return <div style={{display: 'flex', flexDirection: 'column', gap: 10, padding: 10}}>
        <h4>Aura Type Proficiency</h4>
        {Object.values(user.auraTypes).map(auraType => {

            return <div 
                key={auraType.name} 
                style={{display: 'flex', gap: 15, border: '1px solid grey'}}
                onClick={() => setUser(user.upgradeAuraType(auraType.name, 10))}
            >
                <div> {auraType.name} | {auraType.rank} </div>
                <div > upgrade by {eff[auraType.name]} for 10 </div>
            </div>
        })}

    </div>
}
