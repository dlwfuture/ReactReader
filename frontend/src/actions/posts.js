import { getAllPosts, getPostsByCategories, votePost, getPostById } from '../utils/api'

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY'
export const VOTE_POST = 'VOTE_POST'
export const SHOW_COMMENTS_ON_POST = 'SHOW_COMMENTS_ON_POST'
export const GET_POST_BY_ID = 'GET_POST_BY_ID'

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

export function VotePost(postId, option, isPostDetails) {
    return (dispatch) => {
        votePost(postId, option)
        .then(() => {
                return !isPostDetails ? dispatch(GetAllPosts()) : dispatch(GetPostById(postId));
            }
        ).catch(error => {
            throw(error)
        })
    }
}

export function ShowCommentsOnPost(postId, showComments) {
    return (dispatch) => {
        dispatch({type: SHOW_COMMENTS_ON_POST,
            postId,
            showComments})
    }
}

export function GetPostById(postId) {
    return (dispatch) => {
        getPostById(postId)
        .then(post => dispatch({
            type: GET_POST_BY_ID,
            'post': post
        })).catch(error => {
            throw(error);
        })
    }
}