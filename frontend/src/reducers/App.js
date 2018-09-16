import { combineReducers } from 'redux'
import { posts, showComments, post } from './posts'
import { comments } from './comments'
import { categories } from './categories'

export default combineReducers({
    posts,
    comments,
    categories,
    showComments,
    post,
})