import { ADD_COMMENT, REMOVE_COMMENT, UPDATE_COMMENT, VOTE_COMMENT } from '../actions/comments'

export function comments(state = {}, action){
    const { 
        id,
        timestamp,
        title,
        body,
        author,
        category,
    } = action

    switch (action.type) {
        case ADD_COMMENT:
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
        case REMOVE_COMMENT:
            return state.filter(p => p.id !== id)
        case UPDATE_COMMENT:
            return state
        case VOTE_COMMENT:
            return state
        default:
            return state
    }
}