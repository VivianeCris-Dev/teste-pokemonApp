import React from 'react';
import { styles } from './styles';
import { TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
}
export default function Button({ title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
