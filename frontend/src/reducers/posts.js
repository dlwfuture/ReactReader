import { ADD_POST, UPDATE_POST, REMOVE_POST, VOTE_POST } from "../actions/posts"

export function posts(state = {}, action) {
    const { 
        id,
        timestamp,
        title,
        body,
        author,
        category,
    } = action
    switch (action.type) {
        case ADD_POST:
            return [
                ...state,
                {
                    id:id,
                    timestamp:timestamp,
                    title:title,
                    body:body,
                    author:author,
                    category: category,
                }
            ]
        case REMOVE_POST:
            return state.filter(p => p.id !== id)
        case UPDATE_POST:
            return state
        case VOTE_POST:
            return state
        default:
            return state
    }
}
