import Banner3 from "../components/Banner/Banner3"
import MyPosts from "../components/MyPosts/MyPosts"
import Layout from "../layouts/Layout"

const MyPostsPage = () => {
    return (
        <Layout>
            <Banner3 heading={"My Posts"}/>
            <MyPosts />
        </Layout>
    )
}

export default MyPostsPage