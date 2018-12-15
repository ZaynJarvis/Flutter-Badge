const express = require("express");
const rp = require("request-promise");
const $ = require("cheerio");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/version/:name", async (req, res) => {
  const svg = await rp(`https://img.shields.io/pub/v/${req.params.name}.svg`);
  res.writeHead(200, { "content-type": "image/svg+xml" });
  res.end(svg);
});

app.get("/score/:name", async (req, res) => {
  const html = await rp(`https://pub.dartlang.org/packages/${req.params.name}`);

  $(".score-box > .number", html).each(async function() {
    const badge = await rp(
      `https://img.shields.io/badge/pub.score-${$(this).text()}-blue.svg`
    );
    res.writeHead(200, { "content-type": "image/svg+xml" });
    res.end(badge);
  });
});

app.listen(80);
