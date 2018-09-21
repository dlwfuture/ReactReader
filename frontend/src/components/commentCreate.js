import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuidv1 from 'uuid/v1'
import serializeForm from 'form-serialize'
import { 
    AddComment,
} from '../actions/comments'

class CommentCreate extends Component {

    state = {
        comment: {}
    }

    componentWillReceiveProps(nextProps) {
        const { comment } = nextProps

        if (comment && comment.id !== this.state.comment.id) {
            this.setState({
                comment: {
                    author: comment.author,
                    parentId: comment.parentId,
                    body: comment.body,
                    id: comment.id,
                    deleted: comment.deleted,
                    voteScore: comment.voteScore
                }
            })
        }
    }

    saveComment = (event) => {
        event.preventDefault()
        let comment = serializeForm(event.target, { hash: true })
        comment.parentId = this.props.postId
        comment.id = this.state.comment.id || uuidv1()
        comment.timestamp =  this.state.comment.timestamp || Date.now()
        comment.deleted = false
        this.props.AddComment(comment)
        this.cancelCommentEdit()
    }

    handleInputChange = (event) => {
        let { comment } = this.state
        comment[event.target.id] = event.target.value
        this.setState({comment: comment})
    }

    cancelCommentEdit() {
        this.setState({comment:{}})
    }

    render() {
        const { comment } = this.state
        return (
            <div>
                <h3>
                    {`${comment.id ? 'EDIT' : 'CREATE'} COMMENT`}
                </h3>
                <form onSubmit={this.saveComment} className='comment-create'>
                    <input onChange={this.handleInputChange} value={comment.author || ''} required={true} id='author' name='author' className='comment-create-author' type='text' placeholder='Author'></input>
                    <textarea onChange={this.handleInputChange} value={comment.body || ''} required={true} id='body' name='body' className='comment-create-text' placeholder='Message'></textarea>
                    <input id='voteScore' name='voteScore' type='hidden' value={comment.voteScore || ''}></input>
                    <button type='submit' className='comment-create-save'>SAVE</button>
                    {
                        comment.id && (
                            <button onClick={() => this.cancelCommentEdit()} type='button' className='comment-create-cancel button-cancel'>CANCEL</button>
                        )
                    }
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        AddComment: (comment) => dispatch(AddComment(comment)),
    }
}

const mapStateToProps = () => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CommentCreate)