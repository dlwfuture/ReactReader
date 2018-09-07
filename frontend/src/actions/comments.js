export const ADD_POST = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export function addComment ({id, timestamp, title, body, author, category}){
    return {
        type: ADD_POST,
        id,
        timestamp,
        title,
        body,
        author,
        category
    }
}

export function removeComment ({id}){
    return {
        type: REMOVE_POST,
        id,
    }
}

export function updateComment ({timestamp, body}){
    return {
        type: UPDATE_POST,
        timestamp,
        body,
    }
}

export function voteComment ({option}){
    return {
        type: UPDATE_POST,
        option,
    }
}