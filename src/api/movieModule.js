import axios from 'axios';

const movieModule = {};
const baseUrl = process.env.VUE_APP_BASE_URL;

movieModule.getModule = (url, data) => {
	try {
		return axios({
			method: 'get',
			baseURL: `https://www.kobis.or.kr/kobisopenapi/webservice/rest${url}`,
			// baseURL: baseUrl + url,
			params: {
				...data,
			},
		});
	} catch (error) {
		return console.error(`[API][movieModule] getModule is failed url: ${url}, error: ${error}`);
	}
};

// movieModule.postModule = (url, data) => {
// 	try {
// 		return axios({
// 			method: 'post',
// 			baseURL: process.env.VUE_APP_BASE_URL,
// 			url,
// 			data,
// 		});
// 	} catch (error) {
// 		return console.error(`[API][movieModule] postModule is failed url: ${url}, error: ${error}`);
// 	}
// };

// movieModule.putModule = (url, data) => {
// 	try {
// 		return axios({
// 			method: 'put',
// 			baseURL: process.env.VUE_APP_BASE_URL,
// 			url,
// 			data,
// 		});
// 	} catch (error) {
// 		return console.error(`[API][movieModule] putModule is failed url: ${url}, error: ${error}`);
// 	}
// };

// movieModule.patchModule = (url, data) => {
// 	try {
// 		return axios({
// 			method: 'patch',
// 			baseURL: process.env.VUE_APP_BASE_URL,
// 			url,
// 			data,
// 		});
// 	} catch (error) {
// 		return console.error(`[API][movieModule] patchModule is failed url: ${url}, error: ${error}`);
// 	}
// };

// movieModule.deleteModule = (url) => {
// 	try {
// 		return axios({
// 			method: 'delete',
// 			baseURL: process.env.VUE_APP_BASE_URL,
// 			url,
// 		});
// 	} catch (error) {
// 		return console.error(`[API][movieModule] deleteModule is failed url: ${url}, error: ${error}`);
// 	}
// };

export default movieModule;
