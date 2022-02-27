// "https://www.amazon.in/"
const puppeteer = require(`puppeteer`);
let input = "Ryzen 5 5500u";
/*
home screen input bar---->#twotabsearchtextbox
seacrch icon-------------->#nav-search-submit-button
list selector--------------> h2 > a
next button---------------->.s-pagination-next.s-pagination-button.s-pagination-separator
total number of pages----------------->.s-pagination-strip span:nth-child(6)
*/
(async () => {
    try {
        let browser = await puppeteer.launch({
            headless: false,
            slowMo: 50,
            defaultViewport: null,
            args: ['--start-maximized']
        })
        let page = await browser.pages()
        let cPage = page[0]
        await cPage.goto('https://www.amazon.in/');
        await cPage.waitForSelector(`#twotabsearchtextbox`);
        await cPage.type(`#twotabsearchtextbox`, input, { delay: 60 })
        await cPage.waitForSelector(`#nav-search-submit-button`);
        await cPage.click(`#nav-search-submit-button`, { delay: 70 })
        await cPage.waitForNavigation({ waitUntil: "networkidle0" })

        let value = await cPage.evaluate((s) => {
            let arr = []
            let x = document.querySelectorAll(s);
            for (let i = 0; i < x.length; i++) {
                arr.push(x[i].getAttribute('href'));
            }
            return arr
        }, `h2 > a`)
        console.log(value)
    } catch (err) {
        console.log(err)
    }

})()
