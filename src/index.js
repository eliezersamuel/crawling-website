const puppeteer = require('puppeteer');
const express = require('express');

const ENDPOINTS = [
	'neo-125-ubs/product/431'
];

const PORT = 3001;

const app = express();

app.get('/', async (req, res) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`https://www3.yamaha-motor.com.br/${ENDPOINTS}`);
	const result = await page.evaluate( () => {
		const items = [...document.querySelectorAll('.x-color-input-checkmark__border')];

		const cores = items.map( (item) => {
			return window.getComputedStyle(item, null).getPropertyValue("border-color");
		})

		return cores;
	});

	await browser.close();

	res.status(200).send(result);
});

app.listen(PORT, (error) => {
	if(error){
		console.error(error);
	}else{
		console.log(`🔥 Server at http://localhost:${PORT} running`);
	}
});
