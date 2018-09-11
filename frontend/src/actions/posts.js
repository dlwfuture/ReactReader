import { getAllPosts, getPostsByCategories, votePost } from '../utils/api'

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY'
export const VOTE_POST = 'VOTE_POST'

export function GetAllPosts() {  
    return (dispatch) => {
        getAllPosts()
        .then(posts => dispatch({type: GET_ALL_POSTS, posts: posts})
        ).catch(error => {
            throw(error);
        })
    }
}

export function GetPostsByCategory(category) {  
    return (dispatch) => {
        getPostsByCategories(category)
        .then(posts => dispatch({type: GET_POSTS_BY_CATEGORY, posts: posts})
        ).catch(error => {
            throw(error);
        })
    }
}

export function VotePost(postId, option) {
    return (dispatch) => {
        votePost(postId, option)
        .then(vote => dispatch(GetAllPosts())
        ).catch(error => {
            throw(error)
        })
    }
}