import { View, TextInput, Button, Text, FlatList } from "react-native";
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


    // Datafetching reacts on query change
    useEffect(() => {
        fetchData(countryQuery).then((d) => {
            setData(d);

            // Format display data
            d.geonames.map((obj:any) => {
                setDisplayData([...displayData, {name: obj.name}])
            })
        })
    }, [countryQuery]);

    return (
        <View>
            <TextInput style={styles.input} value={countryQuery} onChangeText={setCountryQuery} placeholder="Enter a country"/>
            <FlatList data={displayData} renderItem={({item}) => <Text>{item.name}</Text>}/>
        </View>
    );

}
