import React, { useState } from 'react'
import {FormParams} from "../interfaces/FormParams";

// Left bottom input to searchs pokemon by id or name
function Form({ setPokemonId, setLoading, setError } : FormParams){
    // setPokemon when the page is loaded, is always empty
    const [ pokemon, setPokemon ] = useState<string>('')

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if(pokemon !== ''){
            setLoading(true);
            setError(true);
            
            // If the input is not a number then the text will be lower cased
            const pokemonID = window.isNaN(parseInt(pokemon)) ? pokemon.toLowerCase() : pokemon;
            setPokemonId(pokemonID);
            setPokemon('');
            return;
        }
        setError(true);
    }

    return (
        <form className="pokemon-form" onSubmit={handleSubmit}>
            <input
                className="pokemon-input"
                type="text"
                name="pokemon"
                value={pokemon}
                placeholder="Search for a pokemon"
                onChange={e => setPokemon(e.target.value)}
                autoComplete="off"/>
            <input type="submit" className="pokemon-btn" value=""/>
        </form>
    )
}

export default Form;