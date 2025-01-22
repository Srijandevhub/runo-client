import { Route, Routes, useLocation } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SinglePost from "./pages/SinglePost"
import ArticlesPage from "./pages/ArticlesPage"
import SignupPage from "./pages/SignupPage"
import SigninPage from "./pages/SigninPage"
import MyProfilePage from "./pages/MyProfilePage"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { verfiedUser } from "./utils/userSlice"
import WritePage from "./pages/WritePage"
import MyPostsPage from "./pages/MyPostsPage"

const App = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        dispatch(verfiedUser());
    }, [dispatch, location.pathname])

    return (
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/post/:title/:id" element={<SinglePost />}/>
            <Route path="/articles" element={<ArticlesPage />}/>
            <Route path="/signin" element={<SigninPage />}/>
            <Route path="/signup" element={<SignupPage />}/>
            <Route path="/myprofile" element={<ProtectedRoute><MyProfilePage /></ProtectedRoute>}/>
            <Route path="/write" element={<ProtectedRoute><WritePage /></ProtectedRoute>}/>
            <Route path="/myposts" element={<ProtectedRoute><MyPostsPage /></ProtectedRoute>}/>
        </Routes>
    )
}

export default App