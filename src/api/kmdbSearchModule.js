import axios from 'axios';

const kmdbSearchModule = {};
const baseUrl = 'https://vuestudymovieserver-clwlh.run.goorm.io';

kmdbSearchModule.getModule = (url, data) => {
	try {
		return axios({
			method: 'get',
			baseURL: baseUrl + url,
			params: {
				...data,
			},
		});
	} catch (error) {
		return console.error(`[API][searchModule] getModule is failed url: ${url}, error: ${error}`);
	}
};

export default kmdbSearchModule;
