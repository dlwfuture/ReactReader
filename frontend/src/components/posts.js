import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import FontAwesome from 'react-fontawesome'
import { GetAllPosts, GetPostsByCategory, VotePost } from '../actions/posts'
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
            <div className='post-container'>
               {
                    this.props.posts && this.props.posts.map(post => (
                        <div className='post-item' key={post.id}>
                            <div className='post-pic-holder'>
                                <span>
                                    {getInitials(post.author)}
                                </span>
                            </div>
                            <div className='post-header-holder'>
                                <h2 className='post-title'>
                                    {post.title}
                                </h2>
                                <div className='post-header-container'>
                                    <div className='post-header-content'>
                                        <span className='content-title'>
                                            Author:
                                        </span>
                                        <span>
                                            {post.author}
                                        </span>
                                    </div>
                                    <div className='post-header-content'>
                                        <span className='content-title'>
                                            Category:
                                        </span>
                                        <span>
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className='post-content'>
                                    {post.body}
                                </div>
                                <div className='post-bottom-holder'>
                                    <div className='post-bottom-item'>
                                        <FontAwesome className='post-bottom-icon' size='lg' name='clock-o' />
                                        <span className='item-value'>
                                            <Moment format="DD/MM/YYYY HH:mm">
                                                {new Date(post.timestamp)}
                                            </Moment>
                                        </span>
                                    </div>
                                    <div className='post-bottom-item'>
                                        <FontAwesome onClick={() => {this.props.VotePost(post.id, 'downVote')}} className='post-bottom-icon pointer' size='lg' name='thumbs-down' />
                                        <span className='item-value'>
                                            {post.voteScore}
                                        </span>
                                        <span className='post-spacer'></span>
                                        <FontAwesome onClick={() => {this.props.VotePost(post.id, 'upVote')}} className='post-bottom-icon pointer' size='lg' name='thumbs-up' />
                                    </div>
                                    <div className='post-bottom-item'>
                                        <FontAwesome className='post-bottom-icon pointer' size='lg' name='comment' />
                                        <span className='item-value'>
                                            {post.commentCount}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
               }
                <div className='post-create-button'>
                    <FontAwesome className='search-loader' size='5x' name='plus-circle' />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetAllPosts: () => dispatch(GetAllPosts()),
        GetPostsByCategory: (category) => dispatch(GetPostsByCategory(category)),
        VotePost: (postId, option) => dispatch(VotePost(postId, option)),
    }
}

const mapStateToProps = ({posts}) => ({
    posts: posts.posts
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Posts)