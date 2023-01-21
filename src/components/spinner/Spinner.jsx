import styles from "./Spinner.module.scss";

export default function Spinner() {
    return (
        <div className={styles.loadingSpinnerContainer}>
            <div className={styles.loadingSpinner}></div>
        </div>
    );
}
