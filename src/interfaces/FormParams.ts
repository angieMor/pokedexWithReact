import React from "react";

export interface FormParams {
    setPokemonId: React.Dispatch<React.SetStateAction<number | string>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
}