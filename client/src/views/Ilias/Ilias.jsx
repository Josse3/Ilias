import React, { useState } from 'react';
import '../../styles/ErrorModal.css';

import Toolbar from '../../components/Toolbar/Toolbar';
import Reader from '../../components/Reader/Reader';

import FetchText from '../../util/FetchText';

const Ilias = () => {
    const [userInput, setUserInput] = useState({
        start: '1.1',
        amount: 10
    }); // User input, to be received from Toolbar component
    const [visualPreference, setVisualPreference] = useState({}); // User's visual preference, to be received from Toolbar component


    const [errorModalText, setErrorModalText] = useState('');
    const [loading, setLoading] = useState(false); // Boolean defining whether or not loading screen is being shown

    const [fetchedText, setFetchedText] = useState('');

    const updateUserInput = details => setUserInput({ ...userInput, [details.key]: details.value });

    const retrieveText = async () => {
        // Validate input
        const verseAdressRegexp = /\b[0-9]\.[0-9]{1,3}\b/; // Matches a verse adress, e.g. 3.1 or 6.325
        if (!verseAdressRegexp.test(userInput.start)) {
            return setErrorModalText('Het beginvers dat u heeft ingevoerd is ongeldig. Probeer alstublieft opnieuw.');
        };

        if (userInput.amount >= 30) {
            return setErrorModalText('Door beperkingen van de Perseus-database is het opvragen van 30 verzen of meer niet mogelijk.');
        }

        FetchText.metric({
            start: userInput.start,
            amount: userInput.amount,
            path: 'ilias',
            setLoading,
            setFetchedText,
            onError(error) {
                setLoading(false);
                setErrorModalText(String(error));
            }
        })
    }

    return (
        <div className="ilias">
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
            />
            {errorModalText && <div className="error-modal">
                {errorModalText}
                <button onClick={() => setErrorModalText('')}>OK</button>
            </div>}
        </div>
    );
}

export default Ilias;