const FetchText = {
    metric({ start, amount, path, setLoading, setFetchedText, onError }) {
        // Fetch call
        setLoading(true);
        start = encodeURIComponent(start);
        fetch(`/grieks/${path}?start=${start}&amount=${amount}`)
            .then(response => {
                return response.json();
            })
            .then(jsonResponse => {
                if (!jsonResponse.success) {
                    return onError(jsonResponse.errorMessage);
                }
                setLoading(false);
                setFetchedText(jsonResponse.body);
            })
            .catch(() => {
                onError("De verbinding met de server mislukte, probeer alstublieft later opnieuw.");
            });
    }
}

export default FetchText;