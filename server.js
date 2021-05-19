const { createServer } = require('http')
const { parse } = require("url");
const next = require('next')
const routes = require('./routes');

const port = parseInt(process.env.PORT, 10) || 443;
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
// const handler = routes.getRequestHandler(app)
const handle = routes.getRequestHandler(app);

app.prepare()
  .then(() => {
    createServer((req, res) => { 
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;
      
      if (pathname === "/a") {
        app.render(req, res, "/b", query);
      } else if (pathname === "/b") {
        app.render(req, res, "/a", query);
      } else {
        handle(req, res, parsedUrl);
      }
    }).listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
      })
  });
  