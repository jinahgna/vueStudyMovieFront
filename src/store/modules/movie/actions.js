import commonActionType from '@/store/actionsType';
import commonMutationType from '@/store/mutationsType';
import movieModule from '@/api/movieModule';
import searchModule from '@/api/searchModule';
import kmdbSearchModule from '@/api/kmdbSearchModule';

const actions = {
	/**
	 * @description action 박스오피스 조회
	 * @param commit
	 * @param payload 전달 받은 값
	 */
	async [commonActionType.ACTION_BOXOFFICE_LIST]({ commit }, payload) {
		// 방법1
		try {
			await movieModule.getModule('/boxoffice/searchDailyBoxOfficeList.json', payload).then((result) => {
				commit(commonMutationType.SET_BOXOFFICE_LIST, result.data.boxOfficeResult);
			});
		} catch (e) {
			console.log('박스오피스 조회 실패');
		}
		// 방법2
		// try {
		// 	const boardList = await apiModule.getModule('/getBoardList', payload);
		// 	commit(commonMutationType.SET_BOARD_LIST, boardList.data.result);
		// } catch (e) {
		// 	console.log('게시판 조회 실패');
		// }
	},
	/**
	 * @description action 네이버 영화검색
	 * @param commit
	 * @param payload 전달 받은 값
	 */
	async [commonActionType.ACTION_SEARCH_MOVIE]({ commit }, payload) {
		try {
			await searchModule.getModule('/movie', payload).then((result) => {
				commit(commonMutationType.SET_SEARCH_MOVIE, result.data);
				console.log('result', result);
			});
		} catch (e) {
			console.log('영화 검색 실패');
		}
	},
	/**
	 * @description action 박스오피스 네이버 영화검색
	 * @param commit
	 * @param payload 전달 받은 값
	 */
	async [commonActionType.ACTION_BO_SEARCH_MOVIE]({ commit }, payload) {
		try {
			await searchModule.getModule('/boxOfficeMovie', payload).then((result) => {
				commit(commonMutationType.SET_BO_SEARCH_MOVIE, result.data);
			});
		} catch (e) {
			console.log('박스오피스 영화 검색 실패');
		}
	},
	/**
	 * @description action kmdb 영화검색
	 * @param commit
	 * @param payload 전달 받은 값
	 */
	async [commonActionType.ACTION_KMDB_SEARCH_MOVIE]({ commit }, payload) {
		try {
			await kmdbSearchModule.getModule('/kmdbMovie', payload).then((result) => {
				commit(commonMutationType.SET_KMDB_SEARCH_MOVIE, result.data);
			});
		} catch (e) {
			console.log('KMDB 영화 검색 실패');
		}
	},
};

export default actions;
