import {IDirectoryPickerOptions} from "./IDirectoryPickerOptions";
import {IOpenFilePickerOptions, ISaveFilePickerOptions} from "./IFilePickerOptions";


/**
 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)
 */
export interface IWindow {

	/**
	 * 用于显示一个文件选择器，以允许用户选择一个或多个文件并返回这些文件的句柄。
	 *
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showOpenFilePicker)
	 *
	 * @warning 不兼容Firefox、Safari与移动端
	 *
	 * @param options
	 */
	showOpenFilePicker(options?: IOpenFilePickerOptions): Promise<FileSystemFileHandle[]>;

	/**
	 * 显示一个目录选择器，以允许用户选择一个目录
	 *
	 * @warning 不兼容Firefox、Safari与移动端
	 *
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showDirectoryPicker)
	 *
	 * @param options
	 */
	showDirectoryPicker(options?: IDirectoryPickerOptions): Promise<FileSystemDirectoryHandle>

	/**
	 * 显示一个文件选择器，以允许用户保存一个文件。可以选择一个已有文件覆盖保存，也可以输入名字新建一个文件。
	 *
	 * @warning 不兼容Firefox、Safari与移动端
	 *
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showSaveFilePicker)
	 *
	 * @param options
	 */
	showSaveFilePicker(options?: ISaveFilePickerOptions): Promise<FileSystemFileHandle>;

}