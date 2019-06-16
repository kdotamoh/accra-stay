const puppeteer = require("puppeteer");

const scraper = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.delprintsol.com");

  const scrapedData = await page.evaluate(() => {
    let text = document.querySelector(".hero-text").innerText;
    return { text };
  });

  await browser.close();
  return scrapedData;
};

module.exports = scraper;
