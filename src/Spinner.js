import React from 'react';
import styles from './Spinner.module.scss';


function Spinner(props) {
    return (
        <div className={styles.Loader}>Loading...</div>
    );
}

export default Spinner;