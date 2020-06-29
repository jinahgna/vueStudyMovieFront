<template>
	<div class="layoutDefault">
		<div class="header">
			<a href="/home"><img src="@/assets/iconLogo.png" alt="아이콘로고"/></a>
			<a href="/search">SEARCH<br />MOVIE</a>
			<a href="/theater">LOCATION<br />THEATER</a>
		</div>
		<router-view></router-view>
		<div class="footer">
			Copyright ⓒ 2020 by Gna All Rights Reserved.
		</div>
	</div>
</template>

<style scoped>
.layoutDefault {
	position: relative;
	padding-bottom: 50px;
}
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 20px;
}
.footer {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	padding: 20px 0;
	color: #fff;
	font-size: 11px;
	font-weight: 200;
	opacity: 0.5;
}
.header img {
	width: 35px;
}
.header a {
	width: 60px;
	color: #fff;
	font-size: 12px;
	line-height: 1.2;
}
</style>
