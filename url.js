const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const validUrl = require("valid-url");
const Url = require("../models/Url");

const BASE_URL = "http://localhost:5000";

// Create short URL
router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;

  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json("Invalid URL");
  }

  try {
    let url = await Url.findOne({ originalUrl });

    if (url) {
      return res.json(url);
    } else {
      const shortCode = shortid.generate();
      const shortUrl = `${BASE_URL}/${shortCode}`;

      url = new Url({
        originalUrl,
        shortCode,
        shortUrl
      });

      await url.save();
      res.json(url);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

// Redirect
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });

    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json("No URL found");
    }
  } catch (err) {
    res.status(500).json("Server error");
  }
});

module.exports = router;