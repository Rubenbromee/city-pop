import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		marginTop: '3%',
		marginBottom: '3%',
		height: 80,
		borderColor: 'black',
		borderWidth: 3,
		width: '100%',
		textAlign: 'center',
		fontSize: 20
	},
	searchContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 100,
	},
	countryItem: {
		backgroundColor: '#fff',
		borderWidth: 3,
		borderColor: 'black',
		padding: 2,
		textAlign: 'center',
		marginBottom: 5,
		marginTop: 15,
		height: 85,
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'center'
	},
	header: {
		fontSize: 50,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	headerBlock: {
		backgroundColor: '#fff',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		paddingTop: '20%',
		paddingRight: 20,
		paddingLeft: 20,
		textAlign: 'center'
	},
	contentBlock: {
		backgroundColor: '#fff',
		padding: 20,
		flex: 2,
		width: '100%',
		alignItems: 'center'
	},
	button: {
		height: '15%',
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		margin: '3%',
		borderColor: 'black',
		borderWidth: 3,
		width: '100%'
	},
	homebuttonText: {
		fontSize: 30,
		fontWeight: 'bold'
	},
	searchButton: {
		width: 40,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center'
	},
	searchButtonBorder: {
		width: 65,
		height: 65,
		borderRadius: 65,
		borderWidth: 3,
		borderColor: 'black',
		justifyContent: 'center',
		alignItems: 'center',
	},
	listItemText: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold'
	},
	list: {
		width: '100%'
	},
	populationCard: {
		borderWidth: 3,
		borderColor: 'black',
		width: '100%',
		height: '30%',
	},
	populationCardHeader: {
		textAlign: 'center',
		marginTop: '3%',
		fontSize: 17,
		fontWeight: 'bold'
	},
	populationCardNumber: {
		textAlign: 'center',
		marginTop: '5%',
		fontSize: 35
	},
	scrollList: {
		overflow: 'scroll',
		paddingBottom: 100,
		width: '100%'
	},
	loadingContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 100
	},
	errorContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 100
	},
	errorText: {
		fontSize: 20
	}
});