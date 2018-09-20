const API_URL = process.env.REACT_APP_API_URL

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token
}  

/*
    GET
*/
export const getAllPosts = ()=> {
    return fetch(`${API_URL}/posts`, { method: 'GET', headers })
    .then(res => res.json())
}

export const getAllCategories = () => {
    return fetch(`${API_URL}/categories`, { method: 'GET', headers })
    .then(res => res.json())
}

export const getPostsByCategories = (category) => {
    return fetch(`${API_URL}/${category}/posts`, { method: 'GET', headers })
    .then(res => res.json())
}

export const getPostById = (postId) => {
    return fetch(`${API_URL}/posts/${postId}`, { method: 'GET', headers })
    .then(res => res.json())
}

export const getCommentsByPostId = (postId) => {
    return fetch(`${API_URL}/posts/${postId}/comments`, {method: 'GET', headers })
    .then(res => res.json())
}

export const getCommentsById =  (commentId) => {
    return fetch(`${API_URL}/comments/${commentId}`, { method: 'GET', headers })
    .then(res => res.json())
}

/*
    ADD
*/
export const addPost = (post) => {
    const body = JSON.stringify(post)

    return fetch(`${API_URL}/posts/`, { method: 'POST', headers, body })
      .then(response => response.json())
}
  
export const votePost = (postId, option) => {
    const body = JSON.stringify({ option })

    return fetch(`${API_URL}/posts/${postId}`, { method: 'POST', headers, body })
        .then(response => response.json())
}
  
export const voteComment = (commentId, option) => {
    const body = JSON.stringify({ option });

    return fetch(`${API_URL}/comments/${commentId}`, { method: 'POST', headers, body })
        .then(response => response.json());
}

export const addComment = (comment) => {
    const body = JSON.stringify(comment);

    return fetch(`${API_URL}/comments/`, { method: 'POST', headers, body })
        .then(response => response.json());
}

/*
    UPDATE
*/
export const updatePost = (post) => {
    const body = JSON.stringify(post)

    return fetch(`${API_URL}/posts/${post.id}`, { method: 'PUT', headers, body })
        .then(response => response.json())
}

export const updateComment = (comment) => {
    const body = JSON.stringify(comment);
  
    return fetch(`${API_URL}/comments/${comment.id}`, { method: 'PUT', headers, body })
      .then(response => response.json());
}

/*
    Delete
*/
export const removePost = (postId) => {
    return fetch(`${API_URL}/posts/${postId}`, { method: 'DELETE', headers });
}

export const removeComment = (commentId) => {
    return fetch(`${API_URL}/comments/${commentId}`, { method: 'DELETE', headers })
      .then(response => response.json());
}
