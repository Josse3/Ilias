const ParseXML = {
    metric(xml, work) {
        let relevantXML;

        if (work === 'ilias') {
            relevantXML = xml.split(/<\/?div(?: type="textpart" subtype="Book" n="[0-9][0-9]?")?>/)[1]; // Extracting XML body via RegExp
        } else if (work === 'odyssee') {
            relevantXML = xml.split(/<\/?div(?: n="[0-9]" type="textpart" subtype="book")?>/)[1];
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

        return versesObject;
    }
}

module.exports = ParseXML;