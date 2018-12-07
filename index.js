const express = require("express");
const rp = require("request-promise");
const $ = require("cheerio");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});
app.get("/version/:name", async (req, res) => {
  const html = await rp(`https://img.shields.io/pub/v/${req.params.name}.svg`);
  res.send(html);
});

app.get("/score/:name", async (req, res) => {
  const html = await rp(`https://pub.dartlang.org/packages/${req.params.name}`);

  $(".score-box > .number", html).each(async function() {
    const badge = await rp(
      `https://img.shields.io/badge/pub.score-${$(this).text()}-blue.svg`
    );
    res.send(badge);
  });
});

app.listen(80);
