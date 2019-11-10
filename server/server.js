const express = require('express');
const app = express();
const router = express.Router();
const fetch = require('node-fetch');
// util
const ParseXML = require('./util/ParseXML');

router.get('/ilias', (req, res) => {
    const start = decodeURIComponent(req.query.start);
    // Get last verse
    const firstVerseNumber = Number(start.split('.')[1]); // Extracts verse line from user input as a number
    const lastVerseNumber = firstVerseNumber + Number(req.query.amount); // Forms last verse as a number
    const end = Number(start.split('.')[0]) + '.' + lastVerseNumber; // Constructs last verse line adress
    fetch(`https://scaife.perseus.org/library/passage/urn:cts:greekLit:tlg0012.tlg001.perseus-grc2:${start}-${end}/xml/`)
        .then(response => response.text())
        .then(textResponse => res.send({
            success: true,
            body: ParseXML.metric(textResponse, "ilias")
        }))
        .catch(() => {
            res.status(500).send({
                success: false,
                errorMessage: 'De tekst kon niet opgevraagd worden van Perseus. Dit probleem ligt aan Perseus zelf en kan alleen door hen opgelost worden.'
            });
        });
});

router.get('/odyssee', (req, res) => {
    const start = decodeURIComponent(req.query.start);
    const end = decodeURIComponent(req.query.end);
    fetch(`https://scaife.perseus.org/library/passage/urn:cts:greekLit:tlg0012.tlg002.perseus-grc2:${start}-${end}/xml/`)
        .then(response => {
            if (!response.ok) throw Error('Failed fetching text from Perseus.');
            return response.text();
        })
        .then(textResponse => res.send(ParseXML.metric(textResponse, "odyssee")));
})

app.use('/', router); // For production
app.use('/grieks', router);

app.listen(2040, err => {
    if (err) throw err;
})