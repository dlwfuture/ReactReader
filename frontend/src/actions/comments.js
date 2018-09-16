import { getCommentsByPostId, addComment, voteComment } from '../utils/api'

export const GET_COMMENTS_BY_POST_ID = 'GET_COMMENTS_BY_POST_ID'
export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

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