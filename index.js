/* eslint-disable @typescript-eslint/no-var-requires */

const express = require('express');
const fs = require('fs');
const cheerio = require('cheerio');

const app = express();

async function writeFile(data) {
	fs.writeFileSync('message.json', JSON.stringify(data));
}

let list = [];

app.listen(2000, function () {
	console.log('listening');
	let ulList = [];

	for (let i = 1; i <= 431; i++) {
		fs.readFile('message/message_' + i + '.html', 'utf-8', (err, data) => {
			try {
				const $ = cheerio.load(data);
				const $bodyList = $('div._a705').children('div._a706').children('div.pam');

				$bodyList.each(function (idx) {
					ulList[idx] = {
						// author: $(this).find('div._a6-i').text()
						msg: $(this).find('div._a6-p div div:nth-child(2)').text()
					};
				});
			} catch (error) {
				console.log('message_' + i + '.html');
			}

			list[i] = ulList;
		});
	}

	setTimeout(function () {
		fs.writeFileSync('message.html', JSON.stringify(list));
		console.log(list);
	}, 9000);
});
