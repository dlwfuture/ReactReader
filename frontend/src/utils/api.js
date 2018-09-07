const API_AUTH = process.env.REACT_APP_API_AUTHORIZATION
const API_URL = process.env.REACT_APP_API_URL

const headers = {
    'Accept': 'application/json',
    'Authorization': API_AUTH
}  

export function getAllPosts () {
    return fetch(`${API_URL}/posts`, { headers })
    .then(res => res.json())
}