<template>
	<div class="search">
		<div class="wrap-search-movie">
			<div class="search-area">
				<input type="text" v-model="searchText" placeholder="영화 제목을 입력해주세요." />
				<button @click="searchMovie()"></button>
			</div>
			<ul>
				<li v-for="(list, index) in searchMovieData.items" :key="index">
					<a v-bind:href="list.link">
						<figure>
							<img v-bind:src="list.image" alt="" />
						</figure>
						<div class="info-txt">
							<strong v-html="list.title"></strong><br />
							<span>{{ list.pubDate }}</span>
							<p>{{ list.actor }}</p>
							<p>{{ list.director }}</p>
							<p class="point-color">★{{ list.userRating }}</p>
						</div>
					</a>
				</li>
			</ul>
			<div class="text-no-list" v-if="textNoList">
				검색하신 영화 정보를 찾을 수 없습니다.
			</div>
		</div>
	</div>
</template>

<script>
import commonMutationType from '@/store/mutationsType';
import commonActionType from '@/store/actionsType';

export default {
	name: 'Search',
	components: {},
	data() {
		return {
			searchText: '',
			searchMovieData: '',
			movieData: '',
			textNoList: false,
		};
	},
	methods: {
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
			this.searchMovieData = this.$store.state.movie.searchMovieData.result;
			if (this.searchMovieData.display === 0) {
				this.textNoList = true;
			} else {
				this.textNoList = false;
				// eslint-disable-next-line no-plusplus
				// for (let i = 0; i < this.searchMovieData.items.length; i++) {
				// 	this.movieData.push(this.searchMovieData.items[i]);
				// 	this.movieData[i].actor = this.searchMovieData.items[i].actor.substring(0, this.searchMovieData.items[i].actor.length - 1);
				// 	this.movieData[i].director = this.searchMovieData.items[i].director.substring(0, this.searchMovieData.items[i].director.length - 1);
				// 	console.log('this.searchMovieData.items.length', this.searchMovieData.items.length);
				// 	console.log('this.movieData[i].actor', this.movieData[i].actor);
				// }
			}
		},
	},
};
</script>

<style scoped>
.info-txt .point-color {
	color: #e74c3c;
}
.text-no-list {
	font-size: 12px;
	padding-bottom: 40px;
	font-weight: 200;
	color: #e74c3c;
}
.search-area {
	display: flex;
	justify-content: space-between;
	margin: 20px auto;
	border-bottom: 1px solid #e74c3c;
	width: 80%;
}
.search-area input {
	background-color: transparent;
	border: 0;
	padding: 10px;
	color: #fff;
}
button {
	width: 30px;
	height: 30px;
	background: url(../assets/iconSearch.png) 50% 50% no-repeat;
	background-size: 25px;
	color: #fff;
}
ul {
	padding: 20px;
}
ul li {
	color: #fff;
	border-bottom: 1px solid #3c3c3c;
	padding: 10px 0;
}
ul li a {
	display: flex;
	align-items: center;
	color: #fff;
}
ul li figure {
	width: 110px;
	margin-right: 10px;
	background-color: #fff;
}
ul li img {
	position: relative;
	max-width: 110px;
	min-height: 60px;
}
ul li img:after {
	content: '이미지 준비중';
	display: block;
	position: absolute;
	left: 0;
	top: 0;
	font-size: 11px;
	font-weight: 200;
	color: #989898;
	text-align: center;
	padding-top: 22%;
	clear: both;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	background-color: #3a1515;
}
.info-txt {
	width: calc(100% - 120px);
	text-align: left;
	font-size: 14px;
	line-height: 1.5;
}
.info-txt p {
	font-size: 12px;
	color: #ddd;
}
</style>
