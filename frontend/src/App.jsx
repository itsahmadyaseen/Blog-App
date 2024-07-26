import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Home";
import BlogDetails from "./Components/BlogDetails";
import AddBlog from "./Components/AddBlog";
import MyBlogs from "./Components/MyBlogs";
import Unauthorized from "./Components/utils/unauthorized";
import UpdateBlogs from "./Components/UpdateBlogs";


function App() {

  return (
    <>
     <Router >
      <Routes>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Home />}/>
        <Route path='/blog/:id' element={<BlogDetails />}/>
        <Route path='/add-blog' element={<AddBlog />}/>
        <Route path='/my-blogs' element={<MyBlogs />}/>
        <Route path='/update-blog/:id' element={<UpdateBlogs />}/>
        <Route path='/unauthorized' element={<Unauthorized />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
