import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import FontAwesome from 'react-fontawesome'
import { GetAllPosts, GetPostsByCategory } from '../actions/posts'
import { getInitials } from '../utils/helpers'

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
        return (
            <div class='post-container'>
               {
                    this.props.posts && this.props.posts.map(post => (
                        <div class='post-item' key={post.id}>
                            <div class='post-pic-holder'>
                                <span>
                                    {getInitials(post.author)}
                                </span>
                            </div>
                            <div class='post-header-holder'>
                                <h2 class='post-title'>
                                    {post.title}
                                </h2>
                                <div class='post-header-container'>
                                    <div class='post-header-content'>
                                        <span class='content-title'>
                                            Author:
                                        </span>
                                        <span>
                                            {post.author}
                                        </span>
                                    </div>
                                    <div class='post-header-content'>
                                        <span class='content-title'>
                                            Category:
                                        </span>
                                        <span>
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div class='post-content'>
                                    {post.body}
                                </div>
                                <div class='post-bottom-holder'>
                                    <div class='post-bottom-item'>
                                        <FontAwesome className='search-loader' size='1x' name='clock-o' />
                                        <span class='item-value'>
                                            <Moment format="DD/MM/YYYY HH:mm">
                                                {new Date(post.timestamp)}
                                            </Moment>
                                        </span>
                                    </div>
                                    <div class='post-bottom-item'>
                                        <FontAwesome className='search-loader' size='1x' name='thumbs-up' />
                                        <span class='item-value'>
                                            {post.voteScore}
                                        </span>
                                    </div>
                                    <div class='post-bottom-item'>
                                        <FontAwesome className='search-loader' size='1x' name='comment' />
                                        <span class='item-value'>
                                            {post.commentCount}
                                        </span>
                                    </div>
                                </div>
                            </div>
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