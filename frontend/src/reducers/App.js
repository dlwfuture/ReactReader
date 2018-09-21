import { combineReducers } from 'redux'
import { posts, showComments, post } from './posts'
import { comments, commentIdToOpen, comment } from './comments'
import { categories } from './categories'

export default combineReducers({
    posts,
    comments,
    comment,
    commentIdToOpen,
    categories,
    showComments,
    post,
})