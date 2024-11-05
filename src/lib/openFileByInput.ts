import {isArray, isBoolean, isNumber, isString, wait} from "grain-sand-base";

/**
 * 创建一个 FileInput 并获取选择的文件
 *
 * @warning 由于FileInput原生API的设计缺陷,如果用户选择了取消将永久异步阻塞
 *
 * @param accept
 * @param timeout 单位毫秒,用于应对FileInput原生API的设计缺陷的用户选择取消的情况,超时时强制返回
 */
export function openFileByInput(accept?: string | string[], timeout?: number): Promise<File | never>;


/**
 * 创建一个 FileInput 并获取选择的文件
 *
 * @warning 由于FileInput原生API的设计缺陷,如果用户选择了取消将永久异步阻塞
 *
 * @param multiple
 * @param timeout 单位毫秒,用于应对FileInput原生API的设计缺陷的用户选择取消的情况,超时时强制返回
 */
export function openFileByInput(multiple: true, timeout?: number): Promise<FileList | never>;


/**
 * 创建一个单选 FileInput 并获取选择的文件
 *
 * @warning 由于FileInput原生API的设计缺陷,如果用户选择了取消将永久异步阻塞
 *
 * @param accept
 * @param multiple
 * @param timeout 单位毫秒,用于应对FileInput原生API的设计缺陷的用户选择取消的情况,超时时强制返回
 */
export function openFileByInput(accept: string | string[], multiple: false, timeout?: number): Promise<File | never>;

/**
 * 创建一个多选 FileInput 并获取选择的文件
 *
 * @warning 由于FileInput原生API的设计缺陷,如果用户选择了取消将永久异步阻塞
 *
 * @param accept
 * @param multiple
 * @param timeout 单位毫秒,用于应对FileInput原生API的设计缺陷的用户选择取消的情况,超时时强制返回
 */
export function openFileByInput(accept: string | string[], multiple: true, timeout?: number): Promise<FileList | never>;

export function openFileByInput(...args: any[]): Promise<any> {
	return new Promise(async (resolve) => {
		let i = 0;
		args[i] === undefined && i++;
		const accept: string = isArray(args[i]) ? args[i++].join(',') : isString(args[i]) ? args[i++] : '';
		const multiple: boolean = isBoolean(args[i]) ? args[i++] : false;
		const timeout: number = isNumber(args[i]) ? args[i++] : 0;
		const doc = globalThis.document;
		const input = doc.createElement('input');
		input.type = 'file';
		input.multiple = multiple;
		input.accept = Array.isArray(accept) ? accept.join(',') : accept as string;
		input.style.display = 'none';
		input.onchange = () => resolve(multiple ? input.files : input.files?.[0])
		doc.body.appendChild(input);
		input.click();
		doc.body.removeChild(input)
		if (timeout) {
			await wait(timeout);
			resolve(multiple ? input.files : input.files?.[0])
		}
	})
}