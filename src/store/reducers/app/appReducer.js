import { APP_SET_MODAL_ADD_POST, APP_SET_MODAL_DELETE_POST, APP_SET_POSTS } from './../../actions/app/appTypes';

const initialState = {
    posts: [],
    modalAddPost: false,
    modalDeletePost: false
};

export const appReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case APP_SET_POSTS:
            return { ...state, posts: payload.posts };
        case APP_SET_MODAL_ADD_POST:
            return { ...state, modalAddPost: payload.modalAddPost };
        case APP_SET_MODAL_DELETE_POST:
            return { ...state, modalDeletePost: payload.modalDeletePost };
        default:
            return state;
    }
};