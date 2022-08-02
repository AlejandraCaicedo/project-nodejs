'use strict';

const { SHOW, EPISODES } = require('./URL');
const axios = require('axios');

async function getData(keyword) {
	try {
		const response = await axios.get(`${SHOW}${keyword}`);
		const data = await response.data;

		const firstData = data[0];
		const firstShow = firstData.show;

		console.log(firstShow);

		let episodes = await getEpisodes(firstShow.id);

		for (const episode of episodes) {
			episode.idShow = firstShow.id;
		}

		console.log('------------------------------------');

		firstShow.episodes = episodes;

		console.log(firstShow);
	} catch (err) {
		console.log(err.message);
	}
}

function getEpisodes(id) {
	return new Promise((resolve, reject) => {
		axios
			.get(`${EPISODES}${id}/episodes`)
			.then(function (response) {
				resolve(response.data);
			})
			.catch(function (error) {
				reject(error);
			});
	});
}

getData('vikings');
