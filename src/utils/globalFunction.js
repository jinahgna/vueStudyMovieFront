import * as apiModule from '@/api/index';

let globalFunction = {};

/**
 * @description axios function
 */
globalFunction = Object.assign({}, apiModule);

/**
 * @description sample function
 * @example this.$globalFunctions.sample() or Vue.prototype.$globalFunctions.sample()
 */
globalFunction.sample = () => {
	try {
		return console.log(`sample function`);
	} catch (error) {
		return console.log(`sample function, error: ${error}`);
	}
};

const globalFunctions = {
	install(Vue) {
		Vue.prototype.$globalFunctions = globalFunction;
	},
};

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(globalFunctions);
}

export default globalFunctions;
