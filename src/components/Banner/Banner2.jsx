import styles from './Banner.module.css'
import { useEffect, useState } from 'react'
import { baseUrl2 } from '../../data/url';
const Banner2 = ({ image, title, category, desc, author, date }) => {
    const [created, setCreated] = useState("");
    useEffect(() => {
        const getDate = new Date(date);
        const year = String(getDate.getFullYear());
        const month = String(getDate.getMonth() + 1).padStart(2, '0');
        const day = String(getDate.getDate()).padStart(2, '0');
        setCreated(day + "." + month + "." + year);
    }, [date])
    return (
        <div className={styles.bannerBox}>
            <img src={`${baseUrl2}/uploads/articles/${image}`} alt="image 1" className={styles.bannerImage}/>
            <div className={styles.bannerContent}>
                <div className="container">
                    <div className={styles.bannerCategories}>
                        <span className="tags">{category}</span>
                    </div>
                    <strong className={styles.bannerHeading}>{title}</strong>
                    <div className={styles.bannerMedia}>
                        <span className={styles.bannerDate}>{created}</span>
                        <div className={styles.bannerText}>
                            <p>{desc}</p>
                        </div>
                    </div>
                    <p className={styles.author}>By {author}</p>
                </div>
            </div>
        </div>
    )
}

export default Banner2