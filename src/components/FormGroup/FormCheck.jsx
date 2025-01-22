import styles from './FormGroup.module.css'
const FormCheck = ({ label, id, type = "checkbox", name, value, onChange }) => {
    return (
        <div className={styles.formCheck}>
            <input type={type} name={name} id={id} className={styles.formCheckInput} checked={value} onChange={(e) => onChange(e.target.checked)}/>
            <label htmlFor={id} className={styles.formCheckLabel}>{label}</label>
        </div>
    )
}

export default FormCheck