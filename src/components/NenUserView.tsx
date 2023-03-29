import { AuraTypeSkilling } from "./AuraTypeSkilling"
import { NenSkillName, AuraTypeName } from "../NenDetails"
import { Skilling } from "./NenSkilling"
import NenUser from "../NenUser"

type NenUserViewProps = {
    user: NenUser, 
    onSKillInto: (skillName: NenSkillName) => void, 
    onUpgradeAuraType: (auraTypeName: AuraTypeName) => void}

const NenUserView = ({user, onSKillInto, onUpgradeAuraType}: NenUserViewProps) => {
    
    return <div>
        <div>
            <span> {user.name} </span>
        </div>
        <Skilling user={user} upgradeSkill={onSKillInto} />
        <AuraTypeSkilling user={user} upgradeAuraType={onUpgradeAuraType} />
    </div>
}

export default NenUserView