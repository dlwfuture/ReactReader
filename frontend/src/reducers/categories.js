import { GET_CATEGORIES } from '../actions/categories'

const initialState = []

export function categories(state = initialState, action) {
    switch(action.type) {
        case GET_CATEGORIES:
            return action.categories
        default: 
            return state;
    }
}