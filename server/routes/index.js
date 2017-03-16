const express = require('express');
const http    = require('http');
const cors    = require('cors');

const router = express.Router();

const CrawlerClss = require('../classes/crawler');

// --------------------------------------------------------------------
// Index Routes
// --------------------------------------------------------------------

router.get('/', (req, res) => {
  res.render('index.html');
});

// --------------------------------------------------------------------
// Api Routes
// --------------------------------------------------------------------

router.get('/api/home', cors(), (req, res) => {

  let foo = new CrawlerClss;

  foo.getLinks().then((a, b) => {

    let bar = a.filter((item, i) => {
      return item.urls.length > 0;
    });

    res.json(bar);

  }).catch(() => {
    console.log('error');
  });

});

module.exports = router;
