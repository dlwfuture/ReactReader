import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import uuidv1 from 'uuid/v1'
import FontAwesome from 'react-fontawesome'
import { GetPostById, AddPost, EditPost } from '../actions/posts'
import { getCategories } from '../actions/categories'
import { capitalize } from '../utils/helpers'
import serializeForm from 'form-serialize'

class PostCreate extends Component {

    state = {}

    componentDidMount(){
        const postId = this.props.match.params.postId
        this.props.GetAllCategories()
        postId && this.props.GetPostById(postId)
    }

    savePost = (event) => {
        event.preventDefault()
        const { postId } = this.props.match.params

        let post = serializeForm(event.target, { hash: true })
        post.timestamp =  Date.now()
        post.deleted = false

        if (postId) {
            //Edit
            post.id = postId
            this.props.EditPost(post)
        }
        else{
            //Create
            post.id = uuidv1()
            this.props.AddPost(post)
        }
        this.props.history.push(`/`)
    }

    componentWillReceiveProps(nextProps) {
        const { post } = nextProps
        if (post) {
            this.setState({
                title: post.title,
                author: post.author,
                category: post.category,
                body: post.body
                })
        }
    }

    handleInputChange = (event) => {
        const post = this.state
        post[event.target.id] = event.target.value
        this.setState(post)
    }

    goBack() {
        this.props.history.goBack()
    }

    render() {
        const { postId } = this.props.match.params
        const post = this.state

        return (
            <div className='post-create-container'>
                <div className='form-container animated bounceInUp'>
                    <h3>
                        {`${postId ? 'EDIT' : 'CREATE'} POST`}
                    </h3>
                    <form onSubmit={this.savePost} className='post-create'>
                        <input required={true} id='author' value={post.author || ''} onChange={this.handleInputChange} name='author' className='post-create-author' type='text' placeholder='Author'></input>
                        <input required={true} id='title' value={post.title || ''} onChange={this.handleInputChange} name='title' className='post-create-title' type='text' placeholder='Title'></input>
                        <select value={post.category || ''} required={true} onChange={this.handleInputChange} id='category' name='category' className='post-create-category'>
                            <option value="" disabled>Pick a Category</option>
                            {
                                this.props.categories && this.props.categories.map(category => (
                                    <option key={category.name} value={category.name}>{capitalize(category.name)}</option>
                                ))
                            }
                        </select>
                        <textarea required={true} onChange={this.handleInputChange} id='body' name='body' className='post-create-text' placeholder='Message' value={post.body || ''}></textarea>
                        <div className='save-buttons-holder animated'>
                            <button type='submit' className='post-create-save'>SAVE</button>
                            <button onClick={() => this.goBack()} type='button' className='comment-create-cancel button-cancel'>CANCEL</button>
                        </div>
                    </form>
                </div>
                <div className='post-back-button'>
                    <a onClick={() => this.goBack()} className='pointer'>
                        <FontAwesome className='search-loader' size='5x' name='arrow-circle-left' />
                    </a>
                </div>
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