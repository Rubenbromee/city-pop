import { View, TextInput, Button, Text, FlatList, SafeAreaView } from "react-native";
import { useEffect, useState } from 'react';
import styles from './style';



async function fetchData(userQuery:string) {
    let apiQuery = "http://api.geonames.org/searchJSON?q=" + userQuery + "&maxRows=1&featureClass=A&username=weknowit";
    let response:any = await fetch(apiQuery);
    let data = await response.json();

    return data;
}

export default function SearchByCountry() {
    const [data, setData] = useState<SearchResult>() // For logic
    const [displayData, setDisplayData] = useState<any>([]); // For rendering
    const [countryQuery, setCountryQuery] = useState<string>("");
    const [fetchTrigger, setFetchTrigger] = useState<boolean>(false);


    // Datafetching reacts on query change
    useEffect(() => {
        if (fetchTrigger) {
            let temp:any[] = []; // Since setting a state is asynchronus state is set to a temporary variable containing the new content
            fetchData(countryQuery).then((d) => {
                console.log(d);
                setData(d);
                // Format display data
                d.geonames.map((obj:any, idx:any) => {
                    temp.push({name: obj.name, id: obj + idx, key: idx});
                })
                setDisplayData(temp);

            })
            setFetchTrigger(false);
        }
    }, [fetchTrigger]);

    return (
        <SafeAreaView style={styles.searchContainer}>
            <TextInput style={styles.input} value={countryQuery} onChangeText={setCountryQuery} placeholder="Enter a country"/>
            <Button title="Search" onPress={() => setFetchTrigger(true)}/>
            <FlatList data={displayData} keyExtractor={item => item.id} renderItem={({item}) => <Text>{item.name}</Text>}  />
        </SafeAreaView>
    );

}
