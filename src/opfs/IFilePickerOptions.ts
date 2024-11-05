import {IFileEntryPickerOptions} from "./IFileEntryPickerOptions";

export interface IFilePickerOptionsType {

	/**
	 * 允许的文件类型类别的可选描述。默认为空字符串。
	 */
	description?: string

	/**
	 * 一个 Object，其键设置为 MIME 类型，值设置为文件扩展名的数组,如:
	 * ```ts
	 *  accept: {
	 *     "image/*": [".png", ".gif", ".jpeg", ".jpg"],
	 *   },
	 * ```
	 */
	accept: Record<string, string[]>
}

export interface IFilePickerOptions extends IFileEntryPickerOptions {

	/**
	 * 布尔值，默认为 false。默认情况下，选择器应包含一个不应用任何文件类型过滤器的选项（通过下面的类型选项启动）。将此选项设置为 true 意味着该选项不可用。
	 */
	excludeAcceptAllOption?: boolean

	/**
	 * 允许选择的文件类型的数组。每个项目都是一个具有以下选项的对象
	 */
	types?: IFilePickerOptionsType[]

}

/**
 * 定义打开文件对话框的参数
 * [选项参数文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showOpenFilePicker#options)
 */
export interface IOpenFilePickerOptions extends IFilePickerOptions {

	/**
	 * 布尔值，默认为 false。当设置为 true 时，可以选择多个文件。
	 */
	multiple?: boolean

}

/**
 * 定义保存文件对话框的参数
 * [选项参数文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showSaveFilePicker#options)
 */
export interface ISaveFilePickerOptions extends IFilePickerOptions {

	/**
	 * 建议的文件名。
	 */
	suggestedName?: string

}

/**
 * 定义单选文件对话框的参数
 * [选项参数文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showOpenFilePicker#options)
 */
export interface ISingleFilePickerOptions extends IFilePickerOptions {
	multiple?: false
}

/**
 * 定义多选文件对话框的参数
 *
 * [选项参数文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showOpenFilePicker#options)
 */
export interface IMultipleFilePickerOptions extends IFilePickerOptions {
	multiple: true
}