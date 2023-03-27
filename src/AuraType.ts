import { AuraTypeName } from "./NenDetails"


export type AuraType = {
    name: AuraTypeName
    rank: number
}


export const makeAuraTypes: () => ({[k: string]: AuraType}) = () => ({
    enhancement: {name: 'enhancement', rank: 0},
    transmutation: {name: 'transmutation', rank: 0},
    conjuration: {name: 'conjuration', rank: 0},
    specialist: {name: 'specialist', rank: 0},
    manipulation: {name: 'manipulation', rank: 0},
    emission: {name: 'emission', rank: 0},
})