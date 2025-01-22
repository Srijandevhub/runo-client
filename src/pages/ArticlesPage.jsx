import { useEffect } from "react"
import ArticleListing from "../components/ArticleListing/ArticleListing"
import Banner3 from "../components/Banner/Banner3"
import Layout from "../layouts/Layout"

const ArticlesPage = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [])
    return (
        <Layout activeMenu={"articles"}>
            <Banner3 heading={"Articles"}/>
            <ArticleListing />
        </Layout>
    )
}

export default ArticlesPage