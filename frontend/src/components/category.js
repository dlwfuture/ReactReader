import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost, removePost, updatePost, votePost } from '../actions/posts'
import { posts } from '../reducers/posts'
import { getCategories } from '../actions/categories'

class Category extends Component {
    state = {
        CategoryName: null,
        PostId: null
    }

    componentDidMount() {
        const { categoryName, postId } = this.props.match.params
        this.setState(() => ({CategoryName: categoryName, PostId: postId}))
        this.props.GetAllCategories()
    }

    render() {
        const { CategoryName, PostId } = this.state
        return (
        <div className='category'>
            <h1>
                {CategoryName || 'All Posts'}
            </h1>
            <div className='Categories'>
                <ul>
                    {
                        this.props.categories.map(category => (
                            <li key={category.name}>{category.name}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        AddPost: (data) => dispatch(addPost(data)),
        RemovePost: (data) => dispatch(removePost(data)),
        UpdatePost: (data) => dispatch(updatePost(data)),
        VotePost: (data) => dispatch(votePost(data)),
        GetAllCategories: (data) => dispatch(getCategories(data))
    }
}

const mapStateToProps = (state) => ({
    posts: posts(state.posts),
    sortedBy: state.posts.sortBy,
    categories: state.categories,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category)