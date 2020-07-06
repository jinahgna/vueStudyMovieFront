<template>
	<div class="theater">
		<div class="wrap-map">
			<p class="info-txt">
				<span>※</span> 영화관 목록은 가까운 위치순으로 정렬됩니다.<br />
				<span>※</span> 영화관 이름을 클릭하면 위치가 표시됩니다.
			</p>
			<div id="mapArea"></div>
		</div>
		<div id="wrapPlacesList">
			<ul id="placesList"></ul>
		</div>
		<h2>영화 예매하러가기</h2>
		<div class="link-banner">
			<a href="http://www.cgv.co.kr/ticket/">CGV</a>
		</div>
		<div class="link-banner">
			<a href="https://www.megabox.co.kr/booking">MEGABOX</a>
		</div>
		<div class="link-banner">
			<a href="https://www.lottecinema.co.kr/NLCHS/Ticketing">LOTTE CINEMA</a>
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
			mapKey: '1adb5927a691a043afeccb8a25ce1118',
			searchPosition: '',
			markers: [],
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
				// 마커를 생성
				const marker = new kakao.maps.Marker({
					map: that.map,
					position: makPosition,
				});
				// 인포윈도우를 생성 (내위치)
				const infowindowMyPosition = new kakao.maps.InfoWindow({
					zIndex: 1,
					content: makMessage,
					removable: true,
				});
				map.setCenter(makPosition);
				if (location === 'myLocation') {
					// 인포윈도우(내위치)를 마커위에 표시
					infowindowMyPosition.open(map, marker);
				} else {
					// 영화관 마커 표시
					marker.setMap(map);
					that.markers.push(marker);
				}
			};
			if (navigator.geolocation) {
				// GeoLocation을 이용해서 접속 위치를 얻어오기
				navigator.geolocation.getCurrentPosition(function(position) {
					// 위도, 경도
					const lat = position.coords.latitude;
					const lon = position.coords.longitude;
					// geolocation으로 얻어온 내 위치 좌표로 생성
					const locPosition = new kakao.maps.LatLng(lat, lon);
					// 인포윈도우(내위치)에 표시되는 내용
					const message = '<div style="padding:5px">여기에 계신가요?!</div>';
					// 인포윈도우를 생성 (영화관 목록)
					const infowindowTheater = new kakao.maps.InfoWindow({
						zIndex: 1,
					});
					// 검색결과 목록의 자식 Element를 제거하는 함수
					const removeAllChildNods = function(el) {
						while (el.hasChildNodes()) {
							el.removeChild(el.lastChild);
						}
					};
					// 지도 위에 표시되고 있는 마커를 모두 제거
					const removeMarker = function() {
						// eslint-disable-next-line no-plusplus
						for (let i = 0; i < that.markers.length; i++) {
							that.markers[i].setMap(null);
						}
						that.markers = [];
					};
					// 마커를 생성하고 지도 위에 마커를 표시하는 함수
					const addMarker = function(positions, idx, title) {
						const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'; // 마커 이미지 url, 스프라이트 이미지 사용
						const imageSize = new kakao.maps.Size(36, 37); // 마커 이미지의 크기
						const imgOptions = {
							spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
							spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
							offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
						};
						const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
						const marker = new kakao.maps.Marker({
							position: positions, // 마커의 위치
							image: markerImage,
						});
						marker.setMap(map); // 지도 위에 마커를 표출합니다
						that.markers.push(marker); // 배열에 생성된 마커를 추가합니다
						return marker;
					};
					// 검색결과 항목을 Element로 반환하는 함수입니다
					const getListItem = function(index, placess) {
						const el = document.createElement('li');
						// eslint-disable-next-line no-useless-concat
						const itemStr = `<p style="padding:10px 10px 10px 20px; border-bottom: 1px dashed #ccc;"><strong style="display:block; padding-bottom:5px; font-weight:700; font-size:14px;"> <span style="color:#e74c3c; margin-left:-15px; padding-right:8px;">${index + 1}</span>${placess.place_name}</strong>${placess.address_name}<br/><a href="tel:${placess.phone}" style="display:block; padding-top:5px; color:#e74c3c;">${placess.phone}</a></p>	`;
						el.innerHTML = itemStr;
						el.className = 'item';
						return el;
					};
					// 인포윈도우에 장소명을 표시합니다
					const displayInfowindow = function(marker, title) {
						const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
						infowindowTheater.setContent(content);
						infowindowTheater.open(map, marker);
					};
					const displayPlaces = function(displayPlace) {
						const listEl = document.getElementById('placesList');
						const menuEl = document.getElementById('wrapPlacesList');
						const fragment = document.createDocumentFragment();
						const bounds = new kakao.maps.LatLngBounds();
						const listStr = '';
						// 검색 결과 목록에 추가된 항목들을 제거
						removeAllChildNods(listEl);
						// 지도에 표시되고 있는 마커를 제거
						removeMarker();
						// eslint-disable-next-line no-plusplus
						for (let i = 0; i < displayPlace.length; i++) {
							// 마커를 생성하고 지도에 표시
							const placePosition = new kakao.maps.LatLng(displayPlace[i].y, displayPlace[i].x);
							const marker = addMarker(placePosition, i);
							const itemEl = getListItem(i, displayPlace[i]); // 검색 결과 항목 Element를 생성
							// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표를 추가
							bounds.extend(placePosition);
							// 마커와 검색결과 항목에 mouseover 했을때 해당 장소에 인포윈도우에 장소명을 표시, mouseout 했을 때는 인포윈도우를 닫기
							(function(markers, title) {
								kakao.maps.event.addListener(markers, 'mouseover', function() {
									displayInfowindow(markers, title);
								});
								kakao.maps.event.addListener(markers, 'mouseout', function() {
									infowindowTheater.close();
								});
								itemEl.onmouseover = function() {
									displayInfowindow(markers, title);
								};
								itemEl.onmouseout = function() {
									infowindowTheater.close();
								};
							})(marker, displayPlace[i].place_name);
							fragment.appendChild(itemEl);
						}
						// 검색결과 항목들을 검색결과 목록 Elemnet에 추가
						listEl.appendChild(fragment);
						menuEl.scrollTop = 0;
						// 검색된 장소 위치를 기준으로 지도 범위를 재설정
						map.setBounds(bounds);
					};
					// 영화관 검색 호출
					const callback = function(result, status) {
						if (status === kakao.maps.services.Status.OK) {
							that.searchPosition = result;
							const bounds = new kakao.maps.LatLngBounds();
							// eslint-disable-next-line no-plusplus
							for (let i = 0; i < that.searchPosition.length; i++) {
								displayMarker(new kakao.maps.LatLng(that.searchPosition[i].y, that.searchPosition[i].x), message, 'theaterLocation');
								bounds.extend(new kakao.maps.LatLng(that.searchPosition[i].y, that.searchPosition[i].x));
							}
							map.setBounds(bounds);
							// 검색 목록과 마커를 표출합니다
							displayPlaces(result);
						}
					};
					// 영화관 검색 범위 옵션
					const option = { radius: 2000, location: locPosition, sort: 'distance' };
					places.keywordSearch('영화관', callback, option);
					displayMarker(locPosition, message, 'myLocation');
				});
			} else {
				alert('현재위치를 잡지 못해서 영화관을 검색할 수 없습니다.');
			}
		},
	},
};
</script>

<style scoped>
.wrap-map {
	width: 100%;
	height: 280px;
	position: fixed;
	left: 0;
	top: 55px;
	border-bottom: 1px solid #ccc;
}
.info-txt {
	background-color: #fff;
	padding: 15px;
	font-size: 11px;
	text-align: left;
	line-height: 1.4;
}
.info-txt span {
	color: #e74c3c;
}
#mapArea {
	width: 100%;
	height: 220px;
	margin: auto;
	color: #000;
}
#wrapPlacesList {
	padding: 290px 10px 0;
	text-align: left;
	font-weight: 400;
	background-color: #fff;
	font-size: 13px;
}
.item {
	display: block;
	border-bottom: 1px solid #3c3c3c;
}
/* banner */
h2 {
	text-align: left;
	padding: 20px;
	color: #fff;
}
.link-banner {
	margin-bottom: 10px;
}
.link-banner a {
	display: block;
	position: relative;
	background-color: #e74c3c;
	font-size: 13px;
	text-align: left;
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
</style>
