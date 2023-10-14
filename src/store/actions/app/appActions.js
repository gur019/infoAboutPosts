import { APP_SET_MODAL_ADD_POST, APP_SET_MODAL_DELETE_POST, APP_SET_POSTS } from './appTypes';

export const appSetPosts = (posts) =>{
    return{
        type: APP_SET_POSTS,
        payload:{
            posts
        }
    }
}

export const appSetModalAddPost = (modalAddPost) =>{
    return{
        type: APP_SET_MODAL_ADD_POST,
        payload:{
            modalAddPost
        }
    }
}

export const appSetModalDeletePost = (modalDeletePost) =>{
    return{
        type: APP_SET_MODAL_DELETE_POST,
        payload:{
            modalDeletePost
        }
    }
}