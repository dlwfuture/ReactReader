import { GET_COMMENTS_BY_POST_ID, CHANGE_COMMENT_ID_TO_OPEN, GET_COMMENT } from '../actions/comments'

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

export function commentIdToOpen(state = {}, action){
    switch(action.type) {
        case CHANGE_COMMENT_ID_TO_OPEN:
            return { commentIdToOpen: action.commentIdToOpen }
        default:
            return state
    }
}

export function comment(state = {}, action) {
    switch (action.type) {
        case GET_COMMENT:
            return { comment: action.comment }
        default:
            return state
    }
}