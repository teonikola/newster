import { API_BASE_URL, ACCESS_TOKEN } from '..//constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}
export function getUserById(id){
    return request({
        url:API_BASE_URL + `/user/${id}`,
        method:'GET'
    })
}
export function createNewsPost(newsPost){
    return request({
        url: API_BASE_URL + "/createNewsPost",
        method: 'POST',
        body: JSON.stringify(newsPost)
    })
}

export function getNewsPosts(){
    return request({
        url: API_BASE_URL + "/fetchPosts"
    })
}

export function getPostById(id){
    return request({
        url:API_BASE_URL + `/fetchPost/${id}`
    })
}

export function getSciencePosts(){
    return request({
        url: API_BASE_URL + "/fetchPosts/science"
    })
}
export function getSportsPosts(){
    return request({
        url: API_BASE_URL + "/fetchPosts/sports"
    })
}
export function getEntertainmentPosts(){
    return request({
        url: API_BASE_URL + "/fetchPosts/entertainment"
    })
}
export function getOtherPosts(){
    return request({
        url: API_BASE_URL + "/fetchPosts/other"
    })
}
export function getComments(){
    return request({
        url: API_BASE_URL + "/fetchComments"
    })
}

export function addComment(commentPayload){
    return request({
        url: API_BASE_URL + "/comment",
        method:'POST',
        body: JSON.stringify(commentPayload)
    })
}

export function likePost(postId,user){
    return request({
        url:API_BASE_URL + `/likedBy/${postId}`,
        method:'PUT',
        body:JSON.stringify(user)
    })
}
export function unlikePost(postId,user){
    return request({
        url:API_BASE_URL + `/unlikedBy/${postId}`,
        method:'PUT',
        body:JSON.stringify(user)
    })
}