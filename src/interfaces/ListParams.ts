import {BasicData} from "./BasicData";
import React from "react";

export interface ListParams {
    pokemonList: Array<BasicData>;
    setPokemonId : React.Dispatch<React.SetStateAction<number | string>>;
    loading : boolean;
    error : boolean;
}