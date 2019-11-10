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
        fetch(`/grieks/${path}?start=${start}&end=${end}`)
            .then(response => {
                if (!response.ok) throw Error('Failed connecting to backend.');
                return response.json();
            })
            .then(jsonResponse => {
                setLoading(false);
                setFetchedText(jsonResponse);
            });
    }
}

export default FetchText;