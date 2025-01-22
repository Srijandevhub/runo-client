import styles from './Editor.module.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useToast from '../../customhooks/useToast';
import axios from 'axios';
import { apiVersion, baseUrl } from '../../data/url';
const Editor = ({ value, onChange, onUploadImage }) => {
    const makeToast = useToast();
    const handleImageUploads = async (e) => {
        try {
            const formdata = new FormData();
            Array.from(e.target.files).forEach(file => formdata.append("images", file));
            const res = await axios.post(`${baseUrl}/${apiVersion}/public/upload-images`, formdata, { 
                "Content-Type": "multipart/form-data",    
                withCredentials: true
            });
            if (res.status === 200) {
                onUploadImage(res.data.images);
            }
        } catch (error) {
            makeToast(error.status, error.response.data.message);
        }
        e.target.value = null;
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.imageBtn}>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path fill="currentColor" d="M16 18H8l2.5-6 2 4 1.5-2 2 4Zm-1-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/>
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1ZM8 18h8l-2-4-1.5 2-2-4L8 18Zm7-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/>
                </svg>
                <input type='file' accept='image/*' onChange={(e) => handleImageUploads(e)} multiple/>
            </div>
            <ReactQuill value={value} onChange={onChange}/>
        </div>
    )
}

export default Editor