import * as types from '../types';

export function setLoading(isLoading){
    return {
        type: types.LOADING_STATS,
        payload: isLoading
    }
}