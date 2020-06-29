<template>
	<div class="search">
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
		},
	},
};
</script>

<style scoped>
button {
	color: #fff;
}
</style>
