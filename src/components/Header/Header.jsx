import styles from './Header.module.css'
import Logo from '../../assets/RUNO.png'
import { Link } from 'react-router-dom'
import Search from '../../assets/Search_Icon.png'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiVersion, baseUrl, baseUrl2 } from '../../data/url'
import { logoutUser } from '../../utils/userSlice'
import Post from '../Post/Post'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'

import "swiper/css";

const Header = ({ activeMenu }) => {
    const [mobileMenuShow, setMobileMenuShow] = useState(false);
    const [headerDark, setHeaderDark] = useState(false);

    const [showSearch, setShowSearch] = useState(false);

    const user = useSelector((state) => state.user.data);

    const [posts, setPosts] = useState([]);

    const [skip, setSkip] = useState(0);

    const dispatch = useDispatch();
    const handleScroll = () => {
        if (window.scrollY > 60) {
            setHeaderDark(true);
        } else {
            setHeaderDark(false);
        }
    }

    const [query, setQuery] = useState("");
    const [pagination, setPagination] = useState(null);

    const [limit, setLimit] = useState(4);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${baseUrl}/${apiVersion}/article/public/get-articles`, {
                    params: {
                        query: query,
                        limit: limit,
                        skip: skip
                    }
                });
                if (res.status === 200) {
                    setPosts(res.data.posts);
                    setPagination(res.data.pagination);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchPosts();
    }, [query, skip, limit])

    const handleResize = () => {
        const width = window.innerWidth;
        if (width <= 1199 && width >= 991) {
            console.log(width);
            setLimit(3);
        } else if (width <= 992  && width >= 768) {
            setLimit(2);
        } else if (width <= 767) {
            setLimit(null);
        } else {
            setLimit(4);
        }
    }

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            document.removeEventListener("scroll", handleScroll);
            window.removeEventListener('resize', handleResize);
        }
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
                                        <button className={styles.dropdownLink} onClick={() => dispatch(logoutUser())}>Logout</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <button className={styles.searchBtn} aria-label='search' onClick={() => setShowSearch(true)}>
                        <img src={Search} alt='search'/>
                    </button>
                </nav>
            </div>
            <div className={`${styles.searchScreen} ${showSearch ? `${styles.active}` : ""}`}>
                <div className={styles.screenHeader}>
                    <button onClick={() => setShowSearch(false)} aria-label='close search' className={styles.closeBtn}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                        </svg>
                    </button>
                </div>
                <div className='container'>
                    <input type="text" className={styles.inputControl} placeholder='Search...' value={query} onChange={(e) => setQuery(e.target.value)}/>
                    <div className={styles.row}>
                        {
                            (posts.length > 0 && query) && posts.map((item, index) => {
                                return (
                                    <div className={styles.postCol} key={index}>
                                        <Post data={item}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        (query && pagination) &&
                        <div className={styles.pagination}>
                            {pagination?.previousPage && <button className={styles.paginationBtn} onClick={() => setSkip((pagination?.previousPage - 1) * limit)}>Previous</button>}
                            {Array.from({ length: pagination?.totalPages }, (_, i) => (
                                <button key={i} onClick={() => setSkip(i * limit)} className={`${styles.paginationBtn} ${pagination?.currentPage === i + 1 ? `${styles.active}` : ""}`}>{i + 1}</button>
                            ))}
                            {pagination?.nextPage && <button onClick={() => setSkip((pagination?.nextPage - 1) * limit)} className={styles.paginationBtn}>Next</button>}
                        </div>
                    }
                    <Swiper>
                        {
                            query &&
                            posts.map((item, index) => {
                                return (
                                    <SwiperSlide key={index} className={styles.mobilesearch}>
                                        <Post data={item}/>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </div>
        </header>
    )
}

export default Header