import React from 'react'
import {Stat} from "../interfaces/Stat";

// Each stat that have a pokemon: Type, Defense, Speed...
function Stats(stat : Stat){
    return (
        <li className="pokemon-stat">
            <span className="stat-name"><b>{stat.stat.name}: </b></span>
            <span>{stat.base_stat}</span>
        </li>
    )
}

export default Stats;