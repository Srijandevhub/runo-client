import { useEffect, useState } from 'react'
import Post from '../Post/Post'
import styles from './HomePosts.module.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import useToast from '../../customhooks/useToast'
import axios from 'axios'
import { apiVersion, baseUrl } from '../../data/url'

const HomePosts = () => {
    const [posts, setPosts] = useState([]);
    const [selectedTab, setSelectedTab] = useState("all");
    const [categories, setCategories] = useState([]);

    const makeToast = useToast();
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${baseUrl}/${apiVersion}/category/public/get-categories`);
                if (res.status === 200) {
                    setCategories(res.data.categories);
                }
            } catch (error) {
                makeToast(error.status, error.response.data.message);
            }
        }
        fetchCategories();
    }, [])
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res =  await axios.get(`${baseUrl}/${apiVersion}/article/public/get-articles`, {
                    params: {
                        cat: selectedTab,
                        limit: 8
                    }
                });
                if (res.status === 200) {
                    setPosts(res.data.posts);
                }
            } catch (error) {
                makeToast(error.status, error.response.data.message);
            }
        }
        fetchPosts();
    }, [selectedTab])

    return (
        <div className={styles.postSection}>
            <div className='container'>
                <h1 className={styles.pageHeading}>Popular topics</h1>
                <Swiper className={styles.mobileTabs} spaceBetween={10} breakpoints={{
                    300: {
                        slidesPerView: 3
                    },
                    400: {
                        slidesPerView: 4
                    }
                }}>
                    <SwiperSlide>
                        <button onClick={() => setSelectedTab("all")} className={`${styles.tabBtn} ${selectedTab === 'all' ? `${styles.active}` : ''}`}>All</button>
                    </SwiperSlide>
                    {
                        categories.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <button onClick={() => setSelectedTab(item._id)} className={`${styles.tabBtn} ${selectedTab === item._id ? `${styles.active}` : ''}`}>{item.title}</button>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
                <ul className={styles.tabs}>
                    <li>
                        <button onClick={() => setSelectedTab("all")} className={`${styles.tabBtn} ${selectedTab === 'all' ? `${styles.active}` : ''}`}>All</button>
                    </li>
                    {
                        categories.map((item, index) => {
                            return (
                                <li key={index}>
                                    <button onClick={() => setSelectedTab(item._id)} className={`${styles.tabBtn} ${selectedTab === item._id ? `${styles.active}` : ''}`}>{item.title}</button>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className={styles.row}>
                    {
                        posts.map((item, index) => {
                            return (
                                <div className={styles.col} key={index}>
                                    <Post data={item}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePosts