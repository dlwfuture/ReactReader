import { 
    getAllPosts, 
    getPostsByCategories, 
    votePost, 
    getPostById, 
    addPost, 
    removePost, 
    updatePost 
} from '../utils/api'

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY'
export const VOTE_POST = 'VOTE_POST'
export const SHOW_COMMENTS_ON_POST = 'SHOW_COMMENTS_ON_POST'
export const GET_POST_BY_ID = 'GET_POST_BY_ID'
export const CHANGE_POST = 'CHANGE_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'

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
                return !isPostDetails ? dispatch(GetAllPosts()) : dispatch(GetPostById(postId))
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

export function ChangePost(post) {
    return {type: CHANGE_POST, 'post': post}
}

export function AddPost(post){
    return (dispatch) => {
        addPost(post)
        .then((post) => dispatch(
            GetPostById(post.id)
        ))
        .catch(error => {
            throw(error)
        })
    }
}

export function EditPost(post){
    return (dispatch) => {
        updatePost(post)
        .then((post) => dispatch(
            GetPostById(post.id)
        ))
        .catch(error => {
            throw(error)
        })
    }
}

export function RemovePost(postId) {
    return (dispatch) => {
        removePost(postId)
        .then(() => {
                return dispatch(GetAllPosts())
            }
        ).catch(error => {
            throw(error)
        })
    }
}