import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './pages/home';
import Details from './pages/details';
import Camera from './pages/camera/index';

export type RootStackParamList = {
  Home: undefined;
  Details: { pokemonId: string };
  Camera: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
