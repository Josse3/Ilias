import React, { useState, useEffect } from 'react';
import './Reader.css';

import Spinner from './Spinner/Spinner';

const Reader = props => {
    return (
        <div className="reader">
            <div className="text-content">
                {props.loading && <Spinner />}
                {Object.entries(props.text).map(([number, verse]) => {
                    return (
                        <div className="lemma" key={number}>
                            <p>{number}</p>
                            <p style={{ fontFamily: props.visualPreference.fontFamily }}>{verse}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Reader;