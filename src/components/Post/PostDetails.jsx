import styles from './PostDetails.module.css'
import { Link } from 'react-router-dom'
import { baseUrl2 } from '../../data/url'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const PostDetails = ({ data, user, comments, postComment, deletecomment }) => {
    const [comment, setComment] = useState("");

    const loggedinUser = useSelector((state) => state.user.data);

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
                {
                    loggedinUser &&
                    <div className={styles.comments}>
                        <textarea className={styles.box} placeholder='Write your comment' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                        <button className={styles.btn} onClick={() => {
                            postComment(comment);
                            setComment("");
                        }}>Comment</button>
                        {
                            comments.map((item, index) => {
                                const getDate = () => {
                                    const curr = new Date(item.createdAt);
                                    const day = curr.getDate().toString().padStart(2, '0');
                                    const month = (curr.getMonth() + 1).toString().padStart(2, '0');
                                    const year = curr.getFullYear();
                                    return `${day}.${month}.${year}`;
                                }
                                return (
                                    <div className={styles.commentBox} key={index}>
                                        <div className={styles.commentUser}>
                                            <i>
                                                <img src={`${baseUrl2}/uploads/users/${item.profileimage}`} alt='profile'/>
                                            </i>
                                            <div className={styles.profileName}>{item.username}</div>
                                        </div>
                                        <div>{getDate()}</div>
                                        <div className={styles.commentBody}>{item.comment}</div>
                                        {
                                            item.userid === loggedinUser._id &&
                                            <button aria-label='delete comment' className={styles.delBtn} onClick={() => {
                                                deletecomment(item._id);
                                            }}>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                                </svg>
                                            </button>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default PostDetails