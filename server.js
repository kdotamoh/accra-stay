const app = require("express")();
const scraper = require("./utils/scraper");

app.get("/", async (req, res) => {
  try {
    const listings = await scraper();
    await res.send(listings)
  } catch (err ) {
    console.log(err)
  }
});

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log("Listening");
});
