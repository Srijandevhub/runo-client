import { useEffect, useState } from 'react'
import Post2 from '../Post/Post2'
import styles from './EditorsPick.module.css'
import useToast from '../../customhooks/useToast';
import axios from 'axios';
import { apiVersion, baseUrl } from '../../data/url';

const EditorsPick = () => {
    const [posts, setPosts] = useState([]);
    const makeToast = useToast();
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`${baseUrl}/${apiVersion}/article/editorspick`);
                if (res.status === 200) {
                    setPosts(res.data.articles);
                }
            } catch (error) {
                makeToast(error.status, error.response.data.message);
            }
        }
        fetchPost();
    }, [])
    return (
        <div className={styles.editorSec}>
            <div className='container'>
                <h2 className={styles.pageHeading}>Editor's Pick</h2>
                <div className={styles.row}>
                    {
                        posts.map((item, index) => {
                            return (
                                <div className={styles.col} key={index}>
                                    <Post2 data={item}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default EditorsPick