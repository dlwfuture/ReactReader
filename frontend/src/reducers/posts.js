import {    GET_POSTS_BY_CATEGORY, 
            GET_ALL_POSTS, 
            VOTE_POST,
            SHOW_COMMENTS_ON_POST,
            GET_POST_BY_ID,
            CHANGE_POST,
        } from "../actions/posts"

export function posts(state = {}, action) {
    switch(action.type) {
        case GET_ALL_POSTS:
            return { posts: action.posts }
        case GET_POSTS_BY_CATEGORY:
            return { posts: action.posts }
        case VOTE_POST:
            return { vote: action.vote }
        case SHOW_COMMENTS_ON_POST:
            console.log(state)
            return {
                ...state,
                [action.postId]: !(state && state[action.post])
            }
        default: 
            return state
    }
}

export function showComments(state = {}, action){
    switch(action.type) {
        case SHOW_COMMENTS_ON_POST:
            return {
                ...state,
                [action.postId]: !(state && state[action.postId])
            }
        default: 
            return state
    } 
}

export function post(state = {}, action){
    switch(action.type) {
        case GET_POST_BY_ID:
            return { post: action.post }
        case CHANGE_POST:
            return { post: action.post }
        default:
            return state
    }
}