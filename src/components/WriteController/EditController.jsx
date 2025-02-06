import styles from './WriteController.module.css'
import Cover from '../../assets/cover.jpg'
import { useEffect, useState } from 'react'
import FormGroup1 from '../FormGroup/FormGroup1';
import Editor from './Editor';
import { apiVersion, baseUrl, baseUrl2 } from '../../data/url';
import axios from 'axios';
import useToast from '../../customhooks/useToast';
import FormCheck from '../FormGroup/FormCheck';

const EditController = ({ data }) => {
    const [coverImage, setCoverImage] = useState(`${baseUrl2}/uploads/articles/${data?.coverimage}`);
    const [coverImageFile, setCoverImageFile] = useState(null);

    const [thumbnail, setThumbnail] = useState(`${baseUrl2}/uploads/articles/${data?.thumbnail}`);
    const [thumbnailFile, setThumbnailFile] = useState(null);

    const [title, setTitle] = useState(data?.title);
    const [shortdescription, setShortdescription] = useState(data?.shortdescription);
    const [content, setContent] = useState(data?.content);
    
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState(data?.categoryid);
    const [selectedTag, setSelectedTag] = useState(data?.tagid);

    const [archived, setArchived] = useState(false);

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

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${baseUrl}/${apiVersion}/category/public/get-categories`);
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

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append("categoryid", selectedCategory);
            formData.append("tagid", selectedTag);
            formData.append("title", title);
            formData.append("shortdescription", shortdescription);
            formData.append("content", content);
            formData.append("isarchieved", archived);
            formData.append("coverimage", coverImageFile);
            formData.append("thumbnail", thumbnailFile);
            const res = await axios.put(`${baseUrl}/${apiVersion}/article/update-article/${data._id}`, formData, {
                withCredentials: true
            });
            if (res.status === 200) {
                makeToast(res.status, res.data.message);
            }
        } catch (error) {
            makeToast(error.status, error.response.data.message);
        }
    }

    useEffect(() => {
        setCoverImage(`${baseUrl2}/uploads/articles/${data?.coverimage}`);
        setThumbnail(`${baseUrl2}/uploads/articles/${data?.thumbnail}`);
        setTitle(data?.title);
        setShortdescription(data?.shortdescription);
        setContent(data?.content);
        setSelectedCategory(data?.categoryid);
        setSelectedTag(data?.tagid);
        setArchived(data?.isarchieved);
    }, [data]);

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
                        <select defaultValue={selectedCategory} className={styles.formControl} onChange={(e) => {
                            setSelectedCategory(e.target.value);
                        }}>
                            {
                                categories.map((item, index) => {
                                    return <option value={item._id} key={index}>{item.title.toUpperCase()}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label className={styles.label}>Tags*</label>
                        <select defaultValue={selectedTag} className={styles.formControl} onChange={(e) => {
                            setSelectedTag(e.target.value)
                        }}>
                            {
                                tags.map((item, index) => {
                                    return <option value={item._id} key={index}>{item.title.toUpperCase()}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className={styles.thumbnailBox}>
                        <img src={thumbnail} alt='thumnail'/>
                        <input type='file' accept='image/*' className={styles.inputFile} onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setThumbnail(reader.result);
                                }
                                reader.readAsDataURL(file);
                                setThumbnailFile(file);
                                e.target.value = null;
                            }
                        }}/>
                    </div>
                    <FormGroup1 label={"Title"} required={true} value={title} onChange={(val) => {
                        if (title.length <= 100) {
                            setTitle(val);
                        }
                    }}/>
                    <p className={styles.limiter}>{title?.length}/100</p>
                    <FormGroup1 label={"Short Description"} required={true} value={shortdescription} onChange={(val) => {
                        if (shortdescription.length <= 200) {
                            setShortdescription(val);
                        }
                    }}/>
                    <p className={styles.limiter}>{shortdescription?.length}/200</p>
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
                    <div className={styles.btnWrapper} style={{ alignItems: 'center' }}>
                        <FormCheck value={archived} onChange={(val) => setArchived(val)} label={"Is Archived"} id={"archived"}/>
                        <button onClick={() => handleUpdate()} style={{ marginBottom: "15px" }}>Update</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditController