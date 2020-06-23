export default {
    //Base API constants
    protocol: "https://",
    apiLink: ".api.riotgames.com/tft/",
    key: "?api_key=",
    keyValue: "RGAPI-5050a27d-4506-402d-a96b-37eb911f0b37",

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