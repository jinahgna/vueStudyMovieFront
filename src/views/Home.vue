<template>
	<div class="movie">
		<div class="wrap-boxoffice">
			<div class="loader-box" v-if="!loadFinished01 || !loadFinished02">
				<div class="loader"></div>
			</div>
			<div class="wrap-movie-slider" v-if="loadFinished01 && loadFinished02">
				<h2>BoxOffice Top10</h2>
				<swiper :options="swiperOption" ref="mySwiper" class="boxoffice-list">
					<swiper-slide v-for="(list, index) in boxOfficeData.dailyBoxOfficeList" :key="index">
						<a v-bind:href="rcmMovieData[index].items[0] ? rcmMovieData[index].items[0].link : ''">
							<figure>
								<img v-bind:src="rcmMovieData[index].items[0] ? rcmMovieData[index].items[0].image : ''" alt="포스터 이미지" />
							</figure>
							<span class="num point-color">{{ index + 1 }}</span>
							<strong>{{ list.movieNm }}</strong>
							<p>
								개봉일 : {{ list.openDt }} <br />
								누적관객수: {{ list.audiAcc }} <br />
								평점: <span class="point-color">★{{ rcmMovieData[index].items[0] ? rcmMovieData[index].items[0].userRating : '' }}</span>
							</p>
						</a>
					</swiper-slide>
				</swiper>
				<h2>장르별 영화 추천</h2>
				<div class="wrap-movie-genre" v-for="(list, index01) in kmdbRcmMovieData" :key="index01">
					<h3 class="point-color">{{ kmdbPayload[index01] }}</h3>
					<swiper :options="swiperOption02" ref="mySwiper" class="theme-movie-list">
						<swiper-slide v-for="(list02, index02) in kmdbRcmMovieData[index01]" :key="index02">
							<!-- <a v-bind:href="list02.kmdbUrl"> -->
							<a @click="popupMovieDetail(list02)">
								<figure>
									<img v-if="kmdbRcmMoviePoster[index01][index02] !== ''" v-bind:src="kmdbRcmMoviePoster[index01][index02]" alt="" />
								</figure>
								<strong>{{ list02.title }}</strong>
							</a>
						</swiper-slide>
					</swiper>
				</div>
				<h2>영화제 바로가기</h2>
				<div class="link-banner">
					<a href="https://www.biff.kr/kor/">부산국제영화제 BIFF <br />2020.10.07~10.16</a>
				</div>
				<div class="link-banner">
					<a href="http://www.bifan.kr/">부천국제판타스틱영화제 BIFAN <br />2020.07.09~07.16</a>
				</div>
			</div>
		</div>
		<!-- START : popupMovieDetail -->
		<popupMovieDetail v-if="popupActive" @popupEvent="popupMovieDetail">
			<strong slot="p-movie-title" class="p-movie-title"> {{ this.popupDetail.title }}<br />{{ this.popupDetail.titleEng }}</strong>
			<dl slot="p-movie-genre" class="p-movie-genre">
				<dt>장르</dt>
				<dd>{{ this.popupDetail.genre }}</dd>
			</dl>
			<dl slot="p-movie-director" class="p-movie-director">
				<dt>감독</dt>
				<dd>
					<span>{{ this.popupDetail.directors.director[0].directorNm }}</span>
				</dd>
			</dl>
			<dl slot="p-movie-actor" class="p-movie-actor">
				<dt>배우</dt>
				<dd>
					<span v-for="(list, index) in popupDetail.actors.actor" :key="index">{{ list.actorNm }}</span>
				</dd>
			</dl>
			<p slot="p-movie-desc" class="p-movie-desc">
				{{ this.popupDetail.plots.plot[0].plotText }}
			</p>
			<a v-bind:href="this.popupDetail.kmdbUrl" slot="p-movie-link" class="p-movie-link">자세히 보러가기</a>
		</popupMovieDetail>
		<!-- END : popupMovieDetail -->
	</div>
</template>

<script>
import commonMutationType from '@/store/mutationsType';
import commonActionType from '@/store/actionsType';
import popupMovieDetail from '@/components/popup/popupMovieDetail';

export default {
	name: 'Home',
	components: {
		// eslint-disable-next-line vue/no-unused-components
		popupMovieDetail,
	},
	data() {
		return {
			loadFinished01: false,
			loadFinished02: false,
			popupActive: false,
			boxOfficekey: 'b12f2221d401b22dda7ce6f92ea46fbb',
			boxOfficeData: '',
			todayDate: '',
			boMovieData: [],
			rcmMovieData: [],
			kmdbPayload: ['드라마', '액션', '코메디'],
			kmdbRcmMovieData: [],
			kmdbRcmMoviePoster: [],
			popupDetail: [],
			swiperOption: {
				effect: 'coverflow',
				grabCursor: true,
				centeredSlides: true,
				slidesPerView: 1.6,
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
			swiperOption02: {
				slidesPerView: 3.2,
				spaceBetween: 10,
				autoplay: false,
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
			// eslint-disable-next-line no-plusplus
			for (let i = 0; i < 10; i++) {
				this.boMovieData.push(this.boxOfficeData.dailyBoxOfficeList[i].movieNm);
				if (this.boMovieData[i].includes('#')) {
					this.boMovieData[i] = this.boMovieData[i].replace(/#/g, '');
				} else if (this.boMovieData[i].includes(':익스텐디드')) {
					this.boMovieData[i] = this.boMovieData[i].replace(/:익스텐디드/g, '');
				}
			}
			await this.boSearchMovie();
			await this.kmdbSearchMovie();
		},
		// 날짜 포멧 변환 yyyymmdd 형태생성
		getFormatDate(date) {
			const year = date.getFullYear();
			let month = date.getMonth() + 1;
			month = month >= 10 ? month : `0${month}`;
			let day = date.getDate() - 1;
			day = day >= 10 ? day : `0${day}`;
			return `${year}${month}${day}`;
		},
		// 추출한 박스오피스 영화 title로 네이버 검색 api 호출하여 이미지 가져오기
		async boSearchMovie() {
			const payload = this.boMovieData;
			await this.$store.dispatch(commonActionType.ACTION_BO_SEARCH_MOVIE, payload);
			this.rcmMovieData = this.$store.state.movie.boSearchMovieData.result;
			this.loadFinished01 = this.rcmMovieData.length === 10;
		},
		// 장르별 추천 영화 kmdb 오픈api 데이터 호출
		async kmdbSearchMovie() {
			await this.$store.dispatch(commonActionType.ACTION_KMDB_SEARCH_MOVIE, this.kmdbPayload);
			this.kmdbRcmMoviePoster = { 0: [], 1: [], 2: [] };
			// eslint-disable-next-line no-plusplus
			for (let i = 0; i < this.$store.state.movie.kmdbSearchMovieData.result.length; i++) {
				this.kmdbRcmMovieData.push(this.$store.state.movie.kmdbSearchMovieData.result[i].Data[0].Result);
				// eslint-disable-next-line no-plusplus
				for (let j = 0; j < this.kmdbRcmMovieData[i].length; j++) {
					this.kmdbRcmMoviePoster[i].push(this.kmdbRcmMovieData[i][j].posters);
					if (this.kmdbRcmMoviePoster[i][j].includes('|')) {
						const idx = this.kmdbRcmMoviePoster[i][j].indexOf('|');
						this.kmdbRcmMoviePoster[i][j] = this.kmdbRcmMoviePoster[i][j].substring(0, idx);
					}
				}
			}
			this.loadFinished02 = this.$store.state.movie.kmdbSearchMovieData.result.length === 3;
			console.log('this.kmdbRcmMoviePoster', this.kmdbRcmMoviePoster);
			console.log('this.kmdbRcmMovieData', this.kmdbRcmMovieData);
		},
		popupMovieDetail(data) {
			if (data === 'popupClose') {
				this.popupActive = false;
			} else {
				this.popupActive = true;
				this.popupDetail = data;
			}
			console.log('data', data);
		},
	},
};
</script>

<style scoped>
.recommend-movie {
	position: relative;
	padding-bottom: 20px;
}
.wrap-boxoffice h2 {
	padding-left: 20px;
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
	padding: 20px 0;
	color: #fff;
}
.boxoffice-list {
	padding-top: 35px;
}
.boxoffice-list a,
.theme-movie-list a {
	display: block;
	width: 100%;
	color: #fff;
}
.boxoffice-list figure {
	display: block;
	position: relative;
	width: 100%;
	height: 80vw;
	border: 1px solid #fff;
}
.boxoffice-list figure:after {
	content: '';
	display: block;
	position: absolute;
	width: 100%;
	height: 80vw;
	border: 1px solid #ddd;
	top: 5px;
	left: 5px;
}
.boxoffice-list img {
	width: 110px;
	padding-top: 15vw;
}
.boxoffice-list strong {
	display: block;
	padding: 20px 0 10px;
}
.boxoffice-list span.num {
	position: absolute;
	left: -17px;
	top: -30px;
	font-size: 85px;
	font-weight: 700;
	opacity: 0.5;
}
.boxoffice-list p {
	font-size: 12px;
	line-height: 1.5;
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
.point-color {
	color: #e74c3c;
}
/* theme movie list */
.theme-movie-list {
	padding: 0 20px;
}
.wrap-movie-genre + .wrap-movie-genre h3 {
	margin-top: 20px;
}
.theme-movie-list strong {
	font-weight: 200;
	font-size: 12px;
}
.wrap-movie-slider h2:first-of-type {
	padding: 0 20px 10px;
}
.wrap-movie-slider h2 {
	padding: 40px 20px 10px;
}
.wrap-movie-slider h3 {
	display: inline-block;
	border: 1px solid #e74c3c;
	padding: 3px 5px;
	font-weight: 700;
	font-size: 12px;
	margin: 0 20px 10px;
}
.theme-movie-list .swiper-slide {
	padding: 0;
}
.theme-movie-list figure {
	position: relative;
	height: 35vw;
}
.theme-movie-list img {
	position: relative;
	z-index: 1;
	width: 100%;
	height: 35vw;
}
.theme-movie-list figure:after {
	content: '이미지 준비중';
	display: block;
	position: absolute;
	left: 0;
	top: 0;
	font-size: 11px;
	font-weight: 200;
	color: #989898;
	text-align: center;
	padding-top: 30px;
	clear: both;
	width: 100%;
	height: 35vw;
	box-sizing: border-box;
	background-color: #3a1515;
}
/* banner */
.link-banner {
	margin-bottom: 10px;
}
.link-banner a {
	display: block;
	position: relative;
	background-color: #e74c3c;
	font-size: 13px;
	color: #fff;
	padding: 20px;
	line-height: 1.5;
}
.link-banner a:after {
	content: '';
	display: block;
	position: absolute;
	right: 25px;
	top: 50%;
	margin-top: -8px;
	width: 15px;
	height: 15px;
	border-bottom: 1px solid #fff;
	border-right: 1px solid #fff;
	transform: rotate(-45deg);
}
/* loading animation */
.loader-box {
	display: block;
	text-align: center;
	margin: 50px 30px;
	position: relative;
	transition: all 0.2s ease;
}
.loader {
	display: inline-block;
	width: 150px;
	height: 20px;
}
.loader:after {
	content: '영화정보 LOADING...';
	color: #fff;
	font-weight: 200;
	font-size: 14px;
	position: absolute;
	width: 100%;
	height: 20px;
	line-height: 20px;
	left: 0;
	top: 0;
	background-color: #e74c3c;
	z-index: 1;
}
.loader:before {
	content: '';
	position: absolute;
	background-color: #fff;
	top: -5px;
	left: 0px;
	height: 30px;
	width: 0px;
	z-index: 0;
	opacity: 1;
	-webkit-transform-origin: 100% 0%;
	transform-origin: 100% 0%;
	-webkit-animation: loader3 7s ease-in-out infinite;
	animation: loader3 7s ease-in-out infinite;
}

@-webkit-keyframes loader3 {
	0% {
		width: 0px;
	}
	70% {
		width: 100%;
		opacity: 1;
	}
	90% {
		opacity: 0;
		width: 100%;
	}
	100% {
		opacity: 0;
		width: 0px;
	}
}

@keyframes loader3 {
	0% {
		width: 0px;
	}
	70% {
		width: 100%;
		opacity: 1;
	}
	90% {
		opacity: 0;
		width: 100%;
	}
	100% {
		opacity: 0;
		width: 0px;
	}
}
/* popup */
.p-movie-title {
	color: #000;
}
.p-movie-title,
.p-movie-director {
	display: block;
}
.p-movie-actor {
}
</style>
