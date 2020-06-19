const getters = {
	/**
	 * @description 게시판 리스트 조회
	 * @returns state.screen.boardViewData 리스트 조회 완료 상태
	 */
	boxOfficeListData: (state) => state.boxOfficeListData,
	searchMovieData: (state) => state.searchMovieData,
};

export default getters;
