import styles from './MyProfile.module.css'
import Cover from '../../assets/cover.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { baseUrl2 } from '../../data/url'
import { useState } from 'react'
import FormGroup1 from '../FormGroup/FormGroup1'
import { removeCoverImage, removeProfileImage, updateCoverImage, updateProfileImage, updateUserInfo } from '../../utils/userSlice'

const MyProfile = () => {
    const user = useSelector((state) => state.user.data);

    const [firstname, setFirstname] = useState(user?.firstname);
    const [lastname, setLastname] = useState(user?.lastname);
    const [email, setEmail] = useState(user?.email);
    const [phonecode, setPhonecode] = useState(user?.phonecode);
    const [phonenumber, setPhonenumber] = useState(user?.phonenumber);
    const [bio, setBio] = useState(user?.bio);
    const [shortdescription, setShortdescription] = useState(user?.shortdescription);

    const dispatch = useDispatch();

    return (
        <>
            <div className={styles.profileCover} style={{ backgroundImage: `url(${user?.coverimage
 ? `${baseUrl2}/uploads/users/${user.coverimage}` : Cover})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                {
                    user?.coverimage ?
                    <>
                        <div className={styles.uploadImage}>
                            Change Image
                            <input type='file' accept='images/*' className={styles.inputFile} onChange={(e) => {
                                const formData = new FormData();
                                formData.append("coverimage", e.target.files[0]);
                                dispatch(updateCoverImage(formData));
                            }}/>
                        </div>
                        <button className={styles.removeImage} onClick={() => {
                            dispatch(removeCoverImage());
                        }}>
                            Remove Cover
                        </button>
                    </>
                    :
                    <div className={styles.uploadImage}>
                        Upload Image
                        <input type='file' accept='images/*' className={styles.inputFile} onChange={(e) => {
                                const formData = new FormData();
                                formData.append("coverimage", e.target.files[0]);
                                dispatch(updateCoverImage(formData));
                            }}/>
                    </div>
                }
            </div>
            <div className={styles.profileImageWrapper}>
                <div className='container'>
                    <div className={styles.profileImage} style={{ backgroundImage: `url(${baseUrl2}/uploads/users/${user.profileimage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        <input type='file' accept='image/*' className={styles.inputFile} onChange={(e) => {
                            const formData = new FormData();
                            formData.append("profileimage", e.target.files[0]);
                            dispatch(updateProfileImage(formData));
                            e.target.value = null;
                        }}/>
                    </div>
                    {
                        user?.profileImage &&
                        <button className={styles.removeImage} onClick={() => {
                            dispatch(removeProfileImage());
                        }}>
                            Remove Profile Image
                        </button>
                    }
                </div>
            </div>
            <div className={styles.formWrapper}>
                <div className='container'>
                    <div className={styles.row}>
                        <div className={styles.col6}>
                            <FormGroup1 label={"Firstname"} required={true} id={"firstname"} value={firstname} onChange={(value) => setFirstname(value)}/>
                        </div>
                        <div className={styles.col6}>
                            <FormGroup1 label={"Lastname"} required={true} id={"lastname"} value={lastname} onChange={(value) => setLastname(value)}/>
                        </div>
                        <div className={styles.col6}>
                            <FormGroup1 label={"Email"} required={true} id={"email"} value={email} onChange={(value) => setEmail(value)}/>
                        </div>
                        <div className={styles.col6}>
                            <FormGroup1 label={"Phonecode"} required={true} id={"phonecode"} value={phonecode} onChange={(value) => setPhonecode(value)}/>
                        </div>
                        <div className={styles.col6}>
                            <FormGroup1 label={"Phonenumber"} required={true} id={"phonenumber"} value={phonenumber} onChange={(value) => setPhonenumber(value)}/>
                        </div>
                        <div className={styles.col6}>
                            <FormGroup1 label={"Bio"} required={true} id={"bio"} value={bio} onChange={(value) => setBio(value)}/>
                        </div>
                        <div className={styles.col6}>
                            <FormGroup1 label={"Short Description"} required={true} id={"sh"} value={shortdescription} onChange={(value) => setShortdescription(value)}/>
                        </div>
                        <button className={styles.btn} onClick={() => {
                            dispatch(updateUserInfo({ firstname, lastname, email, phonecode, phonenumber, bio, shortdescription }));
                        }}>Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile