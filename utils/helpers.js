const Handlebars = require('handlebars');

Handlebars.registerHelper('dateFormat', function (date, format) {
  const dateObject = new Date(date);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };

  if (format === 'long') {
    options.month = 'long';
  }

  return dateObject.toLocaleDateString('en-US', options);
});
