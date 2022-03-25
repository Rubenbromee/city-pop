import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CitiesInCountry from './CitiesInCountry';
import CityInfo from './CityInfo';
import HomeScreen from './HomeScreen';
import SearchByCountry from './SearchByCountry';
import SearchByCity from './SearchByCity';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
		<Stack.Navigator>
			<Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
			<Stack.Screen name="CountrySearch" component={SearchByCountry} options={{headerTransparent: true, title: "CityPop"}}/>
      <Stack.Screen name="CountryCities" component={CitiesInCountry} options={{headerTransparent: true}}/>
      <Stack.Screen name="CityInfo" component={CityInfo} options={{headerTransparent: true}}/>
      <Stack.Screen name="CitySearch" component={SearchByCity} options={{headerTransparent: true, title: "CityPop"}}/>
		</Stack.Navigator>
    </NavigationContainer>
  );
}


