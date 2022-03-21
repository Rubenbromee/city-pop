import { StatusBar } from 'expo-status-bar';
import { Text, View, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './style'
import SearchByCountry from './SearchByCountry';
import StackNavigationProp from '@react-navigation/stack';


export default function HomeScreen({navigation}:any) {
    return(
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <Button title="Search by country" onPress={() => navigation.navigate('CountrySearch')}/>
            <StatusBar style="auto"/>
        </View>
    );
}