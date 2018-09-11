import { GET_POSTS_BY_CATEGORY, GET_ALL_POSTS, VOTE_POST } from "../actions/posts"

export function posts(state = {}, action) {
    switch(action.type) {
        case GET_ALL_POSTS:
            return { posts: action.posts }
        case GET_POSTS_BY_CATEGORY:
            return { posts: action.posts }
        case VOTE_POST:
            return { vote: action.vote }
        default: 
            return state;
    }
}