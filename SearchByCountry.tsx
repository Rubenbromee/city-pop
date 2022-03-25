import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Button, FlatList, Pressable, SafeAreaView, Text, TextInput, View, Image } from "react-native";
import styles from './style';
import fetchData from './fetchData';

type Props = NativeStackScreenProps<RootStackParamList, 'CountrySearch'>

export default function SearchByCountry({navigation}:Props) {
    const [countryData, setCountryData] = useState<Array<CountryItem>>([]); // 
    const [countryQuery, setCountryQuery] = useState<string>("");
    const [fetchTrigger, setFetchTrigger] = useState<boolean>(false);

    useEffect(() => {
        if (fetchTrigger) {
            let temp:CountryItem[] = []; // Since setting a state is asynchronus state is set to a temporary variable containing the new content
            fetchData(countryQuery, "A").then((d) => { // A is the feature class for countries
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
        <View style={styles.container}>
            <View style={styles.headerBlock}>
                <Text style={styles.header}>Search by country</Text>
            </View>
            <View style={styles.contentBlock}>
                <TextInput style={styles.input} value={countryQuery} onChangeText={setCountryQuery} placeholder="Enter a country"/>
                <Pressable style={styles.searchButtonBorder} onPress={() => setFetchTrigger(true)}>
                    <Image style={styles.searchButton} source={{uri: "https://iconvulture.com/wp-content/uploads/2017/12/magnifying-glass.png"}}/>
                </Pressable>
                <FlatList style={styles.list} data={countryData} keyExtractor={item => item.id} renderItem={({item}) => 
                    <Pressable style={styles.countryItem} onPress={() => navigation.navigate('CountryCities',{countryCode: item.countryCode})}>
                        <Text style={styles.listItemText}>{item.name}</Text>
                    </Pressable>
                }/>
            </View>
        </View>
    );
}
