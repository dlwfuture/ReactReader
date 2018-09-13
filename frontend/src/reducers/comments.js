import { GET_COMMENTS_BY_POST_ID } from '../actions/comments'

export function comments(state = {}, action) {
    switch(action.type) {
        case GET_COMMENTS_BY_POST_ID:
            return {
                ...state,
                [action.postId]: action.comments
            }
        default: 
            return state;
    }
}