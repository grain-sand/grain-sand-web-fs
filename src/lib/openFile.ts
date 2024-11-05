import {IMultipleFilePickerOptions, ISingleFilePickerOptions, StartInType} from "../opfs";
import {isFunction} from "grain-sand-base";
import {openFileByInput} from "./openFileByInput";
import {FileOpenAccept} from "../next-lib";
import {parseOpenFileHandlerArg} from "../private/parseOpenFileHandlerArg";

/**
 * 当参数为FileSystemFileHandle时,会请求权限并返回File
 * 当不存在时,将以浏览器兼容的方式打开单选文件选择对话框,并返回用户选择的文件
 *
 * @warning 在Firefox、Safari与移动端浏览,由于FileInput原生API的设计缺陷,如果用户选择了取消将永久异步阻塞
 *
 * @param acceptOrHandler 定义文件选择器接受的数据类型,或曾经保存过的文件句柄,可为undefined
 * @param startIn 指定打开选择器的起始目录,仅在Chrome、Edge、Opera生效
 */
export function openFile(acceptOrHandler?: FileOpenAccept | ISingleFilePickerOptions | FileSystemFileHandle, startIn?: StartInType): Promise<File | undefined | never>;

/**
 * 以浏览器兼容的方式打开单选文件选择对话框,并返回用户选择的文件
 *
 * @warning 在Firefox、Safari与移动端浏览,由于FileInput原生API的设计缺陷,如果用户选择了取消将永久异步阻塞
 *
 * [选项参数文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showOpenFilePicker#options)
 * @param options
 */
export function openFile(options: ISingleFilePickerOptions): Promise<File | undefined | never>;

/**
 * 当fileHandler存在时,会请求权限并返回File
 * 当不存在时,将以浏览器兼容的方式打开单选文件选择对话框,并返回用户选择的文件
 *
 * @warning 在Firefox、Safari与移动端浏览,由于FileInput原生API的设计缺陷,如果用户选择了取消将永久异步阻塞
 *
 * @param fileHandler 曾经保存过的文件句柄,可为undefined
 * @param accept 定义文件选择器接受的数据类型
 * @param startIn 指定打开选择器的起始目录,仅在Chrome、Edge、Opera生效
 */
export function openFile(fileHandler: FileSystemFileHandle | undefined, accept?: FileOpenAccept, startIn?: StartInType): Promise<File | undefined | never>;

/**
 * 当fileHandler存在时,会请求权限并返回File
 * 当不存在时,将以浏览器兼容的方式打开单选文件选择对话框,并返回用户选择的文件
 *
 * @warning 在Firefox、Safari与移动端浏览,由于FileInput原生API的设计缺陷,如果用户选择了取消将永久异步阻塞
 *
 * @param fileHandler 曾经保存过的文件句柄,可为undefined
 * @param options 选项 [选项参数文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showOpenFilePicker#options)
 */
export function openFile(fileHandler: FileSystemFileHandle | undefined, options: ISingleFilePickerOptions): Promise<File | undefined | never>;

/**
 * 以浏览器兼容的方式打开多选文件选择对话框,并返回用户选择的文件
 *
 * @warning 在Firefox、Safari与移动端浏览,由于FileInput原生API的设计缺陷,如果用户选择了取消将永久异步阻塞
 *
 * @param options 选项 [选项参数文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showOpenFilePicker#options)
 */
export function openFile(options: IMultipleFilePickerOptions): Promise<File[] | undefined | never>;

/**
 * 以浏览器兼容的方式打开多选文件选择对话框,并返回用户选择的文件
 *
 * @warning 在Firefox、Safari与移动端浏览,由于FileInput原生API的设计缺陷,如果用户选择了取消将永久异步阻塞
 *
 * @param multiple 指定多选
 * @param startIn 指定打开选择器的起始目录,仅在Chrome、Edge、Opera生效
 */
export function openFile(multiple: true, startIn?: StartInType): Promise<File[] | undefined | never>;

/**
 * 以浏览器兼容的方式打开多选文件选择对话框,并返回用户选择的文件
 *
 * @warning 在Firefox、Safari与移动端浏览,由于FileInput原生API的设计缺陷,如果用户选择了取消将永久异步阻塞
 *
 * @param accept 定义文件选择器接受的数据类型
 * @param multiple 指定多选
 * @param startIn 指定打开选择器的起始目录,仅在Chrome、Edge、Opera生效
 */
export function openFile(accept: FileOpenAccept, multiple: true, startIn?: StartInType): Promise<File[] | undefined | never>;

export async function openFile(...args: any[]): Promise<any> {
	let i = 0;
	const handler: FileSystemFileHandle | undefined = args[0] instanceof FileSystemFileHandle ? args[0] : undefined as any;
	if (await (handler?.requestPermission({mode: 'read'})) === 'granted') {
		return await handler!.getFile();
	}
	const options = parseOpenFileHandlerArg(args);
	if (isFunction((globalThis as any).showOpenFilePicker)) {
		try {
			const result = await (globalThis as any).showOpenFilePicker(options) as FileSystemFileHandle[];
			if (options.multiple) {
				return await Promise.all(result.map(h => h.getFile()));
			} else {
				return await result[0].getFile();
			}
		} catch (e: any) {
			switch (e.name) {
				case 'AbortError':
					return undefined;
				default:
					throw e;
			}
		}
	}
	const  accept = options.types?.length?options.types.flatMap((t => {
		return t.accept ? Object.values(t.accept as any).flat() : undefined
	})):[];
	return openFileByInput(accept as string[], options.multiple as any)
}