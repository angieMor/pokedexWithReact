import {ListParams} from "../interfaces/ListParams";
import React, {useState} from "react";
import Error from "../FC8R.gif";
import {Simulate} from "react-dom/test-utils";
import Loading from "../loading.gif";

// Right side of the pokedex, the list of pokemons
function List({pokemonList, setPokemonId, loading, error} : ListParams) {
    // rowSelected when the page is first loaded, is always empty
    const [ rowSelected, setRowSelected ] = useState<string>('');

    if(error){
        return (
            <div className="pokedex-screen pokedex-list">
                <img
                    src={Error}
                    alt="There was an error looking for your pokemons"
                    className="pokedex-no-screen"
                />
            </div>
        )
    }
    return (
        <div className="pokedex-screen pokedex-list">
            {!pokemonList || loading ?
                <img
                    src={Loading}
                    alt="Theres no pokemon yet"
                    className="pokedex-no-screen"
                /> :
                <table>
                    <thead>
                        <tr>
                            <th>Num</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {pokemonList.map(item=>
                        <tr key={item.name}
                            onClick={() => {
                                setPokemonId(item.name);
                                setRowSelected(item.name);
                            }}
                            className={rowSelected === item.name ? 'active' : ''}
                        >
                            <td>{item.url.split('pokemon/')[1].replace('/', '')}</td>
                            <td>{item.name}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default List;