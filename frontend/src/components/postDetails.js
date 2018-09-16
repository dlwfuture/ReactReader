import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import FontAwesome from 'react-fontawesome'
import { GetPostById ,VotePost } from '../actions/posts'
import { getInitials } from '../utils/helpers'
import Comments from './comments'

class PostDetails extends Component {

    componentDidMount() {
        this.props.GetPostById(this.props.match.params.postId)
    }

    render() {
        const { post } = this.props
        return (
            <div className='post-container'>
               {
                    post && (
                        <div className='post-item-separator' key={post.id}>
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
                            </div>
                            <Comments postId={post.id} showComments={ true }></Comments>
                        </div>
                    )
               }
                <div className='post-create-button'>
                    <a>
                        <FontAwesome className='search-loader' size='5x' name='plus-circle' />
                    </a>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetPostById: (postId) => dispatch(GetPostById(postId)),
        VotePost: (postId, option) => dispatch(VotePost(postId, option, true)),
    }
}

const mapStateToProps = ({post}) => ({
    post: post.post
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetails)