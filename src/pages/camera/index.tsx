import { View, Text, StyleSheet, Alert } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {
  Camera,
  useCameraPermission,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import { styles } from './styles';

export default function CameraScreen() {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  const hasScanned = useRef(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  useEffect(() => {
    if (isFocused) {
      hasScanned.current = false;
      setErrorMessage(null);
    }
  }, [isFocused]);

  useEffect(() => {
    if (!device) {
      Alert.alert('Erro', 'Câmera não encontrada no dispositivo.', [
        { text: 'OK' },
      ]);
    }
  }, [device]);

  function extractPokemonId(value: string): string {
    const match = value.match(/\d+/);

    if (!match) {
      throw new Error('QR Code inválido');
    }

    const id = Number(match[0]);

    if (id <= 0) {
      throw new Error('ID inválido');
    }

    return String(id);
  }

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      if (hasScanned.current) return;

      hasScanned.current = true;

      try {
        const value = codes[0]?.value;
        if (!value) {
          throw new Error();
        }

        const pokemonId = extractPokemonId(value);

        navigation.navigate('Details', { pokemonId });
      } catch {
        setErrorMessage('QR Code inválido. Escaneie um QR válido.');
      }
    },
  });

  if (!device) {
    return null;
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        />
      )}

      <View style={styles.overlay}>
        <View style={styles.box} />
        <Text style={styles.span}>
          {errorMessage ?? 'Aponte para o QR Code'}
        </Text>
      </View>
    </View>
  );
}
