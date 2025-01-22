import { useEffect } from "react"
import Banner from "../components/Banner/Banner"
import EditorsPick from "../components/EditorsPick/EditorsPick"
import FeaturedBlog from "../components/FeaturedBlog/FeaturedBlog"
import HomePosts from "../components/HomePosts/HomePosts"
import Layout from "../layouts/Layout"

const HomePage = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [])
    return (
        <Layout activeMenu={"home"}>
            <Banner />
            <HomePosts />
            <FeaturedBlog />
            <EditorsPick />
        </Layout>
    )
}

export default HomePage