import styles from './PostDetails.module.css'
import Body from '../../assets/body.jpg'
import { Link } from 'react-router-dom'
import { baseUrl2 } from '../../data/url'
import Maleavatar from '../../assets/maleavatar.png'
import Femaleavatar from '../../assets/femaleavatar.png'

const PostDetails = ({ data, user }) => {
    return (
        <div className={styles.details}>
            <div className="container post-body" dangerouslySetInnerHTML={{ __html: data?.content }}>
                
            </div>
            <div className='container'>
                <div className={styles.authorDetails}>
                    <div className={styles.authorMedia}>
                        <i className={styles.authorImage}>
                            <img src={`${baseUrl2}/uploads/users/${user?.profileimage}`} alt='avatar'/>
                        </i>
                        <div className={styles.authorMediaBody}>
                            <p className={styles.authorName}>By <Link to={`/profile/${data?.userid}`}>{user?.firstname} {user?.lastname}</Link></p>
                            <span className={styles.authorDesignation}>{user?.shortdescription}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetails