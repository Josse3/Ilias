import React from 'react';
import './Reader.css';

import Spinner from './Spinner/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

const Reader = props => {
    const navButtons = (
        <div className="nav-buttons">
            <button onClick={props.navigateBack}><FontAwesomeIcon icon={faArrowCircleLeft} /></button>
            <button onClick={props.navigateFurther}><FontAwesomeIcon icon={faArrowCircleRight} /></button>
        </div>
    )
    return (
        <div className="reader">
            <div className="text-content">
                {props.loading && <Spinner />}
                {props.text && navButtons}
                {Object.entries(props.text).map(([number, verse]) => {
                    return (
                        <div className="lemma" key={number}>
                            <p>{number}</p>
                            <p style={{ fontFamily: props.visualPreference.fontFamily }}>{verse}</p>
                        </div>
                    )
                })}
                {props.text && navButtons}
            </div>
        </div>
    )
}

export default Reader;