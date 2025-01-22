import styles from './Banner.module.css'
import Banner1 from '../../assets/banner.jpg'
const Banner3 = ({ heading }) => {
    return (
        <div className={styles.bannerBox}>
            <img src={Banner1} alt="image 1" className={styles.bannerImage}/>
            <div className={styles.bannerContent}>
                <div className="container">
                    <h1 className={styles.bannerHeading}>{heading}</h1>
                </div>
            </div>
        </div>
    )
}

export default Banner3