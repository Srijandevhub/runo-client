import { useEffect, useState } from "react"
import Banner2 from "../components/Banner/Banner2"
import PostDetails from "../components/Post/PostDetails"
import RelatedPost from "../components/RelatedPost/RelatedPost"
import Layout from "../layouts/Layout"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { apiVersion, baseUrl } from "../data/url"
import { useSelector } from "react-redux"

const SinglePost = () => {

    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const userGlobal = useSelector((state) => state.user.data);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`${baseUrl}/${apiVersion}/article/public/get-article/${id}`, { withCredentials: true });
                if (res.status === 200) {
                    setArticle(res.data.article);
                    setUser(res.data.user);
                }
            } catch (error) {
                if (error.status === 400 || error.status === 500 || error.status === 401 || error.status === 403) {
                    navigate("/");
                }
            }
        }
        fetchPost();
    }, [id])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [])

    useEffect(() => {
        if (!userGlobal) {
            if (article?.isarchieved) {
                navigate("/");
            }
        }
    }, [userGlobal, article])

    return (
        <Layout>
            <Banner2 image={article?.coverimage} title={article?.title} category={article?.categorytitle} desc={article?.shortdescription} author={`${user?.firstname} ${user?.lastname}`} date={article?.createdAt}/>
            <PostDetails data={article} user={user}/>
            <RelatedPost />
        </Layout>
    )
}

export default SinglePost