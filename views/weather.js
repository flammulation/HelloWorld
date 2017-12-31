var https = require('https');
var options = {
  host: 'www.ncdc.noaa.gov',
  port: 80,
  path: '/cdo-web/api/v2/',
  method: 'GET',
  headers : { token: 'owJENFdfCZwPsshGEvpAxUddCsPXWyqP' }
};

http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    process.stdout.write(chunk);
    console.log('BODY: ' + chunk);
  });
}).end();
