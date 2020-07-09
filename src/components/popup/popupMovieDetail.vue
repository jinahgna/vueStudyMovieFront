<template>
	<div class="popup-movie-detail">
		<div class="header">
			<button class="btn-close" @click="popupClose">x</button>
		</div>
		<div class="content">
			<slot name="p-movie-title"></slot>
			<slot name="p-movie-genre"></slot>
			<slot name="p-movie-director"></slot>
			<slot name="p-movie-actor"></slot>
			<slot name="p-movie-desc"></slot>
			<slot name="p-movie-link"></slot>
		</div>
	</div>
</template>

<script>
import commonMutationType from '@/store/mutationsType';
import commonActionType from '@/store/actionsType';

export default {
	name: 'popupMovieDetail',
	props: [],
	components: {},
	data() {
		return {};
	},
	methods: {
		popupClose() {
			this.$emit('popupEvent', 'popupClose');
		},
	},
};
</script>

<style scoped>
.popup-movie-detail {
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 10;
	background-color: #fff;
	padding: 20px;
	width: 100%;
	box-sizing: border-box;
	border-radius: 20px 20px 0 0;
}
.btn-close {
	display: inline-block;
	position: absolute;
	right: 10px;
	top: 10px;
	font-size: 20px;
	color: #000;
}
</style>
