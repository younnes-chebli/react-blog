import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import { Route, Routes } from 'react-router-dom'
import EditPost from './EditPost'
import Layout from './Layout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="post">
          <Route index element={<NewPost />} />
          <Route path=":id" element={<PostPage />} />
        </Route>
        <Route path="edit/:id" element={<EditPost />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>

    // <Routes>
    //   <Route path='/' element={<Home />} />
    //   <Route path='/post' element={<NewPost />} />
    //   <Route path='/edit/:id' element={<EditPost />} />
    //   <Route path='/post/:id' element={<PostPage />} />
    //   <Route path='/about' element={<About />} />
    //   <Route path='*' element={<Missing />} />
    // </Routes>
  );
}

export default App;
