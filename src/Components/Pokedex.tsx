import React, {useEffect, useState} from 'react'
import Screen from "./Screen";
import {Pokemon} from "../interfaces/Pokemon";
import Form from "./Form";
import List from "./List";
import {BasicData} from "../interfaces/BasicData";

function Pokedex() {

    // Initialize states for errors or API requests loadings
    const [ errorInfoScreen, setErrorInfoScreen ] = useState<boolean>(false);
    const [ errorListScreen, setErrorListScreen ] = useState<boolean>(false);
    const [ loadingInfoScreen, setLoadingInfoScreen ] = useState<boolean>(true);
    const [ loadingListScreen, setLoadingListScreen ] = useState<boolean>(true);

    const [ pokemon, setPokemon ] = useState<Pokemon | null>(null);
    // Shows a random pokemon number from 1 to 1010
    const RandomId = Math.floor(Math.random() * 1010 + 1);
    const [ pokemonIdentificator, setPokemonIdentificator ] = useState<number | string>(RandomId);

    const [ pokemonType, setPokemonType] = useState<string>('');
    const [ pokemonList, setPokemonList] = useState<Array<BasicData>>([]);
    const [ currentPage, setCurrentPage] = useState<number>(1);
    const [ pokemonsToShow, setPokemonsToShow ] = useState<number>(10);
    const [ types, setTypes ] = useState<Array<BasicData>>([]);

    // Loads all the pokemon data at first render or looks for the pokemon by type
    useEffect(() => {
        let url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1010";
        if (pokemonType) {
            url = `https://pokeapi.co/api/v2/type/${pokemonType}`;
            setLoadingListScreen(true);
        }
        // Request the data
        fetch(url)
            // If the request was succesfull, and the promise was fullfiled, the JSON response is taken
            .then(result => result.json())
            // Takes the data of the pokemons
            .then(data => {
                let pokemons = [];
                // Depending on the url fetched, gives different keys so we take the data according to them
                if (data.results) {
                    pokemons = data.results;
                } else {
                    // Maps the pokemon info, each one will go with name and url
                    pokemons = data.pokemon.map((item: { pokemon: { name: string; url: string; }; }) => {
                        return {
                            name : item.pokemon.name,
                            url : item.pokemon.url
                        }
                    });
                    // Filters a pokemon if reachs higher than 1010
                    pokemons = pokemons.filter((pokemon: BasicData) => {
                        return Number(pokemon.url.split('pokemon/')[1].replace('/', '')) <= 1010;
                    });
                }
                // Slice the pokemons array to calculate the pokemons that should go depending on the page
                // and the number of pokemons to show
                setPokemonList(pokemons.slice((currentPage - 1) * pokemonsToShow,
                    ((currentPage - 1) * pokemonsToShow) + pokemonsToShow));
                setLoadingListScreen(false);
                setErrorListScreen(false);
            })
            // If at some point an error appears, its catched
            .catch(err => {
                setLoadingListScreen(false);
                setErrorListScreen(true);
            })
    }, [currentPage, pokemonType, pokemonsToShow]);

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

    // Looks for the types available for the existing pokemon
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/type/")
            .then(result => result.json())
            .then(data => {
                setTypes(data.results);
            })
    }, []);

    

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
                <div className="pokedex-left-bottom">
                    <div className="pokedex-left-bottom-lights">
                        <div className="light is-blue is-medium" />
                        <div className="light is-green is-large" />
                        <div className="light is-orange is-large" />
                    </div>
                    <Form
                        setPokemonId={setPokemonIdentificator}
                        setLoading={setLoadingInfoScreen}
                        setError={setErrorInfoScreen}
                    />
                </div>
            </div>
            <div className="pokedex-right">
                <div className="pokedex-screen-container pokedex-list-container">
                    <List pokemonList={pokemonList} setPokemonId={setPokemonIdentificator} loading={loadingListScreen} error={errorListScreen} setLoadingScreen={setLoadingInfoScreen}></List>
                </div>
                <div className="pagination">
                    <button className="light is-red pagination-button"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}>
                        {"<<"}
                    </button>
                    <div className="light is-yellow pagination-button">{currentPage}</div>
                    <button className="light is-green pagination-button"
                            disabled={pokemonList.length < pokemonsToShow}
                            onClick={() => setCurrentPage(currentPage + 1)}>
                        {">>"}
                    </button>
                    <select onChange={e =>{
                        setPokemonsToShow(Number(e.target.value));
                        setCurrentPage(1);
                    }}>
                        <option value='10'>10</option>
                        <option value='20'>20</option>
                        <option value='30'>30</option>
                        <option value='40'>40</option>
                        <option value='50'>50</option>
                    </select>
                    <select onChange={e => setPokemonType(e.target.value)}>
                        <option value=''>Types</option>
                        {types.map(item =>{
                            if(item.name === "shadow" || item.name === "unknown"){
                                return;
                            }
                            return <option key={item.name} value={item.name}>{item.name}</option>
                        })}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Pokedex;