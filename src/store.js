import { action, computed, createStore, thunk } from "easy-peasy";
import api from './api/posts'

export default createStore({
    posts: [],
    setPosts: action((state, payload) => {
        state.posts = payload
    }),
    postTitle: '',
    setPostTitle: action((state, payload) => {
        state.setPostTitle = payload
    }),
    postBody: '',
    setPostBody: action((state, payload) => {
        state.setPostBody = payload
    }),
    editTitle: '',
    setEditTitle: action((state, payload) => {
        state.setEditTitle = payload
    }),
    editBody: '',
    setEditBody: action((state, payload) => {
        state.setEditBody = payload
    }),
    search: '',
    setSearch: action((state, payload) => {
        state.setSearch = payload
    }),
    searchResults: [],
    setSearchResults: action((state, payload) => {
        state.setSearchResults = payload
    }),
    postCount: computed(state => state.posts.length),
    getPostById: computed(state => {
        return id => state.posts.find(post => post.id.toString() === id)
    }),
    savePost: thunk(async (actions, newPost, helpers) => {
        const { posts } = helpers.getState()
        try {
            const response = await api.post('/posts', newPost)
            const allPosts = [...posts, response.data]
            actions.setPosts(allPosts)
            actions.setPostTitle('')
            actions.setPostBody('')
        } catch (error) {
            console.log(error.message);
        }
    }),
    deletePost: thunk(async (actions, id, helpers) => {
        const { posts } = helpers.getState()
        try {
            await api.delete(`/posts/${id}`)
            const postsList = posts.filter(post => post.id !== id)
            actions.setPosts(postsList)
        } catch (error) {
            console.log(error.message);
        }
    }),
    editPost: thunk(async (actions, updatedPost, helpers) => {
        const { posts } = helpers.getState()
        const { id } = updatedPost
        try {
            const response = await api.put(`/posts/${id}`, updatedPost)
            actions.setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
            actions.setEditTitle('')
            actions.setEditBody('')
        } catch (error) {
            console.log(error.message);
        }
    })
})