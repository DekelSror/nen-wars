import { NenSkill } from "./NenSkills"
import NenUser from "./NenUser"


export const Skilling = (props: {user: NenUser, setUser: (u: NenUser) => void}) => {
    const {user, setUser} = props

    const onSkillInto = (skill: NenSkill) => {
        setUser(user.skillInto(skill.name, 10))
    }
    
    return <div style={{padding: 10}}>
        <h4> Nen Skills </h4>
        <div style={{display: 'flex', flexDirection: 'row'}}>
            {user.skillables.map((s, i) => {
                
                return <div key={i} style={{display: 'flex', flexDirection: 'column', gap: 5}}>
                    <div> {s.name} </div>
                    <div style={{paddingLeft: 5}}> {s.rank} </div>
                    <div style={{paddingLeft: 5, paddingRight: 10}}> {s.costPerRound} </div>
                    <button onClick={() => onSkillInto(s)} > upgrade (10) </button>
                </div>
            })}

        </div>
    </div>
}
