import {IFilePickerOptionsType, IMultipleFilePickerOptions, ISingleFilePickerOptions, StartInType} from "../opfs";
import {parseOpenFileHandlerArg} from "../private/parseOpenFileHandlerArg";
import {FileSuffix} from "./IReadData";

export interface ISimpleFilePickerOptionsType {

	/**
	 * 允许的文件类型类别的可选描述。默认为空字符串。
	 */
	description?: string

	/**
	 * 值为文件扩展名或扩展名的数组
	 */
	accept: FileSuffix | FileSuffix[]
}

/**
 * 定义文件选择器接受的数据类型,如
 * ```ts
 * '.txt'
 * ```
 * 或
 * ```ts
 * {accept:'.txt',description:'文本文件'}
 * ```
 * 或
 * ```ts
 * {accept:['.jpg','.png'],description:'图片文件'}
 */
export type FileOpenAccept = FileSuffix | FileSuffix[] | ISimpleFilePickerOptionsType | IFilePickerOptionsType;

/**
 * 用于显示一个默认的单选文件选择器，以允许用户选择并返回一个文件句柄。
 *
 * @warning 不兼容Firefox、Safari与移动端
 */
export function openFileHandler(): Promise<FileSystemFileHandle | undefined | never>;

/**
 * 用于显示一个文件选择器，以允许用户选择并返回一个文件句柄。
 *
 * @warning 不兼容Firefox、Safari与移动端
 *
 * @param startIn 指定打开选择器的起始目录。
 */
export function openFileHandler(startIn: FileSystemDirectoryHandle): Promise<FileSystemFileHandle | undefined | never>;

/**
 * 用于显示一个文件选择器，以允许用户选择并返回一个文件句柄。
 *
 * @warning 不兼容Firefox、Safari与移动端
 *
 * @param acceptOrHandler 定义文件选择器接受的数据类型,或曾经保存过的文件句柄,可为undefined
 *
 * @param startIn 指定打开选择器的起始目录
 */
export function openFileHandler(acceptOrHandler: FileOpenAccept | FileSystemFileHandle | undefined, startIn?: StartInType): Promise<FileSystemFileHandle | undefined | never>;

/**
 * 用于显示一个文件选择器，以允许用户选择并返回一个文件句柄。
 *
 * @warning 不兼容Firefox、Safari与移动端
 *
 * @param fileHandler 曾经存储的文件句柄,会在重新请求用户授权后访问, 如果不存在或取得授权不成功,将打开文件选择器
 * @param accept 定义文件选择器接受的数据类型
 * @param startIn 指定打开选择器的起始目录
 */
export function openFileHandler(fileHandler: FileSystemFileHandle | undefined, accept?: FileOpenAccept, startIn?: StartInType): Promise<FileSystemFileHandle | undefined | never>;

/**
 * 用于显示一个文件选择器，以允许用户选择并返回一个文件句柄。
 *
 * @warning 不兼容Firefox、Safari与移动端
 *
 * @param fileHandler 曾经存储的文件句柄,会在重新请求用户授权后访问, 如果不存在或取得授权不成功,将打开文件选择器
 *
 * @param options 选项 [选项参数文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showOpenFilePicker#options)
 */
export function openFileHandler(fileHandler: FileSystemFileHandle | undefined, options: ISingleFilePickerOptions): Promise<FileSystemFileHandle | undefined | never>;

/**
 * 用于显示一个文件选择器，以允许用户选择并返回一个文件句柄。
 *
 * @param options 选项 [选项参数文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showOpenFilePicker#options)
 */
export function openFileHandler(options: ISingleFilePickerOptions): Promise<FileSystemFileHandle | undefined | never>;

/**
 * 用于显示一个文件选择器，以允许用户选择并返回一个文件句柄。
 *
 * @warning 不兼容Firefox、Safari与移动端
 *
 * @param fileHandler 曾经存储的文件句柄,会在重新请求用户授权后访问, 如果不存在或取得授权不成功,将打开文件选择器
 * @param startIn 指定打开选择器的起始目录
 */
export function openFileHandler(fileHandler: FileSystemFileHandle, startIn: StartInType): Promise<FileSystemFileHandle | undefined | never>;

/**
 * 用于显示一个多选文件选择器,以返回用户选择的多个文件句柄
 *
 * @warning 不兼容Firefox、Safari与移动端
 *
 * @param multiple 指定多选
 * @param startIn 指定打开选择器的起始目录
 */
export function openFileHandler(multiple: true, startIn?: StartInType): Promise<FileSystemFileHandle[] | undefined | never>;


/**
 * 用于显示一个多选文件选择器,以返回用户选择的多个文件句柄
 *
 * @warning 不兼容Firefox、Safari与移动端
 *
 * @param multiple 指定多选
 * @param accept 定义文件选择器接受的数据类型
 * @param startIn 指定打开选择器的起始目录
 */
export function openFileHandler(accept: FileOpenAccept, multiple: true, startIn?: StartInType): Promise<FileSystemFileHandle[] | undefined | never>;

/**
 * 用于显示一个多选文件选择器,以返回用户选择的多个文件句柄
 *
 * @param options 选项 [选项参数文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showOpenFilePicker#options)
 */
export function openFileHandler(options: IMultipleFilePickerOptions): Promise<FileSystemFileHandle[] | undefined | never>;

export async function openFileHandler(...args: any[]): Promise<any> {
	const handler: FileSystemFileHandle | undefined = args[0] instanceof FileSystemFileHandle ? args[0] : undefined as any;
	if (await (handler?.requestPermission()) === 'granted') {
		return handler;
	}
	try {
		const options = parseOpenFileHandlerArg(args);
		const result = await (globalThis as any).showOpenFilePicker(options) as FileSystemFileHandle[];
		if (options.multiple) {
			return result;
		} else {
			return result[0];
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