import { useEffect, useState } from 'react';
import Post from '../Post/Post'
import styles from './ArticleListing.module.css'
import axios from 'axios';
import { apiVersion, baseUrl } from '../../data/url';
import { useSearchParams } from 'react-router-dom';
import useToast from '../../customhooks/useToast';


const ArticleListing = () => {
    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [skip, setSkip] = useState(0);
    const [categories, setCategories] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

    const categoryids = searchParams.get("cat");
    const query = searchParams.get("query")

    const makeToast = useToast();

    const updateCategoryQuery = (id) => {
        const currentParams = Object.fromEntries([...searchParams]);
        let allcategories = categoryids ? categoryids.split(",") : [];
        const idpresent = allcategories.includes(id);
        if (!idpresent) {
            allcategories.push(id);
        } else {
            const updated = allcategories.filter(item => item !== id);
            allcategories.length = 0;
            Array.prototype.push.apply(allcategories, updated);
        }
        setSearchParams({ ...currentParams, cat: allcategories.join(",") });
    }

    const updateQuery = (val) => {
        const currentParams = Object.fromEntries([...searchParams]);
        setSearchParams({ ...currentParams, query: val });
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${baseUrl}/${apiVersion}/category/public/get-categories`);
                if (res.status === 200) {
                    setCategories(res.data.categories);
                }
            } catch (error) {
                makeToast(error.status, error.response.data.message);
            }
        }
        fetchCategories();
    }, [])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res =  await axios.get(`${baseUrl}/${apiVersion}/article/public/get-articles`, {
                    params: {
                        cat: categoryids,
                        limit: 9,
                        skip: skip,
                        query: query
                    }
                });
                if (res.status === 200) {
                    setPosts(res.data.posts);
                    setPagination(res.data.pagination);
                }
            } catch (error) {
                makeToast(error.status, error.response.data.message);
            }
        }
        fetchPosts();
    }, [skip, categoryids, query])
    return (
        <div className={styles.listingSec}>
            <div className='container'>
                <div className={styles.row}>
                    <div className={styles.col1}>
                        <div className={styles.row}>
                            {
                                posts.length > 0 &&
                                posts.map((item, index) => {
                                    return (
                                        <div className={styles.col} key={index}>
                                            <Post data={item}/>
                                        </div>
                                    )
                                })
                                
                            }
                        </div>
                        <div className={styles.pagination}>
                            {pagination?.previousPage && <button className={styles.paginationBtn} onClick={() => setSkip((pagination?.previousPage - 1) * 9)}>Previous</button>}
                            {Array.from({ length: pagination?.totalPages }, (_, i) => (
                                <button key={i} onClick={() => setSkip(i * 9)} className={`${styles.paginationBtn} ${pagination?.currentPage === i + 1 ? `${styles.active}` : ""}`}>{i + 1}</button>
                            ))}
                            {pagination?.nextPage && <button onClick={() => setSkip((pagination?.nextPage - 1) * 9)} className={styles.paginationBtn}>Next</button>}
                        </div>
                    </div>
                    <div className={styles.col2}>
                        <input type='text' className={styles.search} placeholder='Search posts...' onChange={(e) => updateQuery(e.target.value)} value={query ? query : ""}/>
                        <h5 className={styles.widgetHeading}>Categories</h5>
                        {
                            categories.map((item, index) => {
                                return (
                                    <div className={styles.formCheck} key={index}>
                                        <input type='checkbox' className={styles.formInput} id={item.title} onChange={() => updateCategoryQuery(item._id)} checked={categoryids?.split(",").includes(item._id)}/>
                                        <label htmlFor={item.title} className={styles.formLabel}>{item.title}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleListing