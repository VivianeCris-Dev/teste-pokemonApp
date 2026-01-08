import { createContext, useContext, useState } from 'react';
import axios from 'axios';

type PokemonContextType = {
  pokemon: any;
  loadPokemon: (id: string) => Promise<void>;
  previousId: number | null;
  nextId: number | null;
};

const PokemonContext = createContext<PokemonContextType>(
  {} as PokemonContextType,
);

export function PokemonProvider({ children }: any) {
  const [pokemon, setPokemon] = useState<any>(null);
  const [previousId, setPreviousId] = useState<number | null>(null);
  const [nextId, setNextId] = useState<number | null>(null);

  async function loadPokemon(id: string) {
    const cleanId = id.replace(/\D/g, ''); // 🔥 remove tudo que não é número

    if (!cleanId) return;

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${cleanId}`,
      );

      setPokemon(response.data);
      setPreviousId(response.data.id > 1 ? response.data.id - 1 : null);
      setNextId(response.data.id + 1);
    } catch (error) {
      console.log('Erro ao buscar Pokémon:', error);
    }
  }

  return (
    <PokemonContext.Provider
      value={{ pokemon, loadPokemon, previousId, nextId }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  return useContext(PokemonContext);
}
