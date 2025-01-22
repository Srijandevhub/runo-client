import styles from './FormGroup.module.css'
const FormGroup1 = ({ label, id, required, value, onChange, type = 'text' }) => {
    return (
        <div className={styles.formGroup}>
            <label className={styles.label} htmlFor={id}>{label} {required && "*"}</label>
            <input className={styles.formControl} id={id} value={value} onChange={(e) => onChange(e.target.value)} type={type}/>
        </div>
    )
}

export default FormGroup1