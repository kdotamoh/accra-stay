const puppeteer = require("puppeteer");

const scrapeTonaton = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://tonaton.com/en/ads/accra/property");
    await page.waitForSelector(".ui-item");

    const scrapedData = await page.evaluate(() => {
      const itemList = [...document.querySelectorAll(".ui-item")];
      const data = itemList.map(item => ({
        title: item.querySelector("a.item-title").innerText,
        from: "tonaton"
      }));
      return data;
    });

    await browser.close();
    return scrapedData;
  } catch (err) {
    console.log(err);
  }
};

const scrapeMeqasa = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://meqasa.com/apartments-for-rent-in-Accra");

  const scrapedData = await page.evaluate(() => {
    const itemList = [
      ...document.querySelectorAll(".mqs-featured-prop-inner-wrap")
    ];
    const data = itemList.map(item => ({
      title: item.querySelector(".mqs-prop-dt-wrapper h2 a").innerText,
      from: "meqasa"
    }));
    return data;
  });

  await browser.close();
  return scrapedData;
};

const scrapeOlx = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.olx.com.gh/houses-apartments-for-rent_c363", {
    waitUntil: "load",
    timeout: 0
  });
  await page.waitForSelector("ul[data-aut-id='itemsList']");

  const scrapedData = await page.evaluate(() => {
    const itemList = [
      ...document.querySelectorAll(
        "ul[data-aut-id='itemsList'] li[data-aut-id='itemBox']"
      )
    ];
    const data = itemList.map(item => ({
      title: item.querySelector("a div span[data-aut-id='itemTitle']")
        .innerText,
      from: "olx"
    }));
    return data;
  });

  await browser.close();
  return scrapedData;
};

const scraper = async () => {
  const listings = await Promise.all([
    scrapeOlx(),
    scrapeMeqasa(),
    scrapeTonaton()
  ]);
  return listings;
};

module.exports = scraper;
