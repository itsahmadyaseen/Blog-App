import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  } 

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Blog Website</div>
        <div className="space-x-4">
          <button className="text-white" onClick={()=>navigate('/')}>Blogs</button>
          <button className="text-white" onClick={()=>navigate('/my-blogs')}>My Blogs</button>
          <button className="text-white" onClick={()=>navigate('/add-blog')}>Add Blog</button>
          <button className="text-white" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
