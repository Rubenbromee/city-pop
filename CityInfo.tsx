import { View, Text } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import style from './style';
import styles from './style';

type Props = NativeStackScreenProps<RootStackParamList, 'CityInfo'>

export default function CityInfo({ route }: Props) {
    let cityName: string = route.params.cityName;
    let cityPopulation: number = route.params.cityPopulation;
    return (
        <View style={styles.container}>
            <View style={styles.headerBlock}>
                <Text style={styles.header}>{cityName}</Text>
            </View>
            <View style={styles.contentBlock}>
                <View style={styles.populationCard}>
                    <Text style={styles.populationCardHeader}>Population</Text>
                    <Text style={styles.populationCardNumber}>{cityPopulation}</Text>
                </View>
            </View>
        </View>
    );
}