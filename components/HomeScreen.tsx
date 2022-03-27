import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';
import styles from '../style/style';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export default function HomeScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.headerBlock}>
                <Text style={styles.header}>CityPop</Text>
            </View>
            <View style={styles.contentBlock}>
                <Pressable style={styles.button} onPress={() => navigation.navigate('CitySearch')}>
                    <Text style={styles.homebuttonText}>Search by city</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => navigation.navigate('CountrySearch')}>
                    <Text style={styles.homebuttonText}>Search by country</Text>
                </Pressable>
                {/*<StatusBar style='auto' />*/}
            </View>
        </View>
    );
}