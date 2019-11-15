import React, { useState } from 'react';
import '../../styles/ErrorModal.css';

import Toolbar from '../Toolbar/Toolbar';
import Reader from '../Reader/Reader';

import FetchText from '../../util/FetchText';

const Metric = ({ title }) => {
    const [userInput, setUserInput] = useState({
        start: '1.1',
        amount: 10
    }); // User input, to be received from Toolbar component
    const [visualPreference, setVisualPreference] = useState({}); // User's visual preference, to be received from Toolbar component


    const [errorModalText, setErrorModalText] = useState('');
    const [loading, setLoading] = useState(false); // Boolean defining whether or not loading screen is being shown

    const [fetchedText, setFetchedText] = useState('');

    const updateUserInput = details => setUserInput({ ...userInput, [details.key]: details.value });

    const retrieveText = async start => {
        start = start ? start : userInput.start;
        // Validate input
        const verseAdressRegexp = /\b[0-9]\.[0-9]{1,3}\b/; // Matches a verse adress, e.g. 3.1 or 6.325
        if (!verseAdressRegexp.test(start)) {
            return setErrorModalText('Het beginvers dat u heeft ingevoerd is ongeldig. Probeer alstublieft opnieuw.');
        };

        if (userInput.amount >= 30) {
            return setErrorModalText('Door beperkingen van de Perseus-database is het opvragen van 30 verzen of meer niet mogelijk.');
        }

        FetchText.metric({
            start: start,
            amount: userInput.amount,
            path: title,
            setLoading,
            setFetchedText,
            onError(error) {
                setLoading(false);
                setErrorModalText(String(error));
            }
        })
    }

    const navigateBack = () => {
        if (userInput.amount < Number(userInput.start.split('.')[1])) {
            // Subtracting "amount" from current starting verse
            const newFirstVerse =
                userInput.start.split('.')[0]
                + '.'
                + (Number(userInput.start.split('.')[1]) - userInput.amount);
            setUserInput({ ...userInput, start: newFirstVerse });
            // Clearing currently displayed text
            setFetchedText('');
            retrieveText(newFirstVerse);
        }
    }

    const navigateFurther = () => {
        // Adding up "amount" to current starting verse
        const newFirstVerse =
            userInput.start.split('.')[0]
            + '.'
            + (Number(userInput.start.split('.')[1]) + userInput.amount);
        setUserInput({ ...userInput, start: newFirstVerse });
        // Clearing currently displayed text
        setFetchedText('');
        retrieveText(newFirstVerse);
    }

    return (
        <div className={title}>
            <Toolbar
                handleTextFetch={retrieveText}
                updateVisualPreference={setVisualPreference}
                updateUserInput={updateUserInput}
            />
            <Reader
                visualPreference={visualPreference}
                handleTextFetch={retrieveText}
                loading={loading}
                text={fetchedText}
                navigateBack={navigateBack}
                navigateFurther={navigateFurther}
            />
            {errorModalText && <div className="error-modal">
                {errorModalText}
                <button onClick={() => setErrorModalText('')}>OK</button>
            </div>}
        </div>
    );
}

export default Metric;