import styles from './FeaturedBlog.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useToast from '../../customhooks/useToast'
import axios from 'axios'
import { apiVersion, baseUrl, baseUrl2 } from '../../data/url';

const FeaturedBlog = () => {
    const [item, setItem] = useState(null);
    const [date, setDate] = useState("");
    const makeToast = useToast();
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await axios.get(`${baseUrl}/${apiVersion}/article/featured`);
                if (res.status === 200) {
                    setItem(res.data.article);
                }
            } catch (error) {
                makeToast(error.status, error.response.data.message);
            }
        }
        fetchItem();
    }, [])

    useEffect(() => {
        if (item) {
            const getDate = new Date(item.createdAt);
            const year = String(getDate.getFullYear());
            const month = String(getDate.getMonth() + 1).padStart(2, '0');
            const day = String(getDate.getDate()).padStart(2, '0');
            setDate(day + "." + month + "." + year);
        }
    }, [item])

    return (
        <div className={styles.featuredBlogSec}>
            <img src={`${baseUrl2}/uploads/articles/${item?.coverimage}`} alt='blogs' className={styles.blogImage}/>
            <div className={styles.blogContent}>
                <div className='container'>
                    <div className={styles.blogInner}>
                        <div className={styles.categories}>
                            <span className="tags">{item?.categorytitle}</span>
                        </div>
                        <h3 className={styles.heading}>{item?.title}</h3>
                        <p className={styles.text}>{item?.shortdescription}</p>
                        <div className={styles.hr}></div>
                        <p className={styles.date}>{date}</p>
                    </div>
                </div>
            </div>
            <Link to={`/post/${item?.title}/${item?._id}`} className={styles.blankLink}></Link>
        </div>
    )
}

export default FeaturedBlog