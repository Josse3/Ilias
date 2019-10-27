import React, { useState, useEffect } from 'react';
import './Toolbar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Toolbar = props => {
    const [visualPreference, setVisualPreference] = useState({}); // Tracks input of user's visual preferences
    const [inputChanged, setInputChanged] = useState(true); // Tracks whether or not the input fields have been changed since last submit
    const fontFamilies = ['sans-serif', 'EB Garamond', 'Literata'] // Font families that the user can select

    const [hamburgerShow, setHamburgerShown] = useState({
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
        </div >
    );

    return (
        <div className="toolbar">
            <div className="left">
                {left}
            </div>
            <div className="left-hamburger">
                <div className="hamburger" onClick={() => setHamburgerShown({ ...hamburgerShow, left: true })}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <div className={hamburgerShow.left ? "content" : "content shown"}>{left}</div>
            </div>
            <button onClick={fetchText} disabled={inputChanged ? false : true}>Ἀγε!</button>
            <div className="right">
                {right}
            </div>
            <div className="right-hamburger">
                <div className="hamburger"><FontAwesomeIcon icon={faBars} /></div>
                <div className="content">{right}</div>
            </div>
        </div>
    );
}

export default Toolbar;