// latestCarSnitcher.js
/**
 * Copyright © Kipras Melnikovas (https://kipras.org) <kipras@kipras.org>
 */

/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");
const pluginStealth = require('puppeteer-extra-plugin-stealth')

const solve = require("./recaptcha.js");

const url = "https://www.vaurioajoneuvo.fi";
const urlLogin = "https://www.vaurioajoneuvo.fi/kayttajalle/kirjaudu-sisaan/";
const urlCaptcha = "https://www.vaurioajoneuvo.fi/captcha/";
const recentlyAddedVehiclesUrl = "https://www.vaurioajoneuvo.fi/?mod=vehicle&act=lastest";

/**
 * @type {puppeteer.WaitForSelectorOptions}
 *
 * TODO - actually skip the current element if the waiting failed
 * See https://github.com/sarpik/snitch-latest-car/issues/16
 */
const pageWaitForSelectorOptions = {
	timeout: 1000 * 5 /** wait a maximum of 5 seconds before cancelling */,
};

/**
 * Workflow:
 *
 * 0. launch the browser
 * 1. go to the main url
 * 2. authenticate
 * 3. go to the "latest updated cars" page
 * 4. start looping infinitely
 * 4.1 keep track of previously & currently available cars
 * 4.2 refresh the page until a newer car/cars with different IDs appear
 * 4.3 for each newly detected car:
 * 4.3.1 scroll down to the bottom of the newer car info page
 * 4.3.2 click the "buy now" button to navigate to another page
 * 4.3.5 click on the input field for "identification number"
 * 4.3.6 paste the identification number (always the same)
 * 4.3.7 click "continue shopping" - the car is reserved for 5 minutes
 * 4.3.8 click "go back"
 * 4.3.9? notify the user that we've snitched something
 * 4.4 repeat - go to step 4.
 *
 * NOTE
 * if a selector does not work, make sure it's unique
 * if it's not, use the full xpath instead.
 *
 * @returns {Promise<never>}
 */
// export const latestCarSnitcher = async () => {
const latestCarSnitcher = async () => {
	/** @type {import("./config" )} */
	const config = getConfig();
	const executablePath = getExecutablePath();

	var oldCars = new Array(config.howManyLatestCarsToWatch);
	var oldCarsPrice = new Array(config.howManyLatestCarsToWatch);
	var oldCarsHref = new Array(config.howManyLatestCarsToWatch);
	var oldX = 0;

	var cars = new Array(config.howManyLatestCarsToWatch);
	var carsPrice = new Array(config.howManyLatestCarsToWatch);
	var carsHref = new Array(config.howManyLatestCarsToWatch);
	var x = 0;

	const width = 1150;
    const height = 1000;

	const browser = await puppeteer.launch({
		executablePath: executablePath,
		headless: config.headless,
		args: ['--window-size=1150,1000','--no-sandbox', '--disable-dev-shm-usage', '--disable-web-security', '--disable-features=site-per-process'],
		defaultViewport: {
            width,
            height
        }
	});

	const page = await browser.newPage();
	//await page.setViewport({'1150', '1000'});
	await page.goto(urlLogin, {
		waitUntil: 'networkidle0',
	  });

	await authenticate(page, config.username, config.password);

	//await page.goto(urlCaptcha);
	//puppeteer.use(pluginStealth())
	/*solve(page);*/

	await page.goto(url, {
		waitUntil: 'networkidle0',
	  });
	
	var boolean = false;

	/*while(true)
	{
		const url1 = await page.url();

		console.log("Page URL : "+url1); 
		//await page.waitFor(100);
		await page.waitForTimeout(1);
	}*/

	while(true)
	{
		await page.goto(url);
		//break;
	}
	//await page.$$eval('[data-auction-id="21993"]', el => el.map(x => x.setAttribute("target", "_blank")));

	/*const link = await page.$('[data-auction-id="21993"]');
	const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
	await link.click({button: 'middle'});
	const page2 = await newPagePromise;
	await page2.reload();
	await page2.bringToFront();
	await page2.click('[type="submit"]');
	//await page2.waitForSelector('[type="submit"]'); 
	//await page2.click('.single-item > .row > .col-md-12 > .info > .info-footer > .row > .col-md-6 > .info-footer-buy > .inner-helper > .ajax-form > .button-buy');
	
	await page.bringToFront();
	const link = await page.$('[data-auction-id="21961"]');
	const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
	await link.click({button: 'middle'});
	const page2 = await newPagePromise;
	await page2.reload();
	await page2.bringToFront();
	await page2.click('[type="submit"]');*/

	

	/*reserveCar(page, browser, 'https://www.vaurioajoneuvo.fi/tuote/seat-alhambra-monikayttoajoneuvo-af-4ov-1968cm3-a-otp-254/');
	reserveCar(page, browser, 'https://www.vaurioajoneuvo.fi/tuote/bmw-318d-sedan-aa-1990cm3-ygu-293/');*/
	
	/*while(true)
	{
		await page.reload();
		if(page.url() == urlCaptcha)
		{
			//solve
		}else if(page.url() == url)
		{

		}
	}*/

	//await page.goto(urlLogin);

	//await page.goto(urlCaptcha);

	//await authenticate(page, config.username, config.password);
	//const html = await page.$eval('body', e => e.outerHTML);
	//console.log(html);

	//await page.goto(url);
	//await page.click(".content > .button");
	
	//await page.click('[type="submit"]')

	//console.log(page);
	//await page.click(".button");

	/*var inputs = page.getElementsByTagName("data-auction-id");
	console.log(inputs);*/


	
	
	
	/*console.log(newList.x);

	for (var i = 0; i < x; i++) {
		console.log(cars[i]);
		console.log(carsPrice[i]);
		console.log(carsHref[i]);
		reserveCar(page, browser, carsHref[i]);
	}*/


	//await page.click('[data-auction-id="21993"]');
};


/**
 * wrapped into an `eval` so that it's not included in the binary
 * & thus a `config.js` file must be provided
 * when using the executable,
 * which is what we wanted in the first place - customisability
 *
 * @returns {import("./config" )}
 */
function getConfig() {
	// // const configFilePath = path.join(__dirname, "config.js");
	const configFilePath = "config.js";

	const configFile = fs.readFileSync(configFilePath, { encoding: "utf-8" });

	/** @type {import("./config") } */
	const config = eval(configFile);

	// // const config = require("./config");

	return config;
}

/**
 * see https://github.com/zeit/pkg/issues/204#issuecomment-536323464
 *
 * @returns {string}
 */
function getExecutablePath() {
	const executablePath =
		process.env.PUPPETEER_EXECUTABLE_PATH ||
		(process.pkg
			? path.join(
					path.dirname(process.execPath),
					"puppeteer",
					...puppeteer
						.executablePath()
						.split(path.sep)
						.slice(6) // /snapshot/project/node_modules/puppeteer/.local-chromium
			  )
			: puppeteer.executablePath());

	return executablePath;
}

/**
 * @param {puppeteer.Page} page
 * @param {string} username
 * @param {string} password
 *
 * @returns {Promise<void>}
 */
async function authenticate(page, username, password) {
	const usernameSelector = "#username";
	const passwordSelector = "#password";
	const submitSelector = ".login";

	// // await page.$eval(usernameSelector, (element) => {
	// // 	console.log("element", element);
	// // 	element.value = username;
	// // });

	await page.focus(usernameSelector);
	await page.keyboard.type(username);

	await page.focus(passwordSelector);
	await page.keyboard.type(password);

	await page.click(submitSelector);
	//await page.click(".button");
	
}

/**
 * @param {puppeteer.Page} page
 * @param {number} [howMany=1]
 *
 * @returns {Promise<number[]>}
 */
async function getIdsOfLatestVehicles(page, howMany = 1) {
	/**
	 * @NOTE this is an `id`, but it's **not** unique
	 * & they use it like a `class`
	 */
	const aHrefXPath = '//*[@id="vehdetail"]/a';

	/** @type {puppeteer.ElementHandle<Element>[]} */
	const vehicleHrefElements = await (await page.$x(aHrefXPath)).splice(0, howMany);

	/** @type {number[]} */
	const vehicleIds = await Promise.all(
		vehicleHrefElements.map(async (vehicleHrefElement) => {
			const onclickHandlerProperty = await vehicleHrefElement.getProperty("onclick");
			const onclickHandlerValue = getOnClickHandlerValue(onclickHandlerProperty);
			const currentVehicleId = parseVehicleIDFromOnclick(onclickHandlerValue);

			return currentVehicleId;
		})
	);

	return vehicleIds;
}

/**
 * @param {puppeteer.JSHandle<any>} onclickHandlerProperty
 *
 * @returns {string}
 */
function getOnClickHandlerValue(onclickHandlerProperty) {
	/** @type {string} */
	const valueStr = onclickHandlerProperty._remoteObject.description;

	return valueStr;
}

/**
 * @param {string} onclickAttributeStr
 * @example
 * ```js
 * function onclick(event) {
 * viewdetail('37640','1579264877_1347363_9336478.jpg');
 * }
 * ```
 *
 * @returns {number}
 * @example 37640
 */
function parseVehicleIDFromOnclick(onclickAttributeStr) {
	/** @type {string} */
	const idStr = onclickAttributeStr.split("'")[1];
	/**   ` function onclick(event) { viewdetail('37640','1579264877_1347363_9336478.jpg'); }` */
	/** `[" function onclick(event) { viewdetail(", "37640", ",", "1579264877_1347363_9336478.jpg", "); }"]` */
	/**                                            `"37640"` */

	/** @type {number} */
	const idNum = Number(idStr);

	if (isNaN(idNum)) {
		console.error(
			`failed to \`parseVehicleIDFromOnclick\`! provided \`onclickAttributeStr\` was ${onclickAttributeStr}`
		);
	}

	return idNum;
}

/**
 * See also `parseVehicleIDFromOnclick`
 *
 * @param {string} onclickAttributeStr
 *
 * @returns {string}
 */
function parseVehicleImageFilenameFromOnclick(onclickAttributeStr) {
	/** @type {string} */
	const imageFilename = onclickAttributeStr.split("'")[3];
	/**   ` function onclick(event) { viewdetail('37640','1579264877_1347363_9336478.jpg'); }` */
	/** `[" function onclick(event) { viewdetail(", "37640", ",", "1579264877_1347363_9336478.jpg", "); }"]` */
	/**                                                          `"1579264877_1347363_9336478.jpg"` */

	return imageFilename;
}

/**
 * We want to be able to click on a vehicle's card to navigate to it,
 * but that is disabled by the website.
 *
 * Istead, they use their `viewdetail` function (available globally),
 * and after logging it @ the devtools console,
 * I found the query parameters that need to be passed in
 * in order to get a URL
 * that will show you the wanted vehicle.
 *
 * And this function just allows you to pass in an ID
 * and get back a URL that you can now open
 * to view the specific vehicle's info page.
 *
 *
 * @param {number} vehicleId
 * @param {string} [imageFilename=null]
 *
 * @returns {string}
 */
const getVehicleUrlById = (vehicleId, imageFilename = null) =>
	`${url}?mod=ajveh&act=nview&id=${vehicleId}&img=${imageFilename}`;

/**
 *
 * @param {puppeteer.Page} page
 * @param {string} xpath
 * @param {string} propertyName
 *
 * @returns {Promise<puppeteer.JSHandle<any>>}
 */
async function getPropertyByXPath(page, xpath, propertyName) {
	const [element] = await page.$x(xpath);
	const rawProperty = await element.getProperty(propertyName);

	return rawProperty;
}

/**
 * handle the case where a car might
 * currently be reserved by someone else,
 * thus skipping it
 *
 * TODO maybe add it to the waitlist & try again later?
 *
 * See also:
 * https://www.vaurioajoneuvo.fi/?mod=vehicle&act=view&id=37228&img=MTU3NjQ4Mzc0NV8xMzM4MjE1XzkxNDcxNDguanBn
 *
 * @param {puppeteer.Page} vehiclePage
 *
 * @returns {Promise<boolean>}
 */
const isVehicleCurrentlyReservedBySomeoneElse = async (vehiclePage) => {
	/** /html/body/div[2]/div[3]/div[2]/div[2] */
	const vehicleIsCurrentlyReservedBySomeoneElseSelector = "#content > div.area_notice_container";

	return await doesElementExist(vehiclePage, vehicleIsCurrentlyReservedBySomeoneElseSelector);
};

/**
 * @param {puppeteer.Page} vehiclePage
 *
 * @returns {Promise<boolean>}
 */
const hasVehicleAlreadyBeenBought = async (vehiclePage) => {
	const vehicleHasAlreadyBeenBoughtSelector = "#showcontent > div > b > a";

	return await doesElementExist(vehiclePage, vehicleHasAlreadyBeenBoughtSelector);
};

/**
 * @param {puppeteer.Page} vehiclePage
 * @param {string} selector
 *
 * @returns {Promise<boolean>}
 */
const doesElementExist = async (vehiclePage, selector) => {
	/** @type {puppeteer.ElementHandle<Element>|null} */
	let element;

	/** @type {boolean} */
	let doesItExist;

	try {
		element = await vehiclePage.$(selector);
		doesItExist = element ? true : false;
	} catch (e) {
		/** not found - all good */
		doesItExist = false;
	}

	return doesItExist;
};

module.exports = {
	latestCarSnitcher,
};
