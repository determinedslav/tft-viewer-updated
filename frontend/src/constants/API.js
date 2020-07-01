export default {
    //Base API constants
    protocol: "https://",
    apiURL: ".api.riotgames.com/tft/",
    key: "?api_key=",
    keyValue: "RGAPI-75b7c4f9-28fa-40b3-ad37-6af2a9147b75",

    //API server region constant
    europe: "europe",

    //GET for each API endpoint
    nameByName: "summoner/v1/summoners/by-name/",
    statsBySummonerId: "league/v1/entries/by-summoner/",
    matchesByPuuid: "match/v1/matches/by-puuid/",
    matchByMatchId: "match/v1/matches/",

    //Extra params needed for matches API
    matchesParams: "/ids?count=10&api_key=",

}