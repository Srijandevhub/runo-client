import { Link } from 'react-router-dom'
import Table from '../Table/Table'
import styles from './MyPosts.module.css'
import { useEffect, useState } from 'react'
import useToast from '../../customhooks/useToast'
import axios from 'axios'
import { apiVersion, baseUrl } from '../../data/url'

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const makeToast = useToast();

    const [limit, setLimit] = useState(25);

    const [refresh, setRefresh] = useState(false);
    const handleDeletePost = async (id) => {
        try {
            const res = await axios.delete(`${baseUrl}/${apiVersion}/article/delete-article/${id}`, { withCredentials: true })
            makeToast(res.status, res.data.message);
            setRefresh(!refresh);
        } catch (error) {
            makeToast(error.status, error.response.data.message);
        }
    }

    const tooglePublish = async (id, flag) => {
        try {
            const res = await axios.post(`${baseUrl}/${apiVersion}/article/toogle-publish/${id}`, {
                archieved: flag
            }, { withCredentials: true });
            if (res.status === 200) {
                setRefresh(!refresh);
            }
        } catch (error) {
            makeToast(error.status, error.response.data.message);
        }
    }
    const [pagination, setPagination] = useState(null);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${baseUrl}/${apiVersion}/article/get-articles`, { withCredentials: true, 
                    params: {
                        limit: limit,
                        skip: skip
                    }
                });
                if (res.status === 200) {
                    setPosts(res.data.articles);
                    setPagination(res.data.pagination);
                }
            } catch (error) {
                makeToast(error.status, error.response.data.message);
            }
        }
        fetchPosts();
    }, [refresh, limit, skip])

    return (
        <div className={styles.wrapper}>
            <div className='container'>
                <div className={styles.filter}>
                    <div className={styles.filterRow}>
                        <div className={styles.filterLimit}>
                            <select defaultValue={limit} onChange={(e) => setLimit(e.target.value)}>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                    </div>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((item, index) => {
                                const getDate = () => {
                                    const curr = new Date(item.createdAt);
                                    const day = curr.getDate().toString().padStart(2, '0');
                                    const month = (curr.getMonth() + 1).toString().padStart(2, '0');
                                    const year = curr.getFullYear();
                                    return `${day}.${month}.${year}`
                                }
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Link to={`/post/${item.title}/${item._id}`}>{item.title}</Link>
                                        </td>
                                        <td>
                                            <b>{getDate()}</b>
                                        </td>
                                        <td>
                                            {
                                                !item.isarchieved ?
                                                <span className={`tags ${styles.green}`}>Published</span>
                                                :
                                                <span className={`tags ${styles.red}`}>Archived</span>
                                            }
                                        </td>
                                        <td>
                                            <Link to={`/edit/${item._id}`} className={styles.edit} aria-label='edit'>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
                                                </svg>
                                            </Link>
                                            <button className={styles.delete} aria-label='delete' onClick={() => handleDeletePost(item._id)}>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                                </svg>
                                            </button>
                                            {
                                                !item.isarchieved ?
                                                <button className={styles.unPub} aria-label='ubpublish' onClick={() => tooglePublish(item._id, true)}>
                                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"/>
                                                    </svg>
                                                </button>
                                                :
                                                <button className={styles.pub} aria-label='ubpublish' onClick={() => tooglePublish(item._id, false)}>
                                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"/>
                                                    </svg>
                                                </button>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <div className={styles.pagination}>
                    {pagination?.previousPage && <button className={styles.paginationBtn} onClick={() => setSkip((pagination?.previousPage - 1) * limit)}>Previous</button>}
                    {Array.from({ length: pagination?.totalPages }, (_, i) => (
                        <button key={i} onClick={() => setSkip(i * limit)} className={`${styles.paginationBtn} ${pagination?.currentPage === i + 1 ? `${styles.active}` : ""}`}>{i + 1}</button>
                    ))}
                    {pagination?.nextPage && <button onClick={() => setSkip((pagination?.nextPage - 1) * limit)} className={styles.paginationBtn}>Next</button>}
                </div>
            </div>
        </div>
    )
}

export default MyPosts