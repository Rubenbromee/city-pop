// Fetch used both in SearchByCountry and SearchByCity
export default async function fetchData(userQuery:string, fetchType:string):Promise<CitySearchResult>{
    let apiCountryQuery:string = "http://api.geonames.org/searchJSON?q=" + userQuery + "&maxRows=3&featureClass=" + fetchType +"&username=weknowit";
    return (fetch(apiCountryQuery).then(response => {
        if (!response.ok) {
            throw new Error("No data for query");
        }
        return response.json()
    }))
}