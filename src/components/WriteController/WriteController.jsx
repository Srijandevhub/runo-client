import styles from './WriteController.module.css'
import Cover from '../../assets/cover.jpg'
import { useEffect, useState } from 'react'
import FormGroup1 from '../FormGroup/FormGroup1';
import Editor from './Editor';
import { apiVersion, baseUrl, baseUrl2 } from '../../data/url';
import axios from 'axios';
import useToast from '../../customhooks/useToast';

const WriteController = () => {
    const [coverImage, setCoverImage] = useState(Cover);
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [title, setTitle] = useState("");
    const [shortdescription, setShortdescription] = useState("");
    const [content, setContent] = useState("");
    
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("0");
    const [selectedTag, setSelectedTag] = useState("0");

    const makeToast = useToast();

    const handleChangeCover = (e) => {
        const file = e.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onloadend = () => {
                setCoverImage(reader.result);
            }
            reader.readAsDataURL(file);
            setCoverImageFile(file);
        }
        e.target.value = null;
    }

    const saveArticle = async () => {
        try {
            const formData = new FormData();
            formData.append("categoryid", selectedCategory);
            formData.append("tagid", selectedTag);
            formData.append("title", title);
            formData.append("shortdescription", shortdescription);
            formData.append("content", content);
            formData.append("isarchieved", true);
            formData.append("coverimage", coverImageFile);
            const res = await axios.post(`${baseUrl}/${apiVersion}/article/add-article`, formData, { withCredentials: true });
            if (res.status === 200) {
                makeToast(res.status, res.data.message, true, `/post/${res.data.article.title}/${res.data.article._id}`);
            }
        } catch (error) {
            makeToast(error.status, error.response.data.message);
        }
    }
    const publishArticle = async () => {
        try {
            const formData = new FormData();
            formData.append("categoryid", selectedCategory);
            formData.append("tagid", selectedTag);
            formData.append("title", title);
            formData.append("shortdescription", shortdescription);
            formData.append("content", content);
            formData.append("isarchieved", false);
            formData.append("coverimage", coverImageFile);
            const res = await axios.post(`${baseUrl}/${apiVersion}/article/add-article`, formData, { withCredentials: true });
            if (res.status === 200) {
                makeToast(res.status, res.data.message, true, `/post/${res.data.article.title}/${res.data.article._id}`);
            }
        } catch (error) {
            makeToast(error.status, error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${baseUrl}/${apiVersion}/category/get-categories`);
                if (res.status === 200) {
                    setSelectedCategory(res.data.categories[0]._id);
                    setCategories(res.data.categories);
                }
            } catch (error) {
                console.log(error);
            }
        }
        const fetchTags = async () => {
            try {
                const res = await axios.get(`${baseUrl}/${apiVersion}/tag/get-tags`);
                if (res.status === 200) {
                    setSelectedTag(res.data.tags[0]._id);
                    setTags(res.data.tags);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategories();
        fetchTags();
    }, [])

    return (
        <>
            <div className={styles.cover} style={{ backgroundImage: `url(${coverImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <div className={styles.uploadImage}>
                    Upload Image
                    <input type='file' accept='images/*' className={styles.inputFile} onChange={(e) => handleChangeCover(e)}/>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className='container'>
                    <div>
                        <label className={styles.label}>Category*</label>
                        <select defaultValue={categories[0]?._id || 0} className={styles.formControl}>
                            {
                                categories.map((item, index) => {
                                    return <option value={item._id} key={index}>{item.title.toUpperCase()}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label className={styles.label}>Tags*</label>
                        <select defaultValue={tags[0]?._id || 0} className={styles.formControl}>
                            {
                                tags.map((item, index) => {
                                    return <option value={item._id} key={index}>{item.title.toUpperCase()}</option>
                                })
                            }
                        </select>
                    </div>
                    <FormGroup1 label={"Title"} required={true} value={title} onChange={(val) => {
                        if (title.length <= 100) {
                            setTitle(val);
                        }
                    }}/>
                    <p className={styles.limiter}>{title.length}/100</p>
                    <FormGroup1 label={"Short Description"} required={true} value={shortdescription} onChange={(val) => {
                        if (shortdescription.length <= 200) {
                            setShortdescription(val);
                        }
                    }}/>
                    <p className={styles.limiter}>{shortdescription.length}/200</p>
                    <Editor value={content} onChange={(val) => setContent(val)} onUploadImage={(arr) => {
                        const newContent = arr.map((item) => {
                            return `<div class="row">
                                <div class="col-12">
                                    <img src="${baseUrl2}/uploads/articles/${item}" alt="contentimage"/>
                                </div>
                            </div>`
                        }).join("");
                        setContent((prev) => prev + newContent);
                    }}/>
                    <div className={styles.btnWrapper}>
                        <button onClick={() => saveArticle()}>Save</button>
                        <button onClick={() => publishArticle()}>Publish</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WriteController