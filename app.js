const app = require("express")();
const axios = require("axios");
const cheerio = require("cheerio");

const port = 8000;
const url =
	"https://en.wikipedia.org/wiki/List_of_presidents_of_the_United_States";

axios(url)
	.then((response) => {
		const html = response.data;
		const $ = cheerio.load(html);
		const presidents = [];

		$(".wikitable tr td > b > a", html).each(function (i) {
			presidentNumber = i + 1;
			const presidentName = $(this).text();
			const wikipediaSubDomain = $(this).attr("href");
			const wikipediaFullDomain = `https://en.wikipedia.org${wikipediaSubDomain}`;

			presidents.push({
				presidentNumber,
				presidentName,
				wikipediaFullDomain,
			});
		});
		console.log(presidents);
	})
	.catch((err) => console.error(err));

app.listen(port, () => console.log(`Server runnig on port ${port}`));
