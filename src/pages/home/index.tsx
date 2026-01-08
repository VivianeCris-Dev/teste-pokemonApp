import { Text, View, ImageBackground } from 'react-native';
import { styles } from './styles';
import Button from '../../components/button/Button';

export default function Home({ navigation }: any) {
  return (
    <ImageBackground
      source={require('../../assets/pokemon.png')}
      style={styles.home}
      resizeMode="cover"
    >
      <View style={styles.div}>
        <Text style={styles.title}>VIVIANE CRISTINA ALVES PINTO</Text>

        <ImageBackground
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Button
          title="Scannear QRCODE"
          onPress={() => navigation.navigate('Camera')}
        />
      </View>
    </ImageBackground>
  );
}
