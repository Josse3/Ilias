const FetchText = {
    metric({ start, amount, path, setLoading, setFetchedText }) {
        // Fetch call
        setLoading(true);
        start = encodeURIComponent(start);
        fetch(`/grieks/${path}?start=${start}&amount=${amount}`)
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