<template>
	<div class="movie">
		<div class="wrap-boxoffice">
			<h2>일별 박스오피스 10</h2>
			<ul>
				<li v-for="(list, index) in boxOfficeData.dailyBoxOfficeList" :key="index">
					<strong>{{ list.movieNm }}</strong>
					<p>개봉일 : {{ list.openDt }} / 누적관객수: {{ list.audiAcc }}</p>
				</li>
			</ul>
		</div>
		<div class="wrap-search-movie"></div>
		<input type="text" v-model="searchText" />
		<button @click="searchMovie()">영화검색</button>
		<ul>
			<li v-for="(list, index) in searchMovieData.items" :key="index">
				<strong v-html="list.title"></strong>
				<p>{{ list.actor }}</p>
				<p>{{ list.director }}</p>
				<figure>
					<img v-bind:src="list.image" alt="" />
				</figure>
				<a v-bind:href="list.link">바로가기</a>
			</li>
		</ul>
	</div>
</template>

<script>
import commonMutationType from '@/store/mutationsType';
import commonActionType from '@/store/actionsType';

export default {
	name: 'Home',
	components: {},
	data() {
		return {
			key: 'b12f2221d401b22dda7ce6f92ea46fbb',
			boxOfficeData: '',
			todayDate: '',
			searchText: '',
			searchMovieData: '',
		};
	},
	mounted() {
		this.todayDate = new Date();
		this.todayDate = this.getFormatDate(this.todayDate);
		console.log('this.todayDate', this.todayDate);
		this.loadView();
	},
	methods: {
		// 박스오피스 api 호출
		async loadView() {
			const payload = {
				key: this.key,
				targetDt: this.todayDate,
				itemPerPage: '',
				multiMovieYn: '',
				repNationCd: '',
				wideAreaCd: '',
			};
			await this.$store.dispatch(commonActionType.ACTION_BOXOFFICE_LIST, payload);
			this.boxOfficeData = this.$store.state.movie.boxOfficeListData;
		},
		// 날짜 포멧 변환
		getFormatDate(date) {
			// yyyy
			const year = date.getFullYear();
			// M
			let month = date.getMonth() + 1;
			// month 두자리로 저장
			month = month >= 10 ? month : `0${month}`;
			// d
			let day = date.getDate() - 1;
			// day 두자리로 저장
			day = day >= 10 ? day : `0${day}`;
			// yyyymmdd 형태생성
			return `${year}${month}${day}`;
		},
		// 영화검색 api 호출
		async searchMovie() {
			const payload = {
				query: this.searchText,
				display: 100,
				start: 1,
				genre: '',
				country: '',
				yearfrom: '',
				yearto: '',
			};
			await this.$store.dispatch(commonActionType.ACTION_SEARCH_MOVIE, payload);
			this.searchMovieData = this.$store.state.movie.searchMovieData;
			// firebase_back
			// this.searchMovieData = this.$store.state.movie.searchMovieData.result;
		},
	},
};
</script>

<style scoped>
.wrap-boxoffice,
.wrap-search-movie {
	padding: 10px;
}
img {
	margin: auto;
}
</style>
