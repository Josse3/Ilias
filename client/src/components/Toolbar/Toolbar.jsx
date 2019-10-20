import React, { useState, useEffect } from 'react';
import './Toolbar.css';

const Toolbar = props => {
    const [userInput, setUserInput] = useState({
        start: '1.1',
        amount: 10
    }); // Tracks input field input of verse numbers
    const [visualPreference, setVisualPreference] = useState({}); // Tracks input of user's visual preferences
    const [inputChanged, setInputChanged] = useState(false); // Tracks whether or not the input fields have been changed since last submit
    const fontFamilies = ['sans-serif', 'EB Garamond', 'Literata'] // Font families that the user can select

    const updateInput = event => {
        setUserInput({ ...userInput, [event.target.name]: event.target.value });
        setInputChanged(true);
    }

    const sendVerseDataUpwards = () => {
        props.transportUserInput(userInput);
        setInputChanged(false);
    }

    // Update visual preference
    useEffect(() => {
        props.updateVisualPreference(visualPreference);
    }, [visualPreference])

    return (
        <div className="toolbar">
            <div className="left">
                <div>
                    Beginvers: <input type="text" name="start" onChange={updateInput} autoComplete="false" />
                </div>
                <div>
                    Aantal verzen: <input type="number" name="amount" onChange={updateInput} autoComplete="false" />
                </div>
            </div>
            <button onClick={sendVerseDataUpwards} disabled={inputChanged ? false : true}>Ἀγε!</button>
            <div className="right">
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
                </div>
            </div>
        </div>
    );
}

export default Toolbar;