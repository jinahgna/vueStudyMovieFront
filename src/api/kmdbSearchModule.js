import axios from 'axios';

const kmdbSearchModule = {};
const baseUrl = 'https://vuestudymovieserver-clwlh.run.goorm.io';

kmdbSearchModule.getModule = (url, data) => {
	try {
		return axios({
			method: 'get',
			baseURL: baseUrl + url,
			headers: {
				Pragma: 'no-cache',
				'Content-Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*',
			},
			params: {
				...data,
			},
		});
	} catch (error) {
		return console.error(`[API][searchModule] getModule is failed url: ${url}, error: ${error}`);
	}
};

export default kmdbSearchModule;
