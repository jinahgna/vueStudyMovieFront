import Vue from 'vue';
import VueRouter from 'vue-router';
import LayoutDefault from '@/views/layout/LayoutDefault';
import pageGroup1 from '@router/pageGroup/pageMovie';

Vue.use(VueRouter);

const routes = [
	// { path: '*', component: NotFoundComponent }, // 404 page
	{ path: '/', name: 'Home', component: LayoutDefault, children: pageGroup1 },
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

/**
 * @description router에서 화면 전환이 발생하는 경우 특정 예외 처리및 화면 이동 전 수행되어야 하는것을 처리
 *
 * @param {object} to - 다음 화면 정보
 * @param {object} from - 이전 화면 정보
 * @param {function} next - 다음 화면으로 진행하기 위한 함수
 */
router.beforeEach((to, from, next) => {
	console.log(`router.beforeEach`);
	console.log(`to:`, to);
	console.log(`from:`, from);
	next();
});

export default router;
