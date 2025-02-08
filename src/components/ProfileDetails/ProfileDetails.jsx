import styles from './ProfileDetails.module.css'
import { baseUrl2 } from '../../data/url'

const ProfileDetails = ({ user }) => {
    return (
        <>
            <div className={styles.bannerWrapper} style={{ backgroundImage: `url(${baseUrl2}/uploads/users/${user?.coverimage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}></div>
            <div className={styles.profileWrapper}>
                <div className='container'>
                    <div className={styles.profileInner}>
                        <div className={styles.profileImage} style={{ backgroundImage: `url(${baseUrl2}/uploads/users/${user?.profileimage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}></div>
                    </div>
                </div>
            </div>
            <div className={styles.profileContent}>
                <div className='container'>
                    <div className={styles.profileName}>
                        {user?.firstname} {user?.lastname}
                    </div>
                    <p>{user?.bio}</p>
                    <h3>{user?.shortdescription}</h3>
                </div>
            </div>
        </>
    )
}

export default ProfileDetails