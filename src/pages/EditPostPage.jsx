import { useParams } from "react-router-dom"
import Layout from "../layouts/Layout"
import { useEffect, useState } from "react";
import useToast from "../customhooks/useToast";
import axios from "axios";
import { apiVersion, baseUrl } from "../data/url";
import EditController from "../components/WriteController/EditController";

const EditPostPage = () => {
    const { id } = useParams();
    const makeToast = useToast();
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await axios.get(`${baseUrl}/${apiVersion}/article/get-article/${id}`, { withCredentials: true });
                if (res.status === 200) {
                    setData(res.data.article);
                }
            } catch (error) {
                makeToast(error.status, error.respose.data.message);
            }
        }
        fetchArticle();
    }, [id])

    return (
        <Layout>
            <EditController data={data}/>
        </Layout>
    )
}


export default EditPostPage