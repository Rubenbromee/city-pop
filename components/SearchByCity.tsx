import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import styles from '../style/style';

type Props = NativeStackScreenProps<RootStackParamList, 'CitySearch'>

// Create two css styles for buttons render depending on pressed state

export default function SearchByCountry({ navigation }: Props) {
	const [cityData, setCityData] = useState<Array<CityItem>>([]);
	const [cityQuery, setCountryQuery] = useState<string>("");
	const [fetchTrigger, setFetchTrigger] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [errorTrigger, setErrorTrigger] = useState<boolean>(false);
	const [errorCity, setErrorCity] = useState<string>("");

	useEffect(() => {
		if (fetchTrigger) {
			setLoading(true);

			// Fetch variables
			let apiCountryQuery: string = 'http://api.geonames.org/searchJSON?q=' + cityQuery + '&maxRows=10&featureClass=P&username=weknowit';
			let responseJSON: Promise<CitySearchResult>;
			let temp: boolean = false;

			responseJSON = fetch(apiCountryQuery).then(response => {
				// Invalid fetch
				if (!response.ok) {
					setLoading(false);
					throw ('No data for query');
				}

				// Valid fetch
				setLoading(false);
				temp = false;
				setErrorTrigger(temp);
				return response.json();

				// Error handling
			}).catch(function () {
				temp = true;
				setErrorTrigger(temp);
			})

			// d.geonames should not be evaluated as undefined per the catch block above
			if (!temp) {
				let tempArray: CityItem[] = []; // Since setting a state is asynchronus state is set to a temporary variable containing the new content
				responseJSON!.then((d) => {

					// Empty result check
					if (d.geonames.length === 0) {
						temp = true;
						setErrorTrigger(temp);
					}

					temp = true;
					setErrorTrigger(temp);

					d.geonames.map((obj: CityObject, idx: number) => {
						// If exact match exists, don't throw error
						if (obj.name === cityQuery) {
							temp = false;
							setErrorTrigger(temp);
						}

						tempArray.push({ name: obj.name, population: obj.population, key: idx, id: obj.name + idx });
					});

					// To prevent list from trying to load on faulty query
					if (temp) {
						tempArray = [];
					}

					setCityData(tempArray);

				}).catch(function () {
					// Have already handled the promise rejection with the if statement on line 44. This is just to remove a warning.
				})
			}

			setErrorTrigger(temp);
			setErrorCity(cityQuery);
			setFetchTrigger(false);
		}
	}, [fetchTrigger]);

	return (
		<View style={styles.container}>
			<View style={styles.headerBlock}>
				<Text style={styles.header}>Search by city</Text>
			</View>
			<View style={styles.contentBlock}>
				<TextInput style={styles.input} value={cityQuery} onChangeText={setCountryQuery} placeholder='Enter a city' />
				<Pressable style={styles.searchButtonBorder} onPress={() => setFetchTrigger(true)}>
					<Image style={styles.searchButton} source={{ uri: 'https://iconvulture.com/wp-content/uploads/2017/12/magnifying-glass.png' }} />
				</Pressable>
				{loading ?
					(
						<View style={styles.loadingContainer}>
							<ActivityIndicator size='large' color='#000000' />
						</View>
					) :
					(
						errorTrigger ?
							(
								<View style={styles.errorContainer}>
									<Text style={styles.errorText}>Sorry! No cities found with name "{errorCity}".</Text>
								</View>
							) :
							(
								<ScrollView style={styles.scrollList}>
									{
										cityData.map((obj, idx) => {
											return (
												<Pressable key={idx} style={styles.countryItem} onPress={() => navigation.navigate('CityInfo', { cityName: obj.name, cityPopulation: obj.population })}>
													<Text style={styles.listItemText}>{obj.name}</Text>
												</Pressable>
											)
										})
									}
								</ScrollView>
							)
					)
				}
			</View>
		</View>
	);
}
