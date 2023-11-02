import { useContext } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import DataContext from "./context/DataContext"
import api from './api/posts'

const PostPage = () => {
  const navigate = useNavigate()
  const { posts, setPosts } = useContext(DataContext)
  const { id } = useParams()
  const post = posts.find(post => post.id.toString() === id)

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const postsList = posts.filter(post => post.id !== id)
      setPosts(postsList)
      navigate('/')
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <main className="PostPage">
      <article className="post">
        {post &&
          <>
            <h2>
              {post.title}
            </h2>
            <p className="postDate">
              {post.datetime}
            </p>
            <p className="postBody">
              {post.body}
            </p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">
                Edit Post
              </button>
            </Link>
            <button className="deleteButton" onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
          </>}
        {!post &&
          <>
            <h2>Post Not Found</h2>
            <p>
              <Link to='/'>Back To Homepage</Link>
            </p>
          </>}
      </article>
    </main>
  )
}

export default PostPage