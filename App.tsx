import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CitiesInCountry from './components/CitiesInCountry';
import CityInfo from './components/CityInfo';
import HomeScreen from './components/HomeScreen';
import SearchByCity from './components/SearchByCity';
import SearchByCountry from './components/SearchByCountry';

// In paramaters for each navigation screen is given in types
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
				<Stack.Screen name='CountrySearch' component={SearchByCountry} options={{ headerTransparent: true, title: 'CityPop' }} />
				<Stack.Screen name='CountryCities' component={CitiesInCountry} options={{ headerTransparent: true, title: 'Search' }} />
				<Stack.Screen name='CityInfo' component={CityInfo} options={{ headerTransparent: true, title: 'Back' }} />
				<Stack.Screen name='CitySearch' component={SearchByCity} options={{ headerTransparent: true, title: 'CityPop' }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}


