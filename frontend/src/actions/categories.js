import { getAllCategories } from '../utils/api'

export const GET_CATEGORIES = 'GET_CATEGORIES'

export function getCategories() {  
    return (dispatch) => {
        getAllCategories()
        .then(categories => dispatch({type: GET_CATEGORIES, categories})
        ).catch(error => {
            throw(error);
        })
    }
}