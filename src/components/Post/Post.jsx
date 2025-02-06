import styles from './Post.module.css'
import Blog from "../../assets/Blog Image.jpg"
import Author from '../../assets/cu.png'
import { Link } from 'react-router-dom'
import { baseUrl2 } from '../../data/url'
import { useEffect, useState } from 'react'

const Post = ({ data }) => {
    const [date, setDate] = useState("");
    useEffect(() => {
        const getDate = new Date(data.createdAt);
        const year = String(getDate.getFullYear());
        const month = String(getDate.getMonth() + 1).padStart(2, '0');
        const day = String(getDate.getDate()).padStart(2, '0');
        setDate(day + "." + month + "." + year);
    }, [])
    return (
        <div className={styles.postBox}>
            <div className={styles.postHeader}>
                <Link to={`/post/${data.title}/${data._id}`}>
                    <img src={`${baseUrl2}/uploads/articles/${data.thumbnail}`} alt='blog image' className={styles.postImage}/>
                </Link>
                <div className={styles.postCategories}>
                    <span className="tags">{data.categorytitle}</span>
                </div>
            </div>
            <div className={styles.postBody}>
                <p className={styles.date}>{date}</p>
                <h3 className={styles.heading}>
                    <Link to={`/post/${data.title}/${data._id}`}>
                        {data.title}
                    </Link>
                </h3>
                <p className={styles.text}>
                    {data.shortdescription}
                </p>
            </div>
            <div className={styles.postFooter}>
                <div className={styles.authorMedia}>
                    <i className={styles.authorImage}>
                        <img src={`${baseUrl2}/uploads/users/${data.authorimage}`} alt='author'/>
                    </i>
                    <div className={styles.authorMediaBody}>
                        <p className={styles.authorName}>By <Link to={`/profile/${data.userid}`}>{data.author}</Link></p>
                        <span className={styles.authorDesignation}>{data.authordes}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post