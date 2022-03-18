import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


async function fetchData() {
  let response:any = await fetch("http://api.geonames.org/searchJSON?q=england&maxRows=10&featureClass=A&username=weknowit");
	let data = await response.json();

	return data;
}

export default function App() {
  const [data, setData] = useState<SearchResult>()

  // React on query change
  useEffect(() => {
    fetchData().then((d) => {
      setData(d);
    })

  }, []);

  if (data !== undefined) {
    data!.geonames.map( (obj) => {
      console.log(obj.name);
    });
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
