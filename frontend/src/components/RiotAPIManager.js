import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {setStats} from '../redux/actions/stats';
import {setPlayer} from '../redux/actions/player';
import {setLoading} from '../redux/actions/loading';
import API from '../constants/API';
import Remote from '../remote';

export default {

    testoo(){
        console.log("tetoometo");
    },

    async getPlayer(name, region, regionFull){
        try{
            let newPlayer;
            let newStats;
            const requestNameURL = API.protocol + region + API.apiURL + API.nameByName + name + API.key + API.keyValue;
            const responseName = await Remote.get(requestNameURL);
            if(responseName && responseName.hasOwnProperty('data')){
                newPlayer = {
                    region: regionFull,
                    name: responseName.data.name,
                    level: responseName.data.summonerLevel,
                    id: responseName.data.id,
                    puuid: responseName.data.puuid,
                }
                const requestStatsURL = API.protocol + region + API.apiURL + API.statsBySummonerId + responseName.data.id + API.key + API.keyValue;
                const responseStats = await Remote.get(requestStatsURL);
                if(responseStats && responseStats.hasOwnProperty('data')){
                    if (responseStats.data.length === 0) {
                        console.log("err");
                    } else {
                        newStats = responseStats.data.map(item=>{
                            return {
                                rank: item.tier,
                                division: item.rank,
                                wins: item.wins,
                                loses: item.losses,
                                played: item.wins + item.losses,
                                lp: item.leaguePoints,
                            }
                        });
                    }
                }
            }
            return {newPlayer, newStats};
        } catch (error) {
            console.log(error);
        } 
    }
}