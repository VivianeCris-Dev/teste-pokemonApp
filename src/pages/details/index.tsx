import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { useEffect, useRef } from 'react';
import { styles } from './styles';
import Button from '../../components/button/Button';
import { usePokemon } from '../../context/PokemonContext';

export default function Details({ route, navigation }: any) {
  const { pokemonId } = route.params;

  const { pokemon, loadPokemon, previousId, nextId } = usePokemon();

  const loadedId = useRef<string | null>(null);

  useEffect(() => {
    if (!pokemonId) return;
    if (loadedId.current === pokemonId) return;

    loadedId.current = pokemonId;
    loadPokemon(pokemonId);
  }, [pokemonId, loadPokemon]);

  if (!pokemon) {
    return <ActivityIndicator size="large" />;
  }

  function capitalize(text: string) {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  const types = pokemon.types
    .map((t: any) => capitalize(t.type.name))
    .join(', ');

  return (
    <ImageBackground
      source={require('../../assets/pokemon.png')}
      style={styles.home}
      resizeMode="cover"
    >
      <Text style={styles.title}>ID: {pokemon.id}</Text>
      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.div}>
        <Text style={styles.span}>Nome: {capitalize(pokemon.name)}</Text>
        <Text style={styles.span}>Tipo: {types}</Text>
        <View style={styles.btn}>
          {previousId && (
            <Button
              title="Anterior"
              onPress={() =>
                navigation.replace('Details', {
                  pokemonId: String(previousId),
                })
              }
            />
          )}

          {nextId && (
            <Button
              title="Próximo"
              onPress={() =>
                navigation.replace('Details', {
                  pokemonId: String(nextId),
                })
              }
            />
          )}
        </View>
        <Button title="Voltar" onPress={() => navigation.navigate('Home')} />
      </View>
    </ImageBackground>
  );
}
