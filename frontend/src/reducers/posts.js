import { GET_POSTS_BY_CATEGORY, GET_ALL_POSTS } from "../actions/posts"

export function posts(state = {}, action) {
    switch(action.type) {
        case GET_ALL_POSTS:
            return { posts: action.posts }
        case GET_POSTS_BY_CATEGORY:
            return { posts: action.posts }
        default: 
            return state;
    }
}