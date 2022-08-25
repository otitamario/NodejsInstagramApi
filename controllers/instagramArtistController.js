//const express = require("express");
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const instagram = require('../src/instagram')


async function artist_detail(req, res, next) {
  const artist_id = req.query.id;
  if (typeof artist_id == "undefined") {
    res.status(202).send("Envie o id do artista!");
    return next("Envie o id do artista!");
  }
  console.log("artist_id", artist_id);

  
  try {
    
  
   // const USERNAME_LOGIN = 'ultimatebot_stat';
    //const PASSWORD = '@redes#sociais';
  
    
    const USERNAME_LOGIN = 'top.bots';
    const PASSWORD = ';;20+ig+rico+21;;';
  


   const browser = await puppeteer.launch({
      headless: false
  });
  const page = await browser.newPage();
  //const BASE_URL='https://instagram.com/';
  const BASE_URL='https://instagram.com/accounts/login/';
  await page.goto(BASE_URL, {
    waitUntil: 'networkidle0',
  });
  
  await page.waitFor('input[name="username"]');
  await page.type('input[name="username"]', USERNAME_LOGIN);
  await page.type('input[name="password"]', PASSWORD);
  //await page.waitFor(1000);
  await page.waitForSelector('#loginForm > div > div:nth-child(3) > button > div', {
    visible: false,
  });
  await page.click('#loginForm > div > div:nth-child(3) > button > div');
        
  await page.waitForNavigation({
    waitUntil: 'networkidle0',
  });

  await page.waitForSelector('#react-root > section > main > div > div > div > section > div > button', {
    visible: false,
  });
  

  await page.click('#react-root > section > main > div > div > div > section > div > button');
  

  await page.waitForSelector('body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.bIiDR', {
    visible: false,
  });
  

  await page.click('body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.bIiDR');
 
/*
  await page.waitForNavigation({
    waitUntil: 'networkidle0',
  });
*/
  const USERNAME_URL = (username) => `https://instagram.com/${username}/?__a=1`;
    
  //await page.goto(USERNAME_URL(artist_id));
   
  await page.goto(USERNAME_URL(artist_id), {
    waitUntil: 'networkidle0',
  });
  

  /*await page.waitForNavigation({
    waitUntil: 'networkidle0',
  });*/
 // #react-root > section > main > div > div > div > section > div > button

  

    let details = await page.content();
    //console.log(details);  
    let $= cheerio.load(details);
    //let script= $('script[type="text/javascript"]').eq(3).html();
    let script= $('pre').html();
    
    //console.log(script);
    //let script_regex=/window._sharedData = (.+);/g.exec(script);
    //console.log(script_regex);
    
    let { graphql: { user } } = JSON.parse(script);
    //let user=JSON.parse(script).graphql.user;
    console.log(user);
    let instagram_data={
        followers: user.edge_followed_by.count,
        following: user.edge_follow.count,
        uploads:user.edge_owner_to_timeline_media.count,
        full_name: user.full_name,
        picture_url: user.profile_pic_url_hd 
    } 
    console.log(instagram_data);
  
  await page.waitFor(500);
  await browser.close();

  res.send(instagram_data);
  //res.send('ok');


} catch (err) {
    // Handle Error Here
    console.error(err);
    res.status(202).send("-1");
  }
}

module.exports.artist_detail = artist_detail;
