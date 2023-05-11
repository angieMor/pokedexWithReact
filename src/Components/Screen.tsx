import {ScreenParams} from "../interfaces/ScreenParams";
import Stats from "./Stats";
import Loading from "../loading.gif";
import Error from "../FC8R.gif";

// Left screen side of the pokedex showing the sprite of the pokemon,
// types, and also implements the Stats component
function Screen({ pokemon, loading, error }: ScreenParams){
    if(error){
        return (
            <div className="pokedex-screen">
                <img
                    src={Error}
                    alt="There was an error with your pokemon"
                    className="pokedex-no-screen"
                />
            </div>
        )
    }

    return (
        <div className="pokedex-screen">
            { !pokemon || loading ?
                <img
                    src={Loading}
                    alt="Theres no pokemon"
                    className="pokedex-no-screen"
                /> :
                <div className="pokemon-info">
                    <h2 className="pokemon-name">{pokemon.name}</h2>
                    <img
                        className="pokemon-img"
                        src={pokemon.sprite}
                        alt={pokemon.name}
                    />
                    <ul className="pokemon-stats">
                        <li className="pokemon-stat">
                            <span className="stat-name"><b>Type: </b></span>
                            <span>{pokemon.types.join(", ")}</span>
                        </li>
                        {pokemon.stats.map(item =>
                            <Stats key={item.stat.name} base_stat={item.base_stat} effort={item.effort} stat={item.stat}/>
                        )}
                    </ul>
                </div>
            }
        </div>
    )
}

export default Screen;