const express = require('express');
const app = express();
const fetch = require('node-fetch');

const router = express.Router();

router.get('/perseus', (req, res) => {
    const start = decodeURIComponent(req.query.start);
    const end = decodeURIComponent(req.query.end);
    fetch(`https://scaife.perseus.org/library/passage/urn:cts:greekLit:tlg0012.tlg001.perseus-grc2:${start}-${end}/xml/`)
        .then(response => {
            if (!response.ok) throw Error('Failed fetching text from Perseus.');
            return response.text();
        })
        .then(textResponse => res.send(textResponse))
});

app.use('/ilias', router);

app.listen(2020, err => {
    if (err) throw err;
})