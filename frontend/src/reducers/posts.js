import { ADD_POST, UPDATE_POST, REMOVE_POST, VOTE_POST } from "../actions/posts"

export function posts(state = {}, action) {
    if (!action || !action.type)
        return state

    const { post } = action
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                [post.id]: post
            }
        case REMOVE_POST:
            return state.filter(p => p.id !== post.id)
        case UPDATE_POST:
            return Object.assign(
                [...state], 
                {[post.id]: post})
        case VOTE_POST:
            return state
        default:
            return state
    }
}
