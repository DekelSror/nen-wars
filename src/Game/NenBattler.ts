import { NenSkillBase, nenSkillFactory } from "../NenSkills/NenSkillBase"
import { NenSkill } from "../NenSkills/NenSkills"
import NenUser from "../NenUser"
import { PhysicalSkillModifier, zeroPhysicalSkillMod } from "./Battle"
import { NenBattleAction, PhysicalBattleAction } from "./Engine"


export type NenSkillDict<T> = {
    ten: T
    ren: T
    zetsu: T
    gyo: T
    en: T
    the_in: T
    ken: T
    shu: T
    kou: T
    ryo: T
}

const translateNenSkillDict = <T, P>(d1: NenSkillDict<T>, translator: (t: T) => P) => {
    const rv: NenSkillDict<P> = {
        ten: translator(d1.ten),
        ren: translator(d1.ren),
        zetsu: translator(d1.zetsu),
        gyo: translator(d1.gyo),
        en: translator(d1.en),
        the_in: translator(d1.the_in),
        ken: translator(d1.ken),
        shu: translator(d1.shu),
        kou: translator(d1.kou),
        ryo: translator(d1.ryo),
    }

    return rv
}


export type BattlePhysicalSkillName = "hit" | "block" | "advance" | "retreat"

export class NenBattler {
    user: NenUser
    
    // skills
    battleSkills: NenSkillDict<NenSkillBase>
    battlePhysicalSkill: PhysicalSkillModifier
    
    // resources
    hp: number
    aura: number
    physicalResources: {
        stamina: number
        aerobic: number
        unaerobic: number
    }

    // related to battle history
    blockCount: number//redundntetttt?
    
    constructor(hit: number, defense: number, user: NenUser){
        this.user = user
        this.aura = user.maxAura
        this.hp = 10
        this.blockCount = 0

        this.physicalResources = {
            stamina: user.physicalSkills.stamina.rank * 5,
            aerobic: user.physicalSkills.aerobic.rank * 5,
            unaerobic: user.physicalSkills.unaerobic.rank * 5,
        }

        this.battlePhysicalSkill = this.calcPhysicalSkills()

        this.battleSkills = translateNenSkillDict(user.skills, nenSkillFactory)
    }

    get totalAuraCost() {
        return this.activeSkills.reduce((total, s) => total + s.auraUsage, 0)
    }

    get activeSkills() {
        return Object.values(this.battleSkills).filter(s => s.power > 0)
    }

    calcPhysicalSkills(){
        return {
            hit: this.user.physicalSkills.unaerobic.rank,
            block: 4, //calcBlock()......
            advance: 3,
            retreat: 4
        }
    }

    physicalActionPower(action: PhysicalBattleAction) {
        return this.battlePhysicalSkill[action.physicalSkillName] + 
            this.physicalSkillsModifiers()[action.physicalSkillName] + 
            action.power
    }

    modifiers: (skill: NenSkillBase) => ({[k: string]: number}) = skill => {
        switch (skill.name) {
            case 'gyo':
                const gyoSkill = this.activeSkills.find(s => s.name === 'gyo')
                if (gyoSkill) {
                    return gyoSkill.effectOnPhysicalSkill
                } else {
                    return zeroPhysicalSkillMod()
                }
            default:
                return zeroPhysicalSkillMod()
        }
    }

    physicalSkillsModifiers() {
        return this.activeSkills.reduce((mods, skill) => {
            const skillMods = this.modifiers(skill)
            return {
                hit: mods.hit + skillMods.hit,
                block: mods.block + skillMods.block,
                advance: mods.advance + skillMods.advance,
                retreat: mods.retreat + skillMods.retreat,
            }
        }, {hit: 0, block: 0, advance: 0, retreat: 0})
    }
    
    usePhysicalSkill(action: PhysicalBattleAction) {
        const {physicalSkillName: name, power} = action

        if (name == "hit")
        {
                if (this.checkIfHit(power)) {
                console.log(`awesome Hit!!!!`)
            }
            else {
                console.log(`not enough ${name}. need ${power}`)
            }
        }
        else if (name == "block")
        {
                if (this.checkIfBlock(power)) {
                console.log(`awesome Block!!!!`)
            }
            else {
                console.log(`not enough ${name}. need ${power}`)
            }
        }
        else if (name == "advance")
        {
                if (this.checkIfAdvance(power)) {
                console.log(`damn youre quick!!!!`)
            }
            else {
                console.log(`not enough ${name}. need ${power}`)
            }
        }
        else if (name == "retreat")
        {
                if (this.checkIfRetreat(power)) {
                console.log(`damn youre quick!!!!`)
            }
            else {
                console.log(`not enough ${name}. need ${power}`)
            }
        }
    }

    checkIfHit(power: number){
        var flag = true
        if (this.physicalResources.stamina - (power / 4) <= 0)
            flag = false
        if (this.physicalResources.aerobic - (power / 3) <= 0)
            flag = false
        if (this.physicalResources.unaerobic - (power / 2) <= 0)
            flag = false
        if (flag){
            this.physicalResources.stamina = this.physicalResources.stamina - (power / 4)
            this.physicalResources.aerobic = this.physicalResources.aerobic - (power / 3)
            this.physicalResources.unaerobic = this.physicalResources.unaerobic - (power / 2)
        }
        return flag
    }

    checkIfBlock(power: number) {
        var flag = true
        if (this.physicalResources.stamina - (power / 4) <= 0)
            flag = false
        if (this.physicalResources.aerobic - (power / 3) <= 0)
            flag = false
        if (this.physicalResources.unaerobic - (power / 2) <= 0)
            flag = false
        if (flag){
            this.physicalResources.stamina = this.physicalResources.stamina - (power / 4)
            this.physicalResources.aerobic = this.physicalResources.aerobic - (power / 3)
             this.physicalResources.unaerobic = this.physicalResources.unaerobic - (power / 2)
        }
        return flag
    }

    checkIfAdvance(power: number){
        var flag = true
        if (this.physicalResources.stamina - (power / 4) <= 0)
            flag = false
        if (this.physicalResources.aerobic - (power / 3) <= 0)
            flag = false
        if (this.physicalResources.unaerobic - (power / 2) <= 0)
            flag = false
        if (flag){
            this.physicalResources.stamina = this.physicalResources.stamina - (power / 4)
            this.physicalResources.aerobic = this.physicalResources.aerobic - (power / 3)
             this.physicalResources.unaerobic = this.physicalResources.unaerobic - (power / 2)
        }
        return flag
    }

    checkIfRetreat(power: number){
        var flag = true
        if (this.physicalResources.stamina - (power / 4) <= 0)
            flag = false
        if (this.physicalResources.aerobic - (power / 3) <= 0)
            flag = false
        if (this.physicalResources.unaerobic - (power / 2) <= 0)
            flag = false
        if (flag){
            this.physicalResources.stamina = this.physicalResources.stamina - (power / 4)
            this.physicalResources.aerobic = this.physicalResources.aerobic - (power / 3)
             this.physicalResources.unaerobic = this.physicalResources.unaerobic - (power / 2)
        }
        return flag
    }

    deductAura() {
        this.aura -= this.totalAuraCost
        return this
    }
    
    activateSkill(action: NenBattleAction) {
        this.battleSkills[action.nenSkillName].power = action.power

        return this
    }

}