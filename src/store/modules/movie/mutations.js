import commonMutationType from '@/store/mutationsType';

const mutations = {
	/**
	 * @description 박스오피스 리스트
	 * @param state
	 * @param payload 전달 받은 값: object
	 */
	[commonMutationType.SET_BOXOFFICE_LIST](state, payload) {
		try {
			if (typeof payload === 'object') {
				state.boxOfficeListData = payload;
			}
		} catch (e) {
			console.error(`[commonMutationType.SET_BOXOFFICE_LIST] error: ${e}`);
		}
	},
	/**
	 * @description 영화 검색
	 * @param state
	 * @param payload 전달 받은 값: object
	 */
	[commonMutationType.SET_SEARCH_MOVIE](state, payload) {
		try {
			if (typeof payload === 'object') {
				state.searchMovieData = payload;
			}
			console.log('state:', state);
			console.log('payload:', payload);
		} catch (e) {
			console.error(`[commonMutationType.SET_SEARCH_MOVIE] error: ${e}`);
		}
	},
	/**
	 * @description 박스오피스 영화 검색
	 * @param state
	 * @param payload 전달 받은 값: object
	 */
	[commonMutationType.SET_BO_SEARCH_MOVIE](state, payload) {
		try {
			if (typeof payload === 'object') {
				state.boSearchMovieData = payload;
			}
		} catch (e) {
			console.error(`[commonMutationType.SET_BO_SEARCH_MOVIE] error: ${e}`);
		}
	},
	/**
	 * @description 영화 검색02
	 * @param state
	 * @param payload 전달 받은 값: object
	 */
	[commonMutationType.SET_KMDB_SEARCH_MOVIE](state, payload) {
		try {
			if (typeof payload === 'object') {
				state.kmdbSearchMovieData = payload;
			}
		} catch (e) {
			console.error(`[commonMutationType.SET_SEARCH_MOVIE] error: ${e}`);
		}
	},
};

export default mutations;
