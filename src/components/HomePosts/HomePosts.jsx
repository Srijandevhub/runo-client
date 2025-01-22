import Post from '../Post/Post'
import styles from './HomePosts.module.css'

import { Swiper, SwiperSlide } from 'swiper/react'

const HomePosts = () => {
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
                        <button className={`${styles.tabBtn} ${styles.active}`}>All</button>
                    </SwiperSlide>
                    <SwiperSlide>
                        <button className={`${styles.tabBtn}`}>Adventure</button>
                    </SwiperSlide>
                    <SwiperSlide>
                        <button className={`${styles.tabBtn}`}>Travel</button>
                    </SwiperSlide>
                    <SwiperSlide>
                        <button className={`${styles.tabBtn}`}>Fashion</button>
                    </SwiperSlide>
                    <SwiperSlide>
                        <button className={`${styles.tabBtn}`}>Technology</button>
                    </SwiperSlide>
                    <SwiperSlide>
                        <button className={`${styles.tabBtn}`}>Branding</button>
                    </SwiperSlide>
                </Swiper>
                <ul className={styles.tabs}>
                    <li>
                        <button className={`${styles.tabBtn} ${styles.active}`}>All</button>
                    </li>
                    <li>
                        <button className={`${styles.tabBtn}`}>Adventure</button>
                    </li>
                    <li>
                        <button className={`${styles.tabBtn}`}>Travel</button>
                    </li>
                    <li>
                        <button className={`${styles.tabBtn}`}>Fashion</button>
                    </li>
                    <li>
                        <button className={`${styles.tabBtn}`}>Technology</button>
                    </li>
                    <li>
                        <button className={`${styles.tabBtn}`}>Branding</button>
                    </li>
                </ul>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <Post />
                    </div>
                    <div className={styles.col}>
                        <Post />
                    </div>
                    <div className={styles.col}>
                        <Post />
                    </div>
                    <div className={styles.col}>
                        <Post />
                    </div>
                    <div className={styles.col}>
                        <Post />
                    </div>
                    <div className={styles.col}>
                        <Post />
                    </div>
                    <div className={styles.col}>
                        <Post />
                    </div>
                    <div className={styles.col}>
                        <Post />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePosts