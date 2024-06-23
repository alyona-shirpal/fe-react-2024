import styles from './loader.module.css';

export const Loader = () => (
    <div className={styles.loaderWrap}>
        <div className={styles.ldSpinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
);
