import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Toolbar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import HomeButtonImg from './home-icon-grey.png';

const Toolbar = props => {
    const [visualPreference, setVisualPreference] = useState({}); // Tracks input of user's visual preferences
    const [inputChanged, setInputChanged] = useState(true); // Tracks whether or not the input fields have been changed since last submit
    const fontFamilies = ['sans-serif', 'EB Garamond', 'Literata'] // Font families that the user can select

    const [hamburgerShown, setHamburgerShown] = useState({
        left: false,
        right: false
    }); // Tracks which hamburger menus are being shown

    const updateInput = event => {
        props.updateUserInput({ key: event.target.name, value: event.target.value });
        setInputChanged(true);
    }

    const fetchText = () => {
        props.handleTextFetch();
        setInputChanged(false);
    }

    // Update visual preference
    const { updateVisualPreference } = props;
    useEffect(() => {
        updateVisualPreference(visualPreference);
    }, [visualPreference, updateVisualPreference]);

    // Left side of the toolbar
    const left = (
        <>
            <div>
                Beginvers: <input type="text" name="start" onChange={updateInput} autoComplete="false" />
            </div>
            <div>
                Aantal verzen: <input type="number" name="amount" onChange={updateInput} autoComplete="false" />
            </div>
        </>
    );

    // Right side of toolbar
    const right = (
        <div>
            Lettertype:
            <select name="fontFamily" onChange={e => setVisualPreference({ ...visualPreference, fontFamily: e.target.value })}>
                {fontFamilies.map(fontFamily => {
                    return (
                        <option
                            value={fontFamily}
                            key={fontFamily}
                        >
                            {fontFamily}
                        </option>
                    );
                })}
            </select>
            <Link to="/">
                <img src={HomeButtonImg} alt="Home button" />
            </Link>
        </div >
    );

    return (
        <div className="toolbar">
            <div className="left">
                {left}
            </div>
            <div className="left-hamburger">
                <div className="hamburger" onClick={() => setHamburgerShown({ ...hamburgerShown, left: hamburgerShown.left ? false : true })}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <div className={hamburgerShown.left ? "content shown" : "content"}>{left}</div>
            </div>
            <button onClick={fetchText} disabled={inputChanged ? false : true}>Ἀγε!</button>
            <div className="right">
                {right}
            </div>
            <div className="right-hamburger" onClick={() => setHamburgerShown({ ...hamburgerShown, right: hamburgerShown.right ? false : true })}>
                <div className="hamburger"><FontAwesomeIcon icon={faBars} /></div>
                <div className={hamburgerShown.right ? "content shown" : "content"}> {right}</div>
            </div>
        </div>
    );
}

export default Toolbar;