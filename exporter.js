const flatten = require('flat');
const stringify = require('csv-stringify');
const fs = require('fs');

const exportAll = (defaultLang, otherLanguages, destination) => {
    // Flatten default language, and take keys
    defaultLang = flatten(defaultLang);
    const keys = Object.keys(defaultLang);

    // Flatten other languages
    const otherLanguagesLabels = Object.keys(otherLanguages);
    otherLanguages = Object.values(otherLanguages).map((l) => flatten(l));

    // Merge all in a messy object
    let all = keys.map((k) => {
      let row = [k, defaultLang[k]];
      otherLanguages.forEach((l) => row = row.concat(l[k]));
      return row;
    });

    // Add headers
    let headers = ['keys', 'default'];
    otherLanguagesLabels.forEach((l) => headers = headers.concat(l));
    all = [headers].concat(all);

    stringify(all, {
      delimiter: ';',
      quoted: true,
      quoted_empty: true,
    }, (err, output) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      fs.writeFileSync(destination, output, { encoding: 'utf8' });
    });
};

exportAll(require('./src/locale/lang/en.json'), {
  // fr: require('./src/locale/lang/fr.json'),
  // it: require('./src/locale/lang/it.json'),
  // es: require('./src/locale/lang/es.json')
}, process.argv[process.argv.length - 1] || 'translations.csv');
