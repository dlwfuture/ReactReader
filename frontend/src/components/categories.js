import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost, removePost, updatePost, votePost } from '../actions/posts'
import { posts } from '../reducers/posts'
import { getCategories } from '../actions/categories'
import { capitalize } from '../utils/helpers'

class Categories extends Component {
    componentDidMount() {
        this.props.GetAllCategories()
    }

    render() {
        const { categoryName, postId } = this.props.match.params
        return (
            <div className='categories-menu'>
                <a href="/" className={!categoryName ? 'selected-item' : ''}>All Posts</a>
                {
                    this.props.categories && this.props.categories.map(category => (
                        <a key={category.name} href={`/${category.path}`} className={categoryName == category.name ? 'selected-item' : ''}>{capitalize(category.name)}</a>
                    ))
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        AddPost: (data) => dispatch(addPost(data)),
        RemovePost: (data) => dispatch(removePost(data)),
        UpdatePost: (data) => dispatch(updatePost(data)),
        VotePost: (data) => dispatch(votePost(data)),
        GetAllCategories: () => dispatch(getCategories())
    }
}

const mapStateToProps = ({categories}) => ({
    categories: categories.categories
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Categories)