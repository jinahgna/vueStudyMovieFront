import Home from '@/views/Home';
import Search from '@/views/Search';
import Theater from '@/views/Theater';

/**
 * @description webpack code split 적용
 * @param webpackChunkName: 분할되는 js의 그룹화
 */
// const HomeCodeSplit = () => import(/* webpackChunkName: "homeView" */ '@/views/HomeCodeSplit');

const pageGroup1 = [
	{ path: '/home', name: 'homeViewDefault', component: Home },
	{ path: '/search', name: 'Search', component: Search },
	{ path: '/theater', name: 'Theater', component: Theater },
	// { path: '/home/homeView2', name: 'homeViewCodeSplit', component: HomeCodeSplit },
];

export default pageGroup1;
