const unflatten = require('flat').unflatten;
const parse = require('csv-parse');
const fs = require('fs');
const rdiff = require('recursive-diff');
const Confirm = require('prompt-confirm');

const importAll = (source) => {
  const data = fs.readFileSync(source).toString('utf8');
  parse(data, {
    bom: true,
    columns: false,
    delimiter: ';',
  }, (err, output) => {
    // Get headers
    let headers = output.shift();
    if (headers.shift() !== 'keys') {
      console.error('CSV format incorrect (headers).');
      process.exit(1);
    }

    // Get keys and split by language, unflatten keys
    const keys = output.map(r => r[0]);
    headers = headers.map((lang) => (lang === 'default') ? 'en' : lang);
    const languages = headers.reduce((acc, lang, index) => {
      acc[lang] = output.map(r => r[index + 1]); // +1 because of previous shift
      acc[lang] = keys.reduce((a, key, index) => {
        a[key] = acc[lang][index];
        return a;
      }, {});
      acc[lang] = unflatten(acc[lang]);
      return acc;
    }, {});

    // Check available languages
    console.log('Following languages will be overwritten from the file:', headers);
    const unknownLanguages = [];
    let existingLanguages = headers.reduce((acc, lang) => {
      acc[lang] = require(`./src/locale/lang/${lang}.json`);
      if (!acc[lang]) {
        unknownLanguages.push(lang);
      }
      return acc;
    }, {});
    if (unknownLanguages.length) {
      console.error('Unknown languages:', unknownLanguages);
      process.exit(1);
    }

    // Compare keys / values to make stats on changes
    const diff = rdiff.getDiff(existingLanguages, languages);
    const unknownKeys = diff.filter((d) => d.op === 'add');
    const missingKeys = diff.filter((d) => d.op === 'delete');
    const changedKeys = diff.filter((d) => d.op === 'update');
    if (unknownKeys.length) {
      console.warn('Some keys in the file are not (anymore) known in the application. These changes will be ignored.');
      console.log(unknownKeys.map((d) => `- Language ${d.path[0]}: ${d.path.slice(1).join('.')}`).join(',\n'));
    }
    if (missingKeys.length) {
      console.warn('Some keys in the application are missing in the file. These keys won\'t be updated.');
      console.log(missingKeys.map((d) => `- Language ${d.path[0]}: ${d.path.slice(1).join('.')}`).join(',\n'));
    }
    console.log('These updates will be applied:', changedKeys.reduce((acc, d) => {
      acc[d.path[0]] = (acc[d.path[0]] || 0) + 1;
      return acc;
    }, {}));

    // Ask to continue or abort
    new Confirm({
      name: 'continue',
      message: 'Continue and apply these changes?',
      default: false
    }).run()
    .then(function(answer) {
      if (!answer) {
        console.log('CANCELLED.');
        process.exit(0);
      }

      // Overwrite each language json file
      existingLanguages = rdiff.applyDiff(existingLanguages, changedKeys);
      Object.keys(existingLanguages).forEach((lang) => {
        const path = `./src/locale/lang/${lang}.json`;
        fs.writeFileSync(path, JSON.stringify(existingLanguages[lang], null, 2));
      });
    });
  });
};

importAll(process.argv[process.argv.length - 1] || 'translations.csv');
