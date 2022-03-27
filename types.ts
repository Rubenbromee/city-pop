type CountrySearchResult = {
    geonames: Array<CountryObject>;
};

type CountryObject = {
    adminCode1: string,
    adminName1: string,
    countryCode: string,
    countryId: string,
    countryName: string,
    fcl: string,
    fclName: string,
    fcode: string,
    fcodeName: string,
    geonameId: number,
    lat: string,
    lng: string,
    name: string,
    population: number,
    toponymName: string,
}

type CountryItem = {
    name: string,
    id: string,
    key: number,
    countryCode: string
}

type CitySearchResult = {
    geonames: Array<CityObject>;
}

type CityObject = {
    adminCode1: string,
    adminCodes1: {
        ISO3166_2: string
    },
    adminName1: string,
    countryCode: string,
    countryId: string,
    countryName: string,
    fcl: string,
    fclName: string,
    fcode: string,
    fcodeName: string,
    geonameId: number,
    lat: string,
    lng: string,
    name: string,
    population: number,
    toponymName: string,
}

type CityItem = {
    name: string,
    population: number,
    key: number,
    id: string
}

type RootStackParamList = {
    Home: undefined,
    CountrySearch: undefined,
    CountryCities: { countryCode: string, countryName: string },
    CityInfo: { cityName: string, cityPopulation: number },
    CitySearch: undefined
}