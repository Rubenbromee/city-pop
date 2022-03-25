import { View, TextInput, Button, Text, FlatList, SafeAreaView, Pressable } from "react-native";
import { useEffect, useState } from 'react';
import styles from './style';
import CitiesInCountry from "./CitiesInCountry";
import { NativeStackScreenProps } from '@react-navigation/native-stack';


async function fetchCountryData(userQuery:string):Promise<CountrySearchResult> {
    let apiCountryQuery:string = "http://api.geonames.org/searchJSON?q=" + userQuery + "&maxRows=1&featureClass=A&username=weknowit";

    return (fetch(apiCountryQuery).then(response => {
        if (!response.ok) {
            throw new Error("No data for query");
        }
        return response.json()
    }))
}

type Props = NativeStackScreenProps<RootStackParamList, 'CountrySearch'>

export default function SearchByCountry({navigation}:Props) {
    const [countryData, setCountryData] = useState<Array<CountryItem>>([]); // 
    const [countryQuery, setCountryQuery] = useState<string>("");
    const [fetchTrigger, setFetchTrigger] = useState<boolean>(false);

    useEffect(() => {
        if (fetchTrigger) {
            let temp:CountryItem[] = []; // Since setting a state is asynchronus state is set to a temporary variable containing the new content
            fetchCountryData(countryQuery).then((d) => {
                // Format list items, some data used for navigation
                d.geonames.map((obj:CountryObject, idx:number) => {
                    temp.push({name: obj.name, id: obj.name + idx, key: idx, countryCode: obj.countryCode});
                })
                setCountryData(temp);

            })
            setFetchTrigger(false);
        }
    }, [fetchTrigger]);

    return (
        <SafeAreaView style={styles.searchContainer}>
            <TextInput style={styles.input} value={countryQuery} onChangeText={setCountryQuery} placeholder="Enter a country"/>
            <Button title="Search" onPress={() => setFetchTrigger(true)}/>
            <FlatList data={countryData} keyExtractor={item => item.id} renderItem={({item}) => 
                <Pressable style={styles.countryItem} onPress={() => navigation.navigate('CountryCities',{countryCode: item.countryCode})}>
                    <Text>{item.name}</Text>
                </Pressable>
            }/>
        </SafeAreaView>
    );
}
