import React, {useEffect, useState} from 'react'
import Screen from "./Screen";
import {Pokemon} from "../interfaces/Pokemon";

function Pokedex() {

    // Initialize states for errors or API requests loadings
    const [ errorInfoScreen, setErrorInfoScreen ] = useState<boolean>(false);
    const [ loadingInfoScreen, setLoadingInfoScreen ] = useState<boolean>(true);

    const [ pokemon, setPokemon ] = useState<Pokemon | null>(null);
    // Shows a random pokemon number from 1 to 1010
    const RandomId = Math.floor(Math.random() * 1010 + 1);
    const [ pokemonIdentificator, setPokemonIdentificator ] = useState<number | string>(RandomId);

    // Looks for a pokemon by id or its name
    useEffect(() => {
        // Request the data
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIdentificator}`)
            .then(result => result.json())
            .then(data => {
                // set the pokemon with the required data
                setPokemon({
                    name: data.name,
                    sprite: data.sprites.versions['generation-v']['black-white'].animated['front_default'] ?
                        data.sprites.versions['generation-v']['black-white'].animated['front_default'] : data.sprites['front_default'],
                    stats: data.stats,
                    types: data.types.map((item: { type: { name: string; }; }) => {
                        return item.type.name;
                    })
                });
                setLoadingInfoScreen(false);
                setErrorInfoScreen(false);
            })
            .catch(err => {
                setLoadingInfoScreen(false);
                setErrorInfoScreen(true);
            })
    }, [pokemonIdentificator]);   

    return (
        <div className="pokedex">
            <div className="pokedex-left">
                <div className="pokedex-left-top">
                    <div className={`'light is-sky is-big' ${loadingInfoScreen && 'is-animated'}`}/>
                    <div className="light is-red" />
                    <div className="light is-yellow" />
                    <div className="light is-green" />
                </div>
                <div className="pokedex-screen-container">
                    <Screen
                        pokemon={pokemon}
                        loading={loadingInfoScreen}
                        error={errorInfoScreen}
                    />
                </div>
            </div>
        </div>
    )
}

export default Pokedex;