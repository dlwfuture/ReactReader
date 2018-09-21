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
                    voteScore: comment.voteScore,
                    timestamp: comment.timestamp
                }
            })
        }
    }

    saveComment = (event) => {
        console.log(this.state.comment.voteScore)
        event.preventDefault()
        let comment = serializeForm(event.target, { hash: true })
        comment.parentId = this.props.postId
        comment.id = this.state.comment.id || uuidv1()
        comment.timestamp =  this.state.comment.timestamp || Date.now()
        comment.voteScore = this.state.comment.voteScore
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
        this.props.onCancel()
    }

    render() {
        const { comment } = this.state
        return (
            <div className='form-container animated fadeInLeft'>
                <h3>
                    {`${comment.id ? 'EDIT' : 'CREATE'} COMMENT`}
                </h3>
                <form onSubmit={this.saveComment} className='comment-create'>
                    <input onChange={this.handleInputChange} value={comment.author || ''} required={true} id='author' name='author' className='comment-create-author' type='text' placeholder='Author'></input>
                    <textarea onChange={this.handleInputChange} value={comment.body || ''} required={true} id='body' name='body' className='comment-create-text' placeholder='Message'></textarea>
                    <div className='save-buttons-holder'>
                        <button type='submit' className='comment-create-save'>SAVE</button>
                        {
                            comment.id && (
                                <button onClick={() => this.cancelCommentEdit()} type='button' className='comment-create-cancel button-cancel'>CANCEL</button>
                            )
                        }
                    </div>
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