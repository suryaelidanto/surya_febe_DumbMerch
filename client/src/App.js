import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css';
import ComplainPageAdmin from './pages/ComplainPageAdmin';
import ComplainPage from './pages/ComplainPage';
import CategoryPage from './pages/CategoryPage';
import DetailProduct from './pages/DetailProduct';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import Register from './pages/Register';
import EditCategory from './pages/EditCategory';
import EditProduct from './pages/EditProduct';
import WishlistPage from './pages/WishlistPage';
import AddProduct from './pages/AddProduct';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API, setAuthToken } from './config/api'
import { UserContext } from './context/userContext'
import { useContext, useEffect } from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AddCategory from './pages/AddCategory';

if (localStorage.token) setAuthToken(localStorage.token)

function App() {

  const [state, dispatch] = useContext(UserContext)

  console.log(state)

  const checkAuth = async () => {

    const data = await API.get('/checkAuth', {
      validateStatus: () => true
    })

    console.log(data, "ini cuy")

    if (!localStorage.token || data.data.status !== 'success') {
      return dispatch({
        type: 'AUTH_ERROR'
      })
    }

    return dispatch({
      type: 'USER_SUCCESS',
      payload: data.data.data
    })
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/addproduct" element={<AddProduct />}></Route>
            <Route path="/addcategory" element={<AddCategory />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/detail/:id" element={<DetailProduct />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/category" element={<CategoryPage />}></Route>
            <Route path="/product" element={<ProductPage />}></Route>
            <Route path="/complainadmin" element={<ComplainPageAdmin />}></Route>
            <Route path="/complain" element={<ComplainPage />}></Route >
            <Route path="/editcategory/:id" element={<EditCategory />}></Route>
            <Route path="/editproduct/:id" element={<EditProduct />}></Route>
            <Route path="/wishlist" element={<WishlistPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
