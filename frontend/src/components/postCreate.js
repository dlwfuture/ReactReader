import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { GetPostById ,VotePost, AddPost, EditPost } from '../actions/posts'
import { getCategories } from '../actions/categories'
import { capitalize } from '../utils/helpers'
import serializeForm from 'form-serialize'

class PostCreate extends Component {

    componentDidMount() {
        this.props.GetAllCategories()
        this.props.GetPostById(this.props.match.params.postId)
    }

    savePost = (event) => {
        event.preventDefault()
        const { postId } = this.props.match.params

        let post = serializeForm(event.target, { hash: true })
        post.timestamp =  Date.now()

        if (postId) {
            //Edit
            post.id = postId
            this.props.EditPost(post)
        }
        else{
            //Create
            post.id = post.timestamp
            this.props.AddPost(post)
        }
        this.props.history.push(`/`)
    }

    render() {
        const { postId } = this.props.match.params
        const { post } = this.props
    
        return (
            <div className='post-create-container'>
                <h3>
                    {`${postId ? 'Edit' : 'Create'} Post`}
                </h3>
                <form onSubmit={this.savePost} className='post-create'>
                    <input required={true} id='author' value={post && post.author} name='author' className='post-create-author' type='text' placeholder='Author'></input>
                    <input required={true} id='title' value={post && post.title} name='title' className='post-create-title' type='text' placeholder='Title'></input>
                    <select value={post ? post.category : ''} required={true} id='category' name='category' className='post-create-category'>
                        <option value="" disabled>Pick a Category</option>
                        {
                            this.props.categories && this.props.categories.map(category => (
                                <option value={category.name}>{capitalize(category.name)}</option>
                            ))
                        }
                    </select>
                    <textarea required={true} id='body' name='body' className='post-create-text' placeholder='Message' value={post && post.body}></textarea>
                    <button type='submit' className='post-create-save'>SAVE</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetPostById: (postId) => dispatch(GetPostById(postId)),
        GetAllCategories: () => dispatch(getCategories()),
        EditPost: (post) => dispatch(EditPost(post)),
        AddPost: (post) => dispatch(AddPost(post)),
    }
}

const mapStateToProps = ({post, categories}) => ({
    post: post.post,
    categories: categories.categories
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostCreate))