const app = require("express")();
const scraper = require("./utils/scraper");

app.get("/", (req, res) => {
  const text = new Promise((resolve, reject) => {
    scraper().then(data => {
      resolve(data)
    })
    .catch(err => reject('Scrape failed bruh'))
  })
  text.then((data) => res.send(data))
});

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log("Listening");
});
