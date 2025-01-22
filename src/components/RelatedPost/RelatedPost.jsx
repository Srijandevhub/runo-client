import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from './RelatedPost.module.css'
import Post2 from "../Post/Post2";
const RelatedPost = () => {
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
                    <SwiperSlide>
                        <Post2 />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Post2 />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Post2 />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default RelatedPost