import { useState } from 'react'
import FormGroup1 from '../FormGroup/FormGroup1'
import styles from './authForms.module.css'
import Image from '../../assets/signing.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { apiVersion, baseUrl } from '../../data/url'
import useToast from '../../customhooks/useToast'
import FormCheck from '../FormGroup/FormCheck'


const LoginForm = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [rememberme, setRememberme] = useState(false);
    const makeToast = useToast();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${baseUrl}/${apiVersion}/user/login`, {
                identifier,
                password,
                rememberme
            }, { withCredentials: true });
            makeToast(res.status, res.message, res.status === 200 && true, "/");
        } catch (error) {
            makeToast(error.status, error.response.data.message);
        }
    }

    return (
        <div className={styles.wrapper} style={{ backgroundImage: `url(${Image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <div className='container' style={{ width: "100%" }}>
                <div className={styles.formWrapper}>
                    <form className={styles.form} onSubmit={(event) => handleLogin(event)}>
                        <h1 className={styles.heading}>Login</h1>
                        <p className={styles.text}>Don't have an account? <Link to="/signup">Sign up</Link></p>
                        <FormGroup1 label={"Username or Email"} required={true} id={"username"} value={identifier} onChange={(value) => setIdentifier(value)}/>
                        <FormGroup1 label={"Password"} required={true} id={"password"} value={password} onChange={(value) => setPassword(value)} type='password'/>
                        <FormCheck label={"Remember Me"} id={"rememberme"} value={rememberme} onChange={(value) => setRememberme(value)}/>
                        <button className={styles.btn}>Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm