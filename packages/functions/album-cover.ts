import { Handler } from "@netlify/functions";
import puppeteer from "puppeteer";
import chromium from "chrome-aws-lambda";

const handler: Handler = async (event, context) => {
  const { musicTitle, artistName } = event.queryStringParameters as {
    musicTitle: unknown;
    artistName: unknown;
  };

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "/usr/bin/google-chrome",
  });

  // const browser = await chromium.puppeteer.launch({
  //   executablePath: await puppeteer.executablePath,
  //   args: chromium.args,
  //   defaultViewport: chromium.defaultViewport,
  //   headless: chromium.headless,
  // });

  if (typeof musicTitle !== "string") {
    await browser.close();
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Music Title is required!",
      }),
    };
  }

  const page = await browser.newPage();
  const result = await page.goto(
    `https://google.com/search?q=${musicTitle}${
      typeof artistName === "string" ? `+${artistName}` : ""
    }`
  );

  await browser.close();

  return {
    statusCode: 200,
    body: JSON.stringify({ result }),
  };
};

export { handler };
