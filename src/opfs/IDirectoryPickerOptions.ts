import {IFileEntryPickerOptions} from "./IFileEntryPickerOptions";

export interface IDirectoryPickerOptions extends IFileEntryPickerOptions {

	/**
	 * 字符串，默认为 "read"，用于只读访问，或 "readwrite" 用于读写访问。
	 */
	mode: "read"|"readwrite"

}