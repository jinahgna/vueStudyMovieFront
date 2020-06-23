import axios from 'axios';

const searchModule = {};
// const clientId = 'TZfVxXZdTcuQJxonlOcR';
// const clientSecret = '5o_ooe3QAt';
// const baseUrl = 'http://localhost:8300/api';
// const baseUrl = 'http://fed.pxd.co.kr:8300/api';
const baseUrl = 'https://vuestudymovieserver-clwlh.run.goorm.io';
// const express = require('express');
// const app = express();

// app.get('/search/movie', function (req, res) {
// 	const api_url = 'https://openapi.naver.com/v1/search/movie?query=' + encodeURI(req.query.query); // json 결과
// 	const request = require('request');
// 	const options = {
// 		url: api_url,
// 		headers: {'X-Naver-Client-Id':clientId, 'X-Naver-Client-Secret': clientSecret}
// 	 };
// 	request.get(options, function (error, response, body) {
// 	  if (!error && response.statusCode == 200) {
// 		res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
// 		res.end(body);
// 	  } else {
// 		res.status(response.statusCode).end();
// 		console.log('error = ' + response.statusCode);
// 	  }
// 	});
//   });
//   app.listen(3000, function () {
// 	console.log('http://127.0.0.1:3000/search/blog?query=검색어 app listening on port 3000!');
//   });

//   export default app;

searchModule.getModule = (url, data) => {
	try {
		return axios({
			method: 'get',
			headers: {
				Pragma: 'no-cache',
				'Content-Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*',
			},
			// baseURL: baseUrl,
			baseURL: baseUrl + url,
			params: {
				...data,
			},
		});
	} catch (error) {
		return console.error(`[API][searchModule] getModule is failed url: ${url}, error: ${error}`);
	}
};

export default searchModule;
