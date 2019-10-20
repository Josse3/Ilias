import React, { useState, useEffect } from 'react';
import './Reader.css';

const Reader = props => {
    const [textContent, setTextContent] = useState({});
    const [errorModalText, setErrorModalText] = useState('');

    const retrieveText = () => {
        // Validate input
        const verseAdressRegexp = /\b[0-9]\.[0-9]{1,3}\b/; // Matches a verse adress, e.g. 3.1 or 6.325
        if (!verseAdressRegexp.test(props.userInput.start)) {
            return setErrorModalText('De beginvers die u heeft ingevoerd is ongeldig. Probeer alstublieft opnieuw.');
        }

        // Get last verse
        const firstVerseNumber = Number(props.userInput.start.split('.')[1]); // Extracts verse line from user input as a number
        const lastVerseNumber = firstVerseNumber + Number(props.userInput.amount); // Forms last verse as a number
        const lastVerse = Number(props.userInput.start.split('.')[0]) + '.' + lastVerseNumber; // Constructs last verse line adress

        // Fetch call
        const queryUrl = `https://scaife.perseus.org/library/passage/urn:cts:greekLit:tlg0012.tlg001.perseus-grc2:${props.userInput.start}-${lastVerse}/xml/`;
        fetch(`http://cors-anywhere.herokuapp.com/${queryUrl}`, { origin: 'https://scaife.perseus.org' }) // Fetching data via a cors-anywhere website
            .then(response => {
                if (!response.ok) throw Error('Failed fetching text from Perseus.');
                return response.text();
            })
            .then(textResponse => {
                const relevantXML = textResponse.split(/<\/?div(?: type="textpart" subtype="Book" n="[0-9][0-9]?")?>/)[1]; // Extracting XML body via RegExp
                const versesXML = relevantXML
                    .replace(/<\/?q>/g, '') // Delete <q> and </q> elements
                    .replace(/<milestone.{1,40}\/>/g, ''); // Delete <milestone> tags
                // Parse received XML into object
                const versesObject = {};
                versesXML.split('</l>').forEach(verse => {
                    const verseArray = verse.replace('<l n="', '').replace('"', '').split('>');
                    const verseNumber = verseArray[0];
                    if (verseNumber !== '') {
                        versesObject[verseNumber] = verseArray[1];
                    }
                });

                setTextContent(versesObject);
            });
    }

    // Query whenever user input is received
    useEffect(() => {
        if (Object.keys(props.userInput).length) {
            retrieveText();
        }
    }, [props.userInput]);

    return (
        <div className="reader">
            {errorModalText && <div className="error-modal">
                {errorModalText}
                <button onClick={() => setErrorModalText('')}>OK</button>
            </div>}
            <div className="text-content">
                {Object.entries(textContent).map(([number, verse]) => {
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