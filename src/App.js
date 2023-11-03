import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import { Route, Routes } from 'react-router-dom'
import EditPost from './EditPost'
import useAxiosFetch from './hooks/useAxiosFetch'
import { useEffect } from 'react'
import { useStoreActions } from 'easy-peasy'

function App() {
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts')
  const setPosts = useStoreActions(actions => actions.setPosts)

  useEffect(() => {
    setPosts(data)
  }, [setPosts, data])

  return (
    <div className='App'>
      <Header title='React JS Blog' />
      <Nav />
      <Routes>
        <Route exact path='/' element={<Home
          isLoading={isLoading}
          fetchError={fetchError} />}
        />
        <Route exact path='/post' element={<NewPost />} />
        <Route exact path='/edit/:id' element={<EditPost />} />
        <Route exact path='/post/:id' element={<PostPage />} />
        <Route exact path='/about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
