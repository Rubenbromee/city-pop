import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from "react-native";
import styles from '../style/style';

type Props = NativeStackScreenProps<RootStackParamList, 'CityInfo'>

const CityInfo: React.FC<Props> = ({ route }: Props) => {
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

export default CityInfo;