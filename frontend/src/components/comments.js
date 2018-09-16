import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import FontAwesome from 'react-fontawesome'
import serializeForm from 'form-serialize'
import { GetCommentsByPostId, VoteComment, AddComment } from '../actions/comments'

class Comments extends Component {

    componentDidMount() {
        this.props.GetCommentsByPostId(this.props.postId)
    }

    saveComment = (event) => {
        event.preventDefault()
        let comment = serializeForm(event.target, { hash: true })
        comment.parentId = this.props.postId
        comment.id = comment.timestamp =  Date.now()
        this.props.AddComment(comment)
    }

    render() {
        const comments = this.props.comments ? this.props.comments[this.props.postId] : []
        return (
            <div className='comments-container'>
                {
                    this.props.showComments && (
                        <div>
                            <h3>
                                COMMENTS
                            </h3>
                            <form onSubmit={this.saveComment} className='comment-create'>
                                <input required={true} id='author' name='author' className='comment-create-author' type='text' placeholder='Author'></input>
                                <textarea required={true} id='body' name='body' className='comment-create-text' placeholder='Message'></textarea>
                                <button type='submit' className='comment-create-save'>SAVE</button>
                            </form>
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
        AddComment: (comment) => dispatch(AddComment(comment))
    }
}

const mapStateToProps = ({comments}) => ({
    comments: comments
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comments)