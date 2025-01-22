import styles from './FeaturedBlog.module.css'
import Featured from '../../assets/featured.jpg'
import { Link } from 'react-router-dom'
const FeaturedBlog = () => {
    return (
        <div className={styles.featuredBlogSec}>
            <img src={Featured} alt='blogs' className={styles.blogImage}/>
            <div className={styles.blogContent}>
                <div className='container'>
                    <div className={styles.blogInner}>
                        <div className={styles.categories}>
                            <span className="tags">FASHION</span>
                        </div>
                        <h3 className={styles.heading}>Richird Norton photorealistic rendering as real photos</h3>
                        <p className={styles.text}>Progressively incentivize cooperative systems through technically sound functionalities. The credibly productivate seamless data.</p>
                        <div className={styles.hr}></div>
                        <p className={styles.date}>08.08.2021</p>
                    </div>
                </div>
            </div>
            <Link to="/" className={styles.blankLink}></Link>
        </div>
    )
}

export default FeaturedBlog