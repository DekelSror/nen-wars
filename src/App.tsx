import React, { useState } from 'react';
import './App.css';
import PlayerHome from './components/PlayerHome';
import SinglePlayerBattle from './components/SinglePlayerBattle';
import NenUser from './NenUser';
import { HumanPlayer } from './Player';
import SimpleEnemy from './SimpleEnemy';


const player1 = new HumanPlayer([new NenUser('Steve', 'enhancement')], 500)
const player2 = SimpleEnemy()


const App = () => {

    const [battling, setBattling] = useState(false)

    return <div style={{width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 10}}>
        {!battling && <PlayerHome player={player1} />}
        {battling && <SinglePlayerBattle human={player1} machine={player2} />}    
        <button onClick={() => setBattling(!battling)} >{battling ? 'SURRENDER' : 'START BATTLE'}</button>
    </div>
}


export default App;
