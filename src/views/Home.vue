<template>
	<div class="movie">
		<div class="wrap-boxoffice">
			<h2>BoxOffice Top10</h2>
			<div class="loader-box" v-if="!loadFinished">
				<div class="loader"></div>
			</div>
			<swiper :options="swiperOption" ref="mySwiper" class="boxoffice-list" v-if="loadFinished">
				<swiper-slide v-for="(list, index) in boxOfficeData.dailyBoxOfficeList" :key="index">
					<a :href="rcmMovieData[index].items[0].link">
						<figure>
							<img :src="rcmMovieData[index].items[0].image" alt="포스터 이미지" />
						</figure>
						<span class="num point-color">{{ index + 1 }}</span>
						<strong>{{ list.movieNm }}</strong>
						<p>
							개봉일 : {{ list.openDt }} <br />
							누적관객수: {{ list.audiAcc }} <br />
							평점: <span class="point-color">★{{ rcmMovieData[index].items[0].userRating }}</span>
						</p>
					</a>
				</swiper-slide>
			</swiper>
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
			loadFinished: false,
			boxOfficekey: 'b12f2221d401b22dda7ce6f92ea46fbb',
			boxOfficeData: '',
			todayDate: '',
			link: '',
			boMovieData: [],
			rcmMovieData: [],
			kmdbRcmMovieData: [],
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
				}
			}
			this.boSearchMovie();
			this.kmdbSearchMovie();
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
		async boSearchMovie() {
			const payload = this.boMovieData;
			await this.$store.dispatch(commonActionType.ACTION_BO_SEARCH_MOVIE, payload);
			this.rcmMovieData = this.$store.state.movie.boSearchMovieData.result;
			this.loadFinished = true;
		},
		async kmdbSearchMovie() {
			const kmdbPayload = {
				genre: '드라마',
			};
			await this.$store.dispatch(commonActionType.ACTION_KMDB_SEARCH_MOVIE, kmdbPayload);
			this.kmdbRcmMovieData = this.$store.state.movie.kmdbSearchMovieData.result.Data[0].Result;
			// console.log('this.kmdbRcmMovieData', this.kmdbRcmMovieData);
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
.boxoffice-list a {
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
.boxoffice-list .swiper-slide-active figure {
	/* border: 2px solid #fff; */
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
	content: 'LOADING ...';
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
</style>
