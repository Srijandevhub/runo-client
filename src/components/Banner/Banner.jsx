import styles from "./Banner.module.css"
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import Banner1 from '../../assets/banner.jpg'
import Banner2 from '../../assets/banner2.png'
import Banner3 from '../../assets/banner3.jpg'
import Banner4 from '../../assets/banner4.jpg'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useToast from "../../customhooks/useToast";
import axios from "axios";
import { apiVersion, baseUrl, baseUrl2 } from "../../data/url";

const Banner = () => {

    const [banners, setBanners] = useState([]);
    const makeToast = useToast();
    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const res = await axios.get(`${baseUrl}/${apiVersion}/article/banner`);
                if (res.status === 200) {
                    setBanners(res.data.articles);
                }
            } catch (error) {
                makeToast(error.status, error.response.data.message);
            }
        }
        fetchBanner();
    }, [])

    return (
        <Swiper
            slidesPerView={1}
            pagination={false}
            loop={false}
        >
            {
                banners.map((item, index) => {
                    const getDate = () => {
                        const currDate = new Date(item.createdAt);
                        const date = currDate.getDate();
                        const month = currDate.getMonth() + 1;
                        const year = currDate.getFullYear();
                        return `${date.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
                    }
                    return (
                        <SwiperSlide key={index}>
                            <div className={styles.bannerBox}>
                                <img src={`${baseUrl2}/uploads/articles/${item.coverimage}`} alt="image 1" className={styles.bannerImage}/>
                                <div className={styles.bannerContent}>
                                    <div className="container">
                                        <div className={styles.bannerCategories}>
                                            <span className="tags">{item?.categorytitle}</span>
                                        </div>
                                        <strong className={styles.bannerHeading}>{item?.title}</strong>
                                        <div className={styles.bannerMedia}>
                                            <span className={styles.bannerDate}>{getDate()}</span>
                                            <div className={styles.bannerText}>
                                                <p>{item?.shortdescription}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link to={`/post/${item.title}/${item._id}`} className={styles.blankLink}></Link>
                            </div>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}


export default Banner