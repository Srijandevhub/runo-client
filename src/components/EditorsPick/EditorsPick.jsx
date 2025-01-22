import Post2 from '../Post/Post2'
import styles from './EditorsPick.module.css'

const EditorsPick = () => {
    return (
        <div className={styles.editorSec}>
            <div className='container'>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <Post2 />
                    </div>
                    <div className={styles.col}>
                        <Post2 />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditorsPick