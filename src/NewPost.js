import { format } from "date-fns"
import { useStoreActions, useStoreState } from "easy-peasy"
import { useNavigate } from "react-router-dom"

const NewPost = () => {
  const navigate = useNavigate()
  const posts = useStoreState(state => state.posts)
  const postTitle = useStoreState(state => state.postTitle)
  const setPostTitle = useStoreActions(actions => actions.setPostTitle)
  const postBody = useStoreState(state => state.postBody)
  const setPostBody = useStoreActions(actions => actions.setPostBody)
  const savePosts = useStoreActions(actions => actions.savePosts)

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = { id, title: postTitle, datetime, body: postBody }
    savePosts(newPost)
    navigate('/')
  }

  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">
          Title:
        </label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Body:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default NewPost