import styles from './Header.module.css'
import Logo from '../../assets/RUNO.png'
import { Link } from 'react-router-dom'
import Search from '../../assets/Search_Icon.png'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Maleavatar from '../../assets/maleavatar.png'
import Femaleavatar from '../../assets/femaleavatar.png'
import { baseUrl2 } from '../../data/url'
import { logoutUser } from '../../utils/userSlice'

const Header = ({ activeMenu }) => {
    const [mobileMenuShow, setMobileMenuShow] = useState(false);
    const [headerDark, setHeaderDark] = useState(false);

    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    const handleScroll = () => {
        if (window.scrollY > 60) {
            setHeaderDark(true);
        } else {
            setHeaderDark(false);
        }
    }

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll);
    }, [])
    return (
        <header className={`${styles.headerWrapper} ${headerDark ? `${styles.dark}` : ""}`}>
            <div className="container">
                <nav className={styles.navbar}>
                    <button className={styles.navbarToogler} aria-label='navbar-toogler' onClick={() => setMobileMenuShow(true)}>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                    </button>
                    <Link className={styles.navbarBrand} to="/">
                        <img src={Logo} alt='logo'/>
                    </Link>
                    <div className={`${styles.navbarContainer} ${mobileMenuShow ? `${styles.show}` : ""}`}>
                        <div className={styles.navbarContent}>
                            <div className={styles.mobileHeader}>
                                <button className={styles.navbarClose} aria-label='close' onClick={() => setMobileMenuShow(false)}>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                                    </svg>
                                </button>
                            </div>
                            <ul className={styles.navbarMenu}>
                                <li>
                                    <Link className={`${styles.navbarLink} ${activeMenu === 'home' ? `${styles.active}` : ""}`} to="/">Home</Link>
                                </li>
                                <li>
                                    <Link className={`${styles.navbarLink} ${activeMenu === 'articles' ? `${styles.active}` : ""}`} to="/articles">Articles</Link>
                                </li>
                            </ul>
                            {
                                !user ?
                                <ul className={styles.navbarBtns}>
                                    <li>
                                        <Link to="/signin" className={`${styles.btn} ${styles.signinBtn}`}>Signin</Link>
                                    </li>
                                    <li>
                                        <Link to="/signup" className={`${styles.btn} ${styles.signupBtn}`}>Signup</Link>
                                    </li>
                                </ul>
                                :
                                <div className={styles.profileButton}>
                                    <i>
                                        <img src={`${baseUrl2}/uploads/users/${user.profileimage}`} alt='avatar'/>
                                    </i>
                                    <span className={styles.profileName}>{user.username}</span>
                                    <div className={styles.profileDropdown}>
                                        <Link to="/myprofile" className={styles.dropdownLink}>My Profile</Link>
                                        <Link to="/myposts" className={styles.dropdownLink}>My Posts</Link>
                                        <Link to="/write" className={styles.dropdownLink}>Write</Link>
                                        {
                                            user.role === 'admin' &&
                                            <Link to="/admin/dashboard" className={styles.dropdownLink}>Dashboard</Link>
                                        }
                                        <button className={styles.dropdownLink} onClick={() => dispatch(logoutUser())}>Logout</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <button className={styles.searchBtn} aria-label='search'>
                        <img src={Search} alt='search'/>
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header