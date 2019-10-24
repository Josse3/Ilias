const FetchText = {
    metric({ start, amount, path, setLoading, setFetchedText }) {
        // Get last verse
        const firstVerseNumber = Number(start.split('.')[1]); // Extracts verse line from user input as a number
        const lastVerseNumber = firstVerseNumber + Number(amount); // Forms last verse as a number
        const lastVerse = Number(start.split('.')[0]) + '.' + lastVerseNumber; // Constructs last verse line adress

        // Fetch call
        setLoading(true);
        start = encodeURIComponent(start);
        const end = encodeURIComponent(lastVerse);
        fetch(`/grieks/perseus/${path}?start=${start}&end=${end}`)
            .then(response => {
                if (!response.ok) throw Error('Failed fetching text from Perseus.');
                return response.text();
            })
            .then(textResponse => {
                setLoading(false);
                let relevantXML;

                if (path === 'ilias') {
                    relevantXML = textResponse.split(/<\/?div(?: type="textpart" subtype="Book" n="[0-9][0-9]?")?>/)[1]; // Extracting XML body via RegExp
                } else if (path === 'odyssee') {
                    relevantXML = textResponse.split(/<\/?div(?: n="[0-9]" type="textpart" subtype="book")?>/)[1];
                }

                const versesXML = relevantXML
                    .replace(/<\/?q>/g, '') // Delete <q> and </q> elements
                    .replace(/<q type="unspecified">/, '') // Delete <q type="unspecified">-elements
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

                setFetchedText(versesObject);
            });
    }
}

export default FetchText;