import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
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

    goToPostDetails(categoryName, postId, event) {
        event.stopPropagation()
        this.props.history.push(`/${categoryName}/${postId}`)
    }

    deletePost(post, event){
        event.stopPropagation()
        
    }

    render() {
        const categoryName = this.props.categoryName
        return (
            <div className='post-container'>
               {
                    this.props.posts && this.props.posts.filter(post => !post.deleted).map(post => (
                        <div className='post-item-separator pointer' key={post.id} onClick={(event) => this.goToPostDetails(post.category, post.id, event)}>
                            <div className='post-item-container'>
                                <div className='post-item'>
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
                                        <div className='post-bottom-holder no-select'>
                                            <div className='post-bottom-item'>
                                                <FontAwesome className='post-bottom-icon' size='lg' name='clock-o' />
                                                <span className='item-value'>
                                                    <Moment format="DD/MM/YYYY HH:mm">
                                                        {new Date(post.timestamp)}
                                                    </Moment>
                                                </span>
                                            </div>
                                            <div className='post-bottom-item'>
                                                <FontAwesome onClick={(e) => 
                                                    {
                                                        e.stopPropagation(); 
                                                        this.props.VotePost(post.id, 'downVote')
                                                    }
                                                } className='post-bottom-icon pointer' size='lg' name='thumbs-down' />
                                                <span className='item-value'>
                                                    {post.voteScore}
                                                </span>
                                                <span className='post-spacer'></span>
                                                <FontAwesome onClick={(e) => 
                                                    { 
                                                        e.stopPropagation(); 
                                                        this.props.VotePost(post.id, 'upVote')
                                                    }
                                                } className='post-bottom-icon pointer' size='lg' name='thumbs-up' />
                                            </div>
                                            <div className='post-bottom-item'>
                                                <FontAwesome className='post-bottom-icon' size='lg' name='comment' />
                                                <span className='item-value'>
                                                    {post.commentCount}
                                                </span>
                                            </div>
                                        </div>
                                        <div className='post-buttons-holder'>
                                            <div className='post-buttons'>
                                                <a onClick={(event) => {event.stopPropagation()}} href={`/${post.category}/${post.id}/edit`} className='post-button'>
                                                    <FontAwesome size='lg' name='edit' />
                                                    <span className='item-value'>
                                                        Edit
                                                    </span>
                                                </a>
                                                <a onClick={(event) => {this.deletePost(post, event)}} className='post-button post-button-cancel'>
                                                    <FontAwesome size='lg' name='trash-o' />
                                                    <span className='item-value'>
                                                        Delete
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
               }
                <div className='post-create-button'>
                    <a href={`${categoryName || 'category'}/post/create`}>
                        <FontAwesome className='search-loader' size='5x' name='plus-circle' />
                    </a>
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
    posts: posts.posts,
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Posts))