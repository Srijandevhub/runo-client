import styles from './Post2.module.css'
import { Link } from 'react-router-dom'
import { baseUrl2 } from '../../data/url'
import { useEffect, useState } from 'react'

const Post2 = ({ data }) => {
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
            <img src={`${baseUrl2}/uploads/articles/${data?.coverimage}`} alt='editor' className={styles.postImage}/>
            <div className={styles.categories}>
                <span className='tags'>{data?.categorytitle}</span>
            </div>
            <div className={styles.postBody}>
                <p className={styles.date}>{date}</p>
                <h3 className={styles.heading}>{data?.title}</h3>
                <p className={styles.text}>{data?.shortdescription}</p>
            </div>
            <Link to={`/post/${data?.title}/${data?._id}`} className={styles.blankLink}></Link>
        </div>
    )
}

export default Post2