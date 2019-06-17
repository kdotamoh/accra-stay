const puppeteer = require("puppeteer");

const scraper = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://tonaton.com/en/ads/accra/property");
    await page.waitForSelector(".ui-item");

    const scrapedData = await page.evaluate(() => {
      const itemList = [...document.querySelectorAll(".ui-item")];
      const data = itemList.map(item => ({
        title: item.querySelector("a.item-title").innerText
      }));
      return data;
    });

    await browser.close();
    return scrapedData;
  } catch (err) {
    console.log(err);
  }
};

module.exports = scraper;
