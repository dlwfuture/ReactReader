import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import uuidv1 from 'uuid/v1'
import FontAwesome from 'react-fontawesome'
import serializeForm from 'form-serialize'
import { 
    GetCommentsByPostId, 
    VoteComment, 
    AddComment,
    RemoveComment,
    GetCommentById
} from '../actions/comments'
import CommentCreate from './commentCreate'

class Comments extends Component {

    componentDidMount() {
        this.props.GetCommentsByPostId(this.props.postId)
    }

    saveComment = (event) => {
        event.preventDefault()
        let comment = serializeForm(event.target, { hash: true })
        comment.parentId = this.props.postId
        comment.id = uuidv1()
        comment.timestamp =  Date.now()
        comment.deleted = false
        this.props.AddComment(comment)
    }

    deleteComment = (commentId, postId, event) => {
        event.stopPropagation()
        this.props.RemoveComment(commentId, postId)
    }

    editComment = (commentId, event) => {
        event.stopPropagation()
        this.props.GetCommentById(commentId)
    }

    render() {
        const comments = this.props.comments ? this.props.comments[this.props.postId] : []
        const comment = this.props.comment
        return (
            <div className='comments-container'>
                {
                    this.props.showComments && (
                        <div>
                            <CommentCreate postId={this.props.postId} comment={comment}></CommentCreate>
                            {
                                comments && comments.filter(comment => !comment.deleted).map(comment => (
                                    <div key={comment.id} className='comment-item'>
                                        <div className='comment-datetime'>
                                            <Moment format="DD/MM/YYYY HH:mm">
                                                {new Date(comment.timestamp)}
                                            </Moment>
                                        </div>
                                        <div className='comment-author'>
                                            {comment.author}
                                        </div>
                                        <div className='comment-content'>
                                            {comment.body}
                                        </div>
                                        <div className="comment-votes no-select">
                                            <div className='comment-bottom-item'>
                                                <FontAwesome onClick={() => {this.props.VoteComment(comment.id, 'downVote', comment.parentId)}} className='comment-bottom-icon pointer' size='lg' name='thumbs-down' />
                                                <span className='item-value'>
                                                    {comment.voteScore}
                                                </span>
                                                <span className='post-spacer'></span>
                                                <FontAwesome onClick={() => {this.props.VoteComment(comment.id, 'upVote', comment.parentId)}} className='comment-bottom-icon pointer' size='lg' name='thumbs-up' />
                                            </div>
                                        </div>
                                        <div className='comment-buttons-holder'>
                                            <div className='comment-buttons'>
                                                <a onClick={(event) => {this.editComment(comment.id, event)}} className='post-button pointer'>
                                                    <FontAwesome size='lg' name='edit' />
                                                    <span className='item-value'>
                                                        Edit
                                                    </span>
                                                </a>
                                                <a onClick={(event) => {this.deleteComment(comment.id, comment.parentId, event)}} className='post-button post-button-cancel pointer'>
                                                    <FontAwesome size='lg' name='trash-o' />
                                                    <span className='item-value'>
                                                        Delete
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetCommentsByPostId: (postId) => dispatch(GetCommentsByPostId(postId)),
        VoteComment: (commentId, option, postId) => dispatch(VoteComment(commentId, option, postId)),
        AddComment: (comment) => dispatch(AddComment(comment)),
        RemoveComment: (commentId, postId) => dispatch(RemoveComment(commentId, postId)),
        GetCommentById: (commentId) => dispatch(GetCommentById(commentId)),
    }
}

const mapStateToProps = ({comments, comment}) => ({
    comments: comments,
    comment: comment.comment
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comments)