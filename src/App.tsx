import React, { useState } from 'react';
import './App.css';
import PlayerHome from './components/PlayerHome';
import SinglePlayerBattle from './components/SinglePlayerBattle';
import Battle from './Game/Battle';
import { NenEngine } from './Game/Engine';
import NenUser, { copy } from './NenUser';
import { AiPlayer, HumanPlayer } from './Player';
import SimpleEnemy from './SimpleEnemy';


const engine = new NenEngine()

const player1 = new HumanPlayer([new NenUser('Steve', 'enhancement')], 500)
const player2 = SimpleEnemy()


const App = () => {

    const [battling, setBattling] = useState(false)

    return <div style={{width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 10}}>
        {!battling && <PlayerHome player={player1} />}
        {battling && <SinglePlayerBattle human={player1} machine={player2} />}        


    </div>
}


export default App;
