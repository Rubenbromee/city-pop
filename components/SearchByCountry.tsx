import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import styles from '../style/style';

type Props = NativeStackScreenProps<RootStackParamList, 'CountrySearch'>

const SearchByCountry: React.FC<Props> = ({ navigation }: Props) => {
	const [countryData, setCountryData] = useState<Array<CountryItem>>([]);
	const [countryQuery, setCountryQuery] = useState<string>("");
	const [fetchTrigger, setFetchTrigger] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [errorTrigger, setErrorTrigger] = useState<boolean>(false);
	const [errorCountry, setErrorCountry] = useState<string>("");

	useEffect(() => {
		if (fetchTrigger) {
			setLoading(true);

			// Fetch variables
			let apiCountryQuery: string = 'http://api.geonames.org/searchJSON?q=' + countryQuery + '&maxRows=10&featureClass=A&username=weknowit';
			let responseJSON: Promise<CountrySearchResult>;
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
			}).catch(() => {
				temp = true;
				setErrorTrigger(temp);
			});

			// d.geonames should not be evaluated as undefined per the catch block above
			if (!temp) {
				let tempArray: CountryItem[] = []; // Since setting a state is asynchronus state is set to a temporary variable containing the new content
				responseJSON!.then((d) => { // A is the feature class for countries

					// Empty result check
					if (d.geonames.length === 0) {
						temp = true;
						setErrorTrigger(temp);
					}

					temp = true;
					setErrorTrigger(temp);

					d.geonames.map((obj: CountryObject, idx: number) => {
						// If exact match exists, don't throw error
						if (obj.name === countryQuery) {
							temp = false;
							setErrorTrigger(temp);
						}

						tempArray.push({ name: obj.name, id: obj.countryName + idx, key: idx, countryCode: obj.countryCode });
					})

					// To prevent list from trying to load on faulty query
					if (temp) {
						tempArray = [];
					}

					setCountryData(tempArray);
				}).catch(() => {
					// Have already handled the promise rejection with the if statement on line 44. This is just to remove a warning.
				})
			}

			setErrorTrigger(temp);
			setErrorCountry(countryQuery);
			setFetchTrigger(false);
		}
	}, [fetchTrigger]);

	return (
		<View style={styles.container}>
			<View style={styles.headerBlock}>
				<Text style={styles.header}>Search by country</Text>
			</View>
			<View style={styles.contentBlock}>
				<TextInput style={styles.input} value={countryQuery} onChangeText={setCountryQuery} placeholder='Enter a country' />
				<TouchableHighlight activeOpacity={0.6} underlayColor="#909090" style={styles.searchButtonBorder} onPress={() => setFetchTrigger(true)}>
					<Image style={styles.searchButton} source={{ uri: 'https://iconvulture.com/wp-content/uploads/2017/12/magnifying-glass.png' }} />
				</TouchableHighlight>
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
									<Text style={styles.errorText}>Sorry! No countries found with name "{errorCountry}".</Text>
								</View>
							) :
							(
								<ScrollView style={styles.scrollList}>
									{
										countryData.map((obj, idx) => {
											return (
												<TouchableHighlight activeOpacity={0.6} underlayColor="#909090" key={idx} style={styles.countryItem} onPress={() => navigation.navigate('CountryCities', { countryCode: obj.countryCode, countryName: obj.name })}>
													<Text style={styles.listItemText}>{obj.name}</Text>
												</TouchableHighlight>
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

export default SearchByCountry;
