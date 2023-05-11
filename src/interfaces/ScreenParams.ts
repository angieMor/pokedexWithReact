import {Pokemon} from "./Pokemon";

export interface ScreenParams {
    pokemon: Pokemon | null;
    loading : boolean;
    error : boolean;
}