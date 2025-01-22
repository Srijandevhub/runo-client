import styles from "./Banner.module.css"
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import Banner1 from '../../assets/banner.jpg'
import Banner2 from '../../assets/banner2.png'
import Banner3 from '../../assets/banner3.jpg'
import Banner4 from '../../assets/banner4.jpg'
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <Swiper
            slidesPerView={1}
            pagination={false}
            loop={false}
        >
            <SwiperSlide>
                <div className={styles.bannerBox}>
                    <img src={Banner1} alt="image 1" className={styles.bannerImage}/>
                    <div className={styles.bannerContent}>
                        <div className="container">
                            <div className={styles.bannerCategories}>
                                <span className="tags">ADVENTURE</span>
                            </div>
                            <strong className={styles.bannerHeading}>Richird Norton photorealistic rendering as real photos</strong>
                            <div className={styles.bannerMedia}>
                                <span className={styles.bannerDate}>08.08.2021</span>
                                <div className={styles.bannerText}>
                                    <p>Progressively incentivize cooperative systems through technically sound functionalities. The credibly productivate seamless data.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to="/" className={styles.blankLink}></Link>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.bannerBox}>
                    <img src={Banner2} alt="image 1" className={styles.bannerImage}/>
                    <div className={styles.bannerContent}>
                        <div className="container">
                            <div className={styles.bannerCategories}>
                                <span className="tags">ADVENTURE</span>
                            </div>
                            <strong className={styles.bannerHeading}>Richird Norton photorealistic rendering as real photos</strong>
                            <div className={styles.bannerMedia}>
                                <span className={styles.bannerDate}>08.08.2021</span>
                                <div className={styles.bannerText}>
                                    <p>Progressively incentivize cooperative systems through technically sound functionalities. The credibly productivate seamless data.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to="/" className={styles.blankLink}></Link>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.bannerBox}>
                    <img src={Banner3} alt="image 1" className={styles.bannerImage}/>
                    <div className={styles.bannerContent}>
                        <div className="container">
                            <div className={styles.bannerCategories}>
                                <span className="tags">ADVENTURE</span>
                            </div>
                            <strong className={styles.bannerHeading}>Richird Norton photorealistic rendering as real photos</strong>
                            <div className={styles.bannerMedia}>
                                <span className={styles.bannerDate}>08.08.2021</span>
                                <div className={styles.bannerText}>
                                    <p>Progressively incentivize cooperative systems through technically sound functionalities. The credibly productivate seamless data.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to="/" className={styles.blankLink}></Link>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.bannerBox}>
                    <img src={Banner4} alt="image 1" className={styles.bannerImage}/>
                    <div className={styles.bannerContent}>
                        <div className="container">
                            <div className={styles.bannerCategories}>
                                <span className="tags">ADVENTURE</span>
                            </div>
                            <strong className={styles.bannerHeading}>Richird Norton photorealistic rendering as real photos</strong>
                            <div className={styles.bannerMedia}>
                                <span className={styles.bannerDate}>08.08.2021</span>
                                <div className={styles.bannerText}>
                                    <p>Progressively incentivize cooperative systems through technically sound functionalities. The credibly productivate seamless data.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to="/" className={styles.blankLink}></Link>
                </div>
            </SwiperSlide>
        </Swiper>
    )
}


export default Banner