import Post from '../Post/Post'
import styles from './ArticleListing.module.css'
const ArticleListing = () => {
    return (
        <div className={styles.listingSec}>
            <div className='container'>
                <div className={styles.row}>
                    <div className={styles.col1}>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <Post />
                            </div>
                            <div className={styles.col}>
                                <Post />
                            </div>
                            <div className={styles.col}>
                                <Post />
                            </div>
                            <div className={styles.col}>
                                <Post />
                            </div>
                            <div className={styles.col}>
                                <Post />
                            </div>
                            <div className={styles.col}>
                                <Post />
                            </div>
                        </div>
                        <ul className={styles.pagination}>
                            <li>
                                <button className={styles.paginationBtn}>1</button>
                            </li>
                            <li>
                                <button className={styles.paginationBtn}>2</button>
                            </li>
                            <li>
                                <button className={styles.paginationBtn}>3</button>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.col2}>
                        <input type='text' className={styles.search} placeholder='Search posts...'/>
                        <h5 className={styles.widgetHeading}>Categories</h5>
                        <div className={styles.formCheck}>
                            <input type='checkbox' className={styles.formInput} id="adventure"/>
                            <label htmlFor='adventure' className={styles.formLabel}>Adventure</label>
                        </div>
                        <div className={styles.formCheck}>
                            <input type='checkbox' className={styles.formInput} id="adventure"/>
                            <label htmlFor='adventure' className={styles.formLabel}>Adventure</label>
                        </div>
                        <h5 className={styles.widgetHeading}>Authors</h5>
                        <div className={styles.formCheck}>
                            <input type='checkbox' className={styles.formInput} id="adventure"/>
                            <label htmlFor='adventure' className={styles.formLabel}>Adventure</label>
                        </div>
                        <div className={styles.formCheck}>
                            <input type='checkbox' className={styles.formInput} id="adventure"/>
                            <label htmlFor='adventure' className={styles.formLabel}>Adventure</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleListing