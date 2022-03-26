import { View, Text, FlatList, Pressable, ScrollView } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from "react";
import styles from './style';

async function fetchCityData(countryCode:string) {
    let apiCityQuery = "http://api.geonames.org/searchJSON?featureClass=P&country=" + countryCode + "&maxRows=5&&username=weknowit"

    return (fetch(apiCityQuery).then(response => {
        if (!response.ok) {
            throw new Error("No data for query");
        }
        return response.json()
    }))
}

type Props = NativeStackScreenProps<RootStackParamList, 'CountryCities'>

export default function CitiesInCountry({route, navigation}:Props) {
    const [cityData, setCityData] = useState<Array<CityItem>>([]);
    let countryCode = route.params.countryCode;
    let countryName = route.params.countryName;

    useEffect(() => {
        fetchCityData(countryCode).then((d) => {
            let temp:CityItem[] = [];
            d.geonames.map((obj:CityObject, idx:number) => {
                temp.push({name: obj.name, population: obj.population, key: idx, id: obj.name + idx});
            });
            setCityData(temp);
        })
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerBlock}>
                <Text style={styles.header}>{countryName}</Text>
            </View>
            <View style={styles.contentBlock}>
                <ScrollView style={styles.scrollList}>
                    {
                        cityData.map((obj, idx) => {
                            return (
                                <Pressable key={idx} style={styles.countryItem} onPress={() => navigation.navigate('CityInfo',{cityName: obj.name, cityPopulation: obj.population})}>
                                    <Text style={styles.listItemText}>{obj.name}</Text>
                                </Pressable>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    );
}