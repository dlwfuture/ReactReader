import React, { Component } from 'react'
import { connect } from 'react-redux'
import Posts from '../components/posts'
import { getCategories } from '../actions/categories'
import { capitalize } from '../utils/helpers'

class Categories extends Component {
    componentDidMount() {
        this.props.GetAllCategories()
    }

    render() {
        const { categoryName } = this.props.match.params
        return (
            <div>
                <div className='categories-menu'>
                    <a href="/" className={!categoryName ? 'selected-item' : ''}>All Posts</a>
                    {
                        this.props.categories && this.props.categories.map(category => (
                            <a key={category.name} href={`/${category.path}`} className={categoryName == category.name ? 'selected-item' : ''}>{capitalize(category.name)}</a>
                        ))
                    }
                </div>
                <div className='content-holder'>
                <Posts categoryName={categoryName}></Posts>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetAllCategories: () => dispatch(getCategories()),
    }
}

const mapStateToProps = ({categories}) => ({
    categories: categories.categories
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Categories)