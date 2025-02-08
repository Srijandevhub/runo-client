import { useParams } from "react-router-dom"
import Layout from "../layouts/Layout"
import ProfileDetails from "../components/ProfileDetails/ProfileDetails";
import { useEffect, useState } from "react";
import useToast from "../customhooks/useToast";
import axios from "axios";
import { baseUrl, apiVersion } from "../data/url";

const ProfilePage = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    const makeToast = useToast();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(`${baseUrl}/${apiVersion}/user/get-user-profile/${id}`);
                if (res.status === 200) {
                    setData(res.data.user);
                }
            } catch (error) {
                makeToast(error.status, error.response.data.message);
            }
        }
        fetchUserProfile();
    }, [id])

    return (
        <Layout>
            <ProfileDetails user={data}/>
        </Layout>
    )
}

export default ProfilePage