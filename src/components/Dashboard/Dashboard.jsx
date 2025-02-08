import { useEffect, useState } from 'react'
import Table from '../Table/Table'
import styles from './Dashboard.module.css'
import useToast from '../../customhooks/useToast';
import axios from 'axios';
import { baseUrl, apiVersion } from '../../data/url';

const Dashboard = () => {

    const [posts, setPosts] = useState([]);

    const [pagination, setPagination] = useState(null);
    const [refreshPost, setRefreshPost] = useState(false);
    const [skip, setSkip] = useState(0);
    const makeToast = useToast();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${baseUrl}/${apiVersion}/article/get-admin-articles`, { withCredentials: true, params: {
                    skip
                } });
                setPosts(res.data.articles);
                setPagination(res.data.pagination);
            } catch (error) {
                makeToast(error.status, error.response.data.message);
            }
        }
        fetchPosts()
    }, [refreshPost, skip])

    return (
        <div className={styles.wrapper}>
            <div className='container'>
                <h2>Posts</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.title}</td>
                                        <td>{item.isarchived ? "ARCHIEVD" : "PUBLISHED"}</td>
                                        <td>

                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <div className={styles.pagination}>
                    {pagination?.previousPage && <button className={styles.paginationBtn} onClick={() => setSkip((pagination?.previousPage - 1) * 10)}>Previous</button>}
                    {Array.from({ length: pagination?.totalPages }, (_, i) => (
                        <button key={i} onClick={() => setSkip(i * 10)} className={`${styles.paginationBtn} ${pagination?.currentPage === i + 1 ? `${styles.active}` : ""}`}>{i + 1}</button>
                    ))}
                    {pagination?.nextPage && <button onClick={() => setSkip((pagination?.nextPage - 1) * 10)} className={styles.paginationBtn}>Next</button>}
                </div>
            </div>
        </div>
    )
}

export default Dashboard