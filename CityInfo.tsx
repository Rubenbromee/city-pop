import { View, Text } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'CityInfo'>

export default function CityInfo({route, navigation}:Props) {
    let cityName:string = route.params.cityName; 
    let cityPopulation:number = route.params.cityPopulation;
    return (
        <View>
            <Text>{cityName}</Text>
            <Text>{cityPopulation}</Text>
        </View>
    );
}