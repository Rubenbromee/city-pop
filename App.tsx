import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './style'
import SearchByCountry from './SearchByCountry';
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
		<Stack.Navigator>
			<Stack.Screen name="Home" component={HomeScreen}/>
			<Stack.Screen name="CountrySearch" component={SearchByCountry}/>
		</Stack.Navigator>
    </NavigationContainer>
  );
}


