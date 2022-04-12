import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, TouchableHighlight, View } from 'react-native';
import styles from '../style/style';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen: React.FC<Props> = ({ navigation }: Props) => {
	return (
		<View style={styles.container}>
			<View style={styles.headerBlock}>
				<Text style={styles.header}>CityPop</Text>
			</View>
			<View style={styles.contentBlock}>
				<TouchableHighlight activeOpacity={0.6} underlayColor="#909090" style={styles.button} onPress={() => navigation.navigate('CitySearch')}>
					<Text style={styles.homebuttonText}>Search by city</Text>
				</TouchableHighlight>
				<TouchableHighlight activeOpacity={0.6} underlayColor="#909090" style={styles.button} onPress={() => navigation.navigate('CountrySearch')}>
					<Text style={styles.homebuttonText}>Search by country</Text>
				</TouchableHighlight>
				{/*<StatusBar style='auto' />*/}
			</View>
		</View>
	);
}

export default HomeScreen;