import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import styles from '../style/style';

type Props = NativeStackScreenProps<RootStackParamList, 'CountrySearch'>

export default function SearchByCountry({ navigation }: Props) {
    const [countryData, setCountryData] = useState<Array<CountryItem>>([]);
    const [countryQuery, setCountryQuery] = useState<string>("");
    const [fetchTrigger, setFetchTrigger] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorTrigger, setErrorTrigger] = useState<boolean>(false);

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
            }).catch(function () {
                temp = true;
                setErrorTrigger(temp);
            });

            // d.geonames should not be evaluated as undefined per the catch block above
            if (!errorTrigger) {
                let temp: CountryItem[] = []; // Since setting a state is asynchronus state is set to a temporary variable containing the new content
                responseJSON!.then((d) => { // A is the feature class for countries

                    // Empty result check
                    if (d.geonames.length === 0) {
                        setErrorTrigger(true);
                    }

                    d.geonames.map((obj: CountryObject, idx: number) => {
                        temp.push({ name: obj.name, id: obj.countryName + idx, key: idx, countryCode: obj.countryCode });
                    })
                    setCountryData(temp);
                }).catch(function () {
                    // Have already handled the promise rejection with the if statement on line 44. This is just to remove a warning.
                })
            }

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
                                    <Text style={styles.errorText}>No results found for query!</Text>
                                </View>
                            ) :
                            (
                                <ScrollView style={styles.scrollList}>
                                    {
                                        countryData.map((obj, idx) => {
                                            return (
                                                <Pressable key={idx} style={styles.countryItem} onPress={() => navigation.navigate('CountryCities', { countryCode: obj.countryCode, countryName: obj.name })}>
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
