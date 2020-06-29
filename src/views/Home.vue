<template>
	<div class="movie">
		<div class="wrap-boxoffice">
			<div class="recommend-movie">
				<a v-bind:href="this.rcmMovieData.link">
					<figure>
						<img v-bind:src="this.rcmMovieData.image" alt="" />
					</figure>
				</a>
				<h2>
					<strong v-html="this.rcmMovieData.title"></strong>
					<em><span>★</span> {{ this.rcmMovieData.userRating }}</em>
				</h2>
				<p><span class="title">actor</span> {{ this.rcmMovieData.actor }}</p>
				<p><span class="title">director</span> {{ this.rcmMovieData.director }}</p>
			</div>
			<h2>일별 박스오피스 10</h2>
			<swiper :options="swiperOption" ref="mySwiper" class="boxoffice-list">
				<swiper-slide v-for="(list, index) in boxOfficeData.dailyBoxOfficeList" :key="index">
					<figure>
						<img src="" alt="포스터 이미지" />
					</figure>
					<span>{{ index + 1 }}</span>
					<strong>{{ list.movieNm }}</strong>
					<p>
						개봉일 : {{ list.openDt }} <br />
						누적관객수: {{ list.audiAcc }}
					</p>
				</swiper-slide>
			</swiper>
			<!-- <ul>
				<li v-for="(list, index) in boxOfficeData.dailyBoxOfficeList" :key="index">
					<strong>{{ list.movieNm }}</strong>
					<p>개봉일 : {{ list.openDt }} / 누적관객수: {{ list.audiAcc }}</p>
				</li>
			</ul> -->
		</div>
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
			boxOfficekey: 'b12f2221d401b22dda7ce6f92ea46fbb',
			boxOfficeData: '',
			todayDate: '',
			rcmMovieData: '',
			swiperOption: {
				effect: 'coverflow',
				grabCursor: true,
				centeredSlides: true,
				slidesPerView: 2,
				coverflowEffect: {
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
				},
				autoplay: {
					delay: 2000,
				},
			},
		};
	},
	computed: {
		swiper() {
			return this.$refs.mySwiper.$swiper;
		},
	},
	mounted() {
		this.todayDate = new Date();
		this.todayDate = this.getFormatDate(this.todayDate);
		this.loadView();
		this.swiper.slideTo(3, 1000, false);
	},
	methods: {
		// 박스오피스 api 호출
		async loadView() {
			const payload = {
				key: this.boxOfficekey,
				targetDt: this.todayDate,
				itemPerPage: '',
				multiMovieYn: '',
				repNationCd: '',
				wideAreaCd: '',
			};
			await this.$store.dispatch(commonActionType.ACTION_BOXOFFICE_LIST, payload);
			this.boxOfficeData = this.$store.state.movie.boxOfficeListData;
			this.recommendMovie(this.boxOfficeData.dailyBoxOfficeList[1].movieNm);
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
		async recommendMovie(rcmMovie) {
			if (rcmMovie.includes('#')) {
				rcmMovie = rcmMovie.replace(/#/g, '');
			}
			const payload = {
				query: rcmMovie,
				display: 1,
				start: 1,
				genre: '',
				country: '',
				yearfrom: '',
				yearto: '',
			};
			await this.$store.dispatch(commonActionType.ACTION_SEARCH_MOVIE, payload);
			// eslint-disable-next-line prefer-destructuring
			this.rcmMovieData = this.$store.state.movie.searchMovieData.result.items[0];
			// this.rcmMovieData.actor = this.rcmMovieData.actor.replace(/\|/g, ' ');
			// this.rcmMovieData.director = this.rcmMovieData.director.replace(/\|/g, ' ');

			// kmdbmovie
			// const payload = {
			// 	collection: 'kmdb_new',
			// 	nation: '대한민국',
			// 	query: rcmMovie,
			// 	ServiceKey: '7XOK50823TUP3BYG9E31',
			// 	listCount: 3,
			// 	startCount: 1,
			// };
			// await this.$store.dispatch(commonActionType.ACTION_KMDB_SEARCH_MOVIE, payload);
			// this.rcmMovieData = this.$store.state.movie.kmdbSearchMovieData;
			// console.log('this.rcmMovieData', this.rcmMovieData);
		},
	},
};
</script>

<style scoped>
.recommend-movie {
	position: relative;
	padding-bottom: 20px;
}
.recommend-movie h2 em {
	display: inline-block;
	font-size: 11px;
	padding-left: 10px;
	vertical-align: middle;
	margin-top: -6px;
}
.recommend-movie h2 span {
	color: rgb(255, 217, 0);
}
.recommend-movie a {
	width: 100%;
}
.recommend-movie p {
	margin-top: 5px;
}
.title {
	display: inline-block;
	padding: 3px;
	border-radius: 5px;
	border: 1px solid #fff;
	color: #fff;
	font-size: 11px;
}
.wrap-boxoffice {
	text-align: left;
	padding: 10px;
	color: #fff;
}
.boxoffice-list {
	padding-top: 35px;
}
.boxoffice-list figure {
	display: block;
	width: 100%;
	height: 65vw;
	border: 1px solid #ddd;
}
.boxoffice-list strong {
	display: block;
	padding: 7px 0;
}
.boxoffice-list span {
	position: absolute;
	left: -17px;
	top: -20px;
	font-size: 65px;
	font-weight: 700;
	opacity: 0.5;
}
.boxoffice-list p {
	font-size: 12px;
	line-height: 1.2;
}
.boxoffice-list .swiper-slide {
	position: relative;
}
.boxoffice-list .swiper-slide-active span {
	opacity: 1;
}
img {
	margin: auto;
}
</style>
