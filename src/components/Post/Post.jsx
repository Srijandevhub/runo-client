import styles from './Post.module.css'
import Blog from "../../assets/Blog Image.jpg"
import Author from '../../assets/cu.png'
import { Link } from 'react-router-dom'

const Post = () => {
    return (
        <div className={styles.postBox}>
            <div className={styles.postHeader}>
                <img src={Blog} alt='blog image' className={styles.postImage}/>
                <div className={styles.postCategories}>
                    <span className="tags">Adventure</span>
                </div>
            </div>
            <div className={styles.postBody}>
                <p className={styles.date}>08.08.2021</p>
                <h3 className={styles.heading}>
                    <Link to="/post">
                        Dream destinations to visit this year in Paris
                    </Link>
                </h3>
                <p className={styles.text}>
                    Progressively incentivize cooperative systems through technically sound functionalities. The credibly productivate seamless data.
                </p>
            </div>
            <div className={styles.postFooter}>
                <div className={styles.authorMedia}>
                    <i className={styles.authorImage}>
                        <img src={Author} alt='author'/>
                    </i>
                    <div className={styles.authorMediaBody}>
                        <p className={styles.authorName}>By <Link to="/">Jennifer Lawrence</Link></p>
                        <span className={styles.authorDesignation}>Thinker & Designer</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post