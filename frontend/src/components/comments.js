import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { GetCommentsByPostId } from '../actions/comments'

class Comments extends Component {
    componentDidMount() {
        this.props.GetCommentsByPostId(this.props.postId)
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
                            <div className='comment-create'>
                                <input className='comment-create-author' type='text' placeholder='Author'></input>
                                <textarea className='comment-create-text' placeholder='Message'></textarea>
                                <button className='comment-create-post'>POST</button>
                            </div>
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
    }
}

const mapStateToProps = ({comments}) => ({
    comments: comments
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comments)