<template>
	<div class="theater">
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
			mapKey: '1adb5927a691a043afeccb8a25ce1118',
			searchPosition: '',
		};
	},
	mounted() {
		// eslint-disable-next-line no-unused-expressions
		window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
	},
	methods: {
		// 카카도 지도 api script source 등록
		addScript() {
			/* global kakao */
			const script = document.createElement('script');
			script.onload = () => kakao.maps.load(this.initMap);
			script.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${this.mapKey}&libraries=services`;
			document.head.appendChild(script);
		},
		// 내 현위치 지도 그리기
		initMap() {
			const that = this;
			const container = document.getElementById('mapArea');
			const options = { center: new kakao.maps.LatLng(33.450701, 126.570667), level: 3 };
			const map = new kakao.maps.Map(container, options);
			const places = new kakao.maps.services.Places();
			const displayMarker = function(makPosition, makMessage, location) {
				// 마커를 생성합니다
				const marker = new kakao.maps.Marker({
					map: that.map,
					position: makPosition,
				});
				const iwContent = makMessage; // 인포윈도우에 표시할 내용
				const iwRemoveable = true;
				// 인포윈도우를 생성합니다 (내위치, 검색목록)
				const infowindow = new kakao.maps.InfoWindow({
					content: iwContent,
					removable: iwRemoveable,
				});
				map.setCenter(makPosition);
				if (location === 'myLocation') {
					// 인포윈도우를 마커위에 표시합니다
					infowindow.open(map, marker);
					console.log('내위치');
				} else {
					marker.setMap(map);
					console.log('영화관');
				}
			};
			if (navigator.geolocation) {
				// GeoLocation을 이용해서 접속 위치를 얻어옵니다
				navigator.geolocation.getCurrentPosition(function(position) {
					// 위도, 경도
					const lat = position.coords.latitude;
					const lon = position.coords.longitude;
					// 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
					const locPosition = new kakao.maps.LatLng(lat, lon);
					// 인포윈도우에 표시될 내용입니다
					const message = '<div style="padding:5px;">여기에 계신가요?!</div>';
					// 마커와 인포윈도우를 표시합니다
					const callback = function(result, status, pagination) {
						if (status === kakao.maps.services.Status.OK) {
							that.searchPosition = result;
							const bounds = new kakao.maps.LatLngBounds();
							// eslint-disable-next-line no-plusplus
							for (let i = 0; i < that.searchPosition.length; i++) {
								displayMarker(new kakao.maps.LatLng(that.searchPosition[i].y, that.searchPosition[i].x), message, 'theaterLocation');
								bounds.extend(new kakao.maps.LatLng(that.searchPosition[i].y, that.searchPosition[i].x));
							}
							console.log('result, status, pagination', result, status, pagination);
							map.setBounds(bounds);
						}
					};
					const option = { radius: 2000, location: locPosition };
					places.keywordSearch('영화관', callback, option);
					displayMarker(locPosition, message, 'myLocation');
				});
			} else {
				alert('현재위치(geolocation)를 사용할수 없습니다.');
			}
		},
	},
};
</script>

<style scoped>
#mapArea {
	width: 100%;
	height: 500px;
	margin: auto;
	color: #000;
}
</style>
