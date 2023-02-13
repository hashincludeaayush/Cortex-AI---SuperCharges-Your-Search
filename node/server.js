const app = require('express')();

const hostname = '127.0.0.1';
const port = 5000;

app.get("/",(req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin','*');
  res.end('hehehe\n');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://:/`);
});
