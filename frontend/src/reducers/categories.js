import { GET_CATEGORIES } from '../actions/categories'
import { getAllCategories } from '../utils/api'

export function categories(state = {}, action) {
    switch(action.type) {
        case GET_CATEGORIES:
            return (dispatch) => {
                getAllCategories()
                    .then((categories) => {
                        dispatch({ type: GET_CATEGORIES, categories
                    })
                })
            }
        default: 
            return state;
    }
}