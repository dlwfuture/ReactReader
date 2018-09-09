import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetAllPosts, GetPostsByCategory } from '../actions/posts'

class Posts extends Component {
    componentDidMount() {
        if (this.props.categoryName){
            this.props.GetPostsByCategory(this.props.categoryName)
        }
        else{
            this.props.GetAllPosts()
        }
    }

    render() {
        console.log(this.props)
        return (
            <div>
               {
                    this.props.posts && this.props.posts.map(post => (
                        <div key={post.id}>
                            {post.id}
                        </div>
                    ))
               }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetAllPosts: () => dispatch(GetAllPosts()),
        GetPostsByCategory: (category) => dispatch(GetPostsByCategory(category))
    }
}

const mapStateToProps = ({posts}) => ({
    posts: posts.posts
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Posts)