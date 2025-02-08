import { useState } from 'react'
import FormGroup1 from '../FormGroup/FormGroup1'
import styles from './authForms.module.css'
import Image from '../../assets/signing.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { apiVersion, baseUrl } from '../../data/url'
import useToast from '../../customhooks/useToast'


const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("male");

    const makeToast = useToast();

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${baseUrl}/${apiVersion}/user/register`, {
                username,
                email,
                password,
                gender
            });
            makeToast(res.status, res.data.message, res.status === 200 && true, "/signin");
        } catch (error) {
            makeToast(error.status, error.response.data.message);
        }
    }

    return (
        <div className={styles.wrapper} style={{ backgroundImage: `url(${Image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <div className='container' style={{ width: "100%" }}>
                <div className={styles.formWrapper}>
                    <form className={styles.form} onSubmit={(event) => handleRegister(event)}>
                        <h1 className={styles.heading}>Register</h1>
                        <p className={styles.text}>Already have an account? <Link to="/signin">Sign in</Link></p>
                        <FormGroup1 label={"Username"} required={true} id={"username"} value={username} onChange={(value) => setUsername(value)}/>
                        <FormGroup1 label={"Email"} required={true} id={"email"} value={email} onChange={(value) => setEmail(value)} type='email'/>
                        <FormGroup1 label={"Password"} required={true} id={"password"} value={password} onChange={(value) => setPassword(value)} type='password'/>
                        <div className={styles.actions}>
                            <p className={styles.actionText}>Gender*</p>
                            <select className={styles.select} defaultValue={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <button className={styles.btn}>Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm