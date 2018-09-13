import { getCommentsByPostId } from '../utils/api'

export const GET_COMMENTS_BY_POST_ID = 'GET_COMMENTS_BY_POST_ID'

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