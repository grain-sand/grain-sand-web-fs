import {createRouter, createWebHashHistory, Router, RouteRecordRaw} from "vue-router";

export function addRouter(name: string, path?: string, file?: string) {
	name = name.replace(/\.vue/i,'');
	path = path ?? `/${name.toLowerCase()}`;
	file = file ?? `../${name}.vue`
	return {
		name,
		path,
		component: () => import(/* @vite-ignore */file)
	}
}

export interface IConsoleOptions {
	readonly clear?: boolean
	readonly showRoute?: boolean
}
export function defineRouters(routes:RouteRecordRaw[],options: IConsoleOptions={}): any {
	const router:Router = createRouter({
		history: createWebHashHistory(),
		routes
	})

	router.beforeEach((to, from, next)=>{
		if(options.clear) {
			console.clear()
		}
		if(options.showRoute) {
			console.log(to.name)
		}
		next()
	})

	return router;
}