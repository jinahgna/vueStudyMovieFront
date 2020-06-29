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
		};
	},
	mounted() {
		// eslint-disable-next-line no-unused-expressions
		window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
	},
	methods: {
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
#mapArea {
	width: 100%;
	height: 500px;
	margin: auto;
	color: #000;
}
</style>
