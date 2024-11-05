export type StartInType = FileSystemHandle | "desktop" | "documents" | "downloads" | "music" | "pictures" | "videos";

export interface IFileEntryPickerOptions {

	/**
	 * 通过指定 ID，浏览器可以为不同的 ID 记住不同的目录。如果相同的 ID 用于另一个选择器，则该选择器将在同一目录中打开。
	 */
	id?: string

	/**
	 * 一个 FileSystemHandle 对象或一个众所周知的目录（"desktop"、"documents"、"downloads"、"music"、"pictures" 或 "videos"）以指定打开选择器的起始目录。
	 */
	startIn?: StartInType

}