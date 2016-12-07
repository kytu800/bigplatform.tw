var fs = require('fs');
var path = require('path');
var _ = require('lodash')
var Airtable = require('airtable');

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: ''
});

var base = Airtable.base('');
var d = [];

base('References').select({
    maxRecords: 1000,
    view: "Main View"
}).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
        if (record.get('Decline') === 'yes') return;
        d.push({
            'origin': record.get('Origin'),
            'url': record.get('Url')
        });
    });

    fetchNextPage();
}, function done(error) {
    if (error) {
        console.log(error);
    }

    d = _.uniqBy(d, 'origin');

    fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(d));
});
