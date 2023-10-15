import axios from "axios";

import { appSetPosts } from "../store/actions/app/appActions";
import { store } from "../store/store";

const {dispatch} = store;

export async function getPosts() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
      dispatch(appSetPosts(response.data))
    } catch (error) {
      console.error(error);
    }
  }