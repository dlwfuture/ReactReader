import { getCommentsByPostId, addComment, voteComment, getCommentsById, removeComment } from '../utils/api'

export const GET_COMMENTS_BY_POST_ID = 'GET_COMMENTS_BY_POST_ID'
export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const GET_COMMENT = 'GET_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const CHANGE_COMMENT_ID_TO_OPEN = 'CHANGE_COMMENT_ID_TO_OPEN'

export function GetCommentsByPostId(postId) {  
    return (dispatch) => {
        getCommentsByPostId(postId)
        .then(comments => dispatch(
            {
                type: GET_COMMENTS_BY_POST_ID, 
                postId, 
                comments
            })
        ).catch(error => {
            throw(error);
        })
    }
}

export function AddComment(comment) {
    return (dispatch) => {
        addComment(comment)
        .then((comment) => dispatch(
            GetCommentsByPostId(comment.parentId)
        ))
        .catch(error => {
            throw(error)
        })
    }
}

export function VoteComment(commentId, option, postId) {
    return (dispatch) => {
        voteComment(commentId, option)
        .then(() => dispatch(GetCommentsByPostId(postId))
        ).catch(error => {
            throw(error)
        })
    }
}

export function GetCommentById(commentId) {
    return (dispatch) => {
        getCommentsById(commentId)
        .then((comment) => dispatch({
            type: GET_COMMENT,
            comment
        })).catch(error => {
            throw(error)
        })
    }
}

export function RemoveComment(commentId, postId) {
    return (dispatch) => {
        removeComment(commentId)
        .then(() => {return dispatch(GetCommentsByPostId(postId))})
    }
}

export function ChangeCommentIdToOpen(commentIdToOpen) {
    return (dispatch) => {
        dispatch({type: CHANGE_COMMENT_ID_TO_OPEN,
            commentIdToOpen
        })
    }
}