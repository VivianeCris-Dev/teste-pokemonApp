import { PokemonProvider } from './src/context/PokemonContext';
import Routes from './src/routes';

export default function App() {
  return (
    <PokemonProvider>
      <Routes />
    </PokemonProvider>
  );
}
