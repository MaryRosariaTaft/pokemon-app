// Functions which will interact with the pokeAPI.
// These functions will return promises in order for us to use async/await syntax
import axios from 'axios';

/**
 * Retrives pokemon up to the sepecfied limit
 * @param {Number} limit 
 */
export const getPokemonNames = (limit) => {
    if (isValidLimit(limit)) {
        return axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=0`);
    }
    alert('Invalid limit! Limit must be < 950'); 
}







// UTILITY FUNCTIONS //
const isValidLimit = (limit) => {
    return limit < 950;
}

export default { getPokemonNames }