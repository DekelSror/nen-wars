import NenUser from "../NenUser";
import { NenBattler } from "./NenBattler";



interface GameEngine {
    generatePlayer: (user: NenUser) => NenBattler
}