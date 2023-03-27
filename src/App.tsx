import React, { useState } from 'react';
import './App.css';
import { AuraType } from './AuraType';
import nenDetails, { AuraTypeName } from './NenDetails';
import { NenSkill } from './NenSkills';
import NenUser, { copy } from './NenUser';


const Skilling = (props: {user: NenUser, setUser: (u: NenUser) => void}) => {
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

const AuraTypeSkilling = (props: {user: NenUser, setUser: (u: NenUser) => void}) => {
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

const AuraTypesDisplay = () => {
    return <div className='hexagon' style={{border: '1px solid pink', position: 'relative', height: 140, width: 140}}>
        <div style={{border: '10px solid red', borderRadius: 10, width: 1, height: 1, position: 'absolute', top: 5, left: 65}} />
        <div style={{border: '10px solid green', borderRadius: 10, width: 1, height: 1, position: 'absolute', top: 35, left: 125}} />
        <div style={{border: '10px solid blue', borderRadius: 10, width: 1, height: 1, position: 'absolute', top: 95, left: 125}} />
        <div style={{border: '10px solid black', borderRadius: 10, width: 1, height: 1, position: 'absolute', top: 115, left: 65}} />
        <div style={{border: '10px solid blue', borderRadius: 10, width: 1, height: 1, position: 'absolute', top: 95, left: 5}} />
        <div style={{border: '10px solid green', borderRadius: 10, width: 1, height: 1, position: 'absolute', top: 35, left: 5}} />
    </div>
}

const App = () => {
    const [user, _setUser] = useState(new NenUser('Steve', 'enhancement'))
    const [battling, setBattling] = useState(false)

    // this is not the way to manage state :)
    const setUser = (u: NenUser) => {
        _setUser(copy(u))
    }
    
    return <div style={{width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 10}}>
        {!battling && <div >
            {/* {AuraTypesDisplay()} */}
            <div style={{display: 'flex'}}>
                <span style={{marginRight: 15}}>NenUser: {user.name}</span>
                <span>balance: {user.balance}</span>
            </div>

            <Skilling user={user} setUser={setUser} />
            <AuraTypeSkilling user={user} setUser={setUser} />
            <button onClick={() => setBattling(true)}>Fight!</button>
        </div>}


        {/* BATTLE PART */}
        {battling && <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>

            <div style={{display: 'flex'}}>
                {Object.values(user.auraTypes).map(auraType => {
                    // ideally, draw a hexagon instead
                    return <div key={auraType.name} style={{paddingLeft: 5}}>
                        {auraType.name} | {auraType.rank}
                    </div>
                })}
            </div>
            
            <div style={{borderBottom: '2px solid grey'}}>
                <span>ACTIVE SKILLS</span>
                {user.activeSkills.map(skill => {
                    return <div key={skill.name}>{skill.name}</div>
                })}

            </div>
            
            <div style={{borderBottom: '2px solid grey'}}>
                <span>OTHER SKILLS</span>
                {user.skillables.filter(s => !user.activeSkills.find(a => a.name === s.name)).map(s => {

                    return <div key={s.name} style={{padding: 5, border: '1px solid black'}} onClick={() => {
                        setUser(user.activateSkill(s.name))
                    }}>
                        <span  >
                            activate {s.name} | {s.rank} | {s.costPerRound}
                        </span>
                        <span> {nenDetails.skillDescription(s.name)} </span>

                    </div>
                })}
            </div>

            <div> remaining aura: {user.aura} </div>
            
            
            
            <button onClick={() => {
                if (user.totalAuraCost > user.aura) {
                    // the user is KO'd
                    // user.knockOut()
                    // grant the winner prize and penalty to loser???
                    // return to home
                }
                setUser(user.deductAura())
            }} >
                End Turn
            </button>

            <button onClick={() => setBattling(false)}>SURRENDER</button>

        </div>}
    </div>
}


export default App;
