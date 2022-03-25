import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Button, FlatList, Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import styles from './style';
import fetchData from "./fetchData";


type Props = NativeStackScreenProps<RootStackParamList, 'CitySearch'>

export default function SearchByCountry({navigation}:Props) {
    const [cityData, setCityData] = useState<Array<CityItem>>([]); // 
    const [cityQuery, setCountryQuery] = useState<string>("");
    const [fetchTrigger, setFetchTrigger] = useState<boolean>(false);

    useEffect(() => {
        if (fetchTrigger) {
            fetchData(cityQuery, "P").then((d) => { // P is the feature class for cities
                let temp:CityItem[] = []; // Since setting a state is asynchronus state is set to a temporary variable containing the new content
                d.geonames.map((obj:CityObject, idx:number) => { 
                    temp.push({name: obj.name, population: obj.population, key: idx, id: obj.name + idx});
                });
                setCityData(temp);

            })
            setFetchTrigger(false);
        }
    }, [fetchTrigger]);

    return (
        <View style={styles.container}>
            <View style={styles.headerBlock}>
                <Text style={styles.header}>Search by city</Text>
            </View>
            <View style={styles.contentBlock}>
                <TextInput style={styles.input} value={cityQuery} onChangeText={setCountryQuery} placeholder="Enter a city"/>
                <Button title="Search" onPress={() => setFetchTrigger(true)}/>
                <FlatList data={cityData} keyExtractor={item => item.id} renderItem={({item}) => 
                    <Pressable style={styles.countryItem} onPress={() => navigation.navigate('CityInfo', {cityName: item.name, cityPopulation: item.population})}>
                        <Text>{item.name}</Text>
                    </Pressable>
                }/>
            </View>
        </View>
    );
}
