import { useEffect, useState } from 'react'
import Table from '../Table/Table'
import styles from './Dashboard.module.css'

const Dashboard = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                
            } catch (error) {
                
            }
        }
    }, [])

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
                </Table>
            </div>
        </div>
    )
}

export default Dashboard