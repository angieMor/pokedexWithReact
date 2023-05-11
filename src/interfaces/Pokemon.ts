import {Stat} from "./Stat";

export interface Pokemon {
    name : string;
    sprite : string;
    stats : Array<Stat>;
    types : Array<string>;
}