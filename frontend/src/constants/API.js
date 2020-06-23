export default {
    //Base API constants
    protocol: "https://",
    apiLink: ".api.riotgames.com/tft/",
    key: "?api_key=",
    keyValue: "RGAPI-a3916e39-3c42-42fe-bd97-079cba9d3cf7",

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