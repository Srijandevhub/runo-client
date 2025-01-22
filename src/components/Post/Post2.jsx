import styles from './Post2.module.css'
import Editor from '../../assets/editor.jpg'
import { Link } from 'react-router-dom'

const Post2 = () => {
    return (
        <div className={styles.postBox}>
            <img src={Editor} alt='editor' className={styles.postImage}/>
            <div className={styles.categories}>
                <span className='tags'>ADVENTURE</span>
                <span className='tags'>fashion</span>
            </div>
            <div className={styles.postBody}>
                <p className={styles.date}>08.08.2021</p>
                <h3 className={styles.heading}>Richird Norton photorealistic rendering as real photos</h3>
                <p className={styles.text}>Progressively incentivize cooperative systems through technically sound functionalities. The credibly productivate seamless data.</p>
            </div>
            <Link to="/post" className={styles.blankLink}></Link>
        </div>
    )
}

export default Post2