import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from './RelatedPost.module.css'
import Post2 from "../Post/Post2";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiVersion, baseUrl } from "../../data/url";
const RelatedPost = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${baseUrl}/${apiVersion}/article/related-articles/${id}`);
                if (res.status === 200) {
                    setPosts(res.data.articles);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchPosts();
    }, [id])

    return (
        <div className={styles.postSec}>
            <div className='container' style={{ maxWidth: '100%' }}>
                <h1 className={styles.pageHeading}>Related topics</h1>
                <Swiper
                    pagination={false}
                    breakpoints={{
                        0: {
                            spaceBetween: 0
                        },
                        900: {
                            slidesPerView: 2,
                            spaceBetween: 15
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        }
                    }}
                >
                    {
                        posts.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <Post2 data={item}/>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default RelatedPost