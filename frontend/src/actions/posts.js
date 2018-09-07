export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const UPDATE_POST = 'UPDATE_POST'

export function addPost ({id, timestamp, title, body, author, category}){
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

export function removePost ({id}){
    return {
        type: REMOVE_POST,
        id,
    }
}

export function updatePost ({title, body}){
    return {
        type: UPDATE_POST,
        title,
        body,
    }
}