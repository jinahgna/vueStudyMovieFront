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
		<div class="wrap-search-movie">
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
		<div id="mapArea"></div>
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
			searchText: '',
			searchMovieData: '',
			mapKey: '1adb5927a691a043afeccb8a25ce1118',
		};
	},
	mounted() {
		this.todayDate = new Date();
		this.todayDate = this.getFormatDate(this.todayDate);
		console.log('this.todayDate', this.todayDate);
		this.loadView();
		// eslint-disable-next-line no-unused-expressions
		window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
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
			// axios
			// this.searchMovieData = this.$store.state.movie.searchMovieData;
			// request
			this.searchMovieData = this.$store.state.movie.searchMovieData.result;
		},
		// 지도 불러오기1
		initMap() {
			const container = document.getElementById('mapArea');
			const options = { center: new kakao.maps.LatLng(33.450701, 126.570667), level: 3 };
			const map = new kakao.maps.Map(container, options);
			const marker = new kakao.maps.Marker({ position: map.getCenter() });
			const that = this;
			if (navigator.geolocation) {
				// GeoLocation을 이용해서 접속 위치를 얻어옵니다
				// eslint-disable-next-line func-names
				navigator.geolocation.getCurrentPosition(function(position) {
					// 위도
					const lat = position.coords.latitude;
					// 경도
					const lon = position.coords.longitude;
					// 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
					const locPosition = new kakao.maps.LatLng(lat, lon);
					// 인포윈도우에 표시될 내용입니다
					const message = '<div style="padding:5px;">여기에 계신가요?!</div>';
					// 마커와 인포윈도우를 표시합니다
					const currentMarker = new kakao.maps.Marker({
						map: that.map,
						position: locPosition,
					});
					// 인포윈도우에 표시할 내용
					const iwContent = message;
					const iwRemoveable = true;
					// 인포윈도우를 생성합니다
					const infowindow = new kakao.maps.InfoWindow({
						content: iwContent,
						removable: iwRemoveable,
					});
					// 인포윈도우를 마커위에 표시합니다
					infowindow.open(map, currentMarker);
					// 지도 중심좌표를 접속위치로 변경합니다
					map.setCenter(locPosition);
					marker.setMap(map);
				});
			} else {
				alert('현재위치(geolocation)를 사용할수 없습니다.');
			}
		},
		// 지도 불러오기2
		addScript() {
			/* global kakao */
			const script = document.createElement('script');
			script.onload = () => kakao.maps.load(this.initMap);
			script.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${this.mapKey}`;
			document.head.appendChild(script);
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
#mapArea {
	width: 500px;
	height: 500px;
	margin: auto;
}
</style>
