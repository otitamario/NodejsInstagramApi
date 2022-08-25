const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const BASE_URL = 'https://instagram.com/';
const USERNAME_URL = (username) => `https://instagram.com/${username}`;


let browser = null;
let page = null;

const instagram = {

    initialize: async () => {
        
        browser = await puppeteer.launch({
            headless: false
        });

        page = await browser.newPage();

        await page.goto(BASE_URL);
        

    },

    login: async (username, password) => {
        
        browser = await puppeteer.launch({
            headless: false
        });

        page = await browser.newPage();

        await page.goto(BASE_URL);
        
        await page.waitFor('input[name="username"]');
        await page.type('input[name="username"]', username, {delay: 25});
        await page.type('input[name="password"]', password, {delay: 25});
        await page.click('#loginForm > div > div:nth-child(3) > button > div');
        await page.waitFor(500);
        
 
    },


    getUser: async (username) => {

       await page.goto(USERNAME_URL(username));
       
       const content = await page.content();
       
     /*  let instagram_data={
           followers: content.
           followinf:
       }
       */
       
       
    
     
      //await browser.close();
    
      /* Output the data */
       //console.log(user);

        return content;

    },

    end: async () => {
        await browser.close();
    }

};

module.exports = instagram;