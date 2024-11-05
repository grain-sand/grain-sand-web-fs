/**
 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemDirectoryHandle)
 */
export interface IFileSystemDirectoryHandle extends FileSystemHandle {

	/**
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemDirectoryHandle/entries)
	 * @returns 返回一个异步迭代器，用于迭代调用此方法的 FileSystemDirectoryHandle 中的条目的键值对。键值对是一个 [key, value] 形式的数组。
	 */
	entries(): AsyncIterable<FileSystemHandle>

	/**
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemDirectoryHandle/getFileHandle)
	 */
	getFileHandle(name: string, options?: { create: boolean }): Promise<FileSystemFileHandle>;

	/**
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemDirectoryHandle/getDirectoryHandle)
	 */
	getDirectoryHandle(name: string, options?: { create: boolean }): Promise<IFileSystemDirectoryHandle>;

	/**
	 * 查找被选择文件相对于指定目录句柄的路径。
	 * ```ts
	 *     // 通过显示文件选择器来获得一个文件句柄
	 *   const [handle] = await self.showOpenFilePicker();
	 *   if (!handle) {
	 *     // 如果用户取消了选择或者打开文件失败
	 *     return;
	 *   }
	 *
	 *   // 检查文件句柄是否存在于目录句柄的目录中
	 *   const relativePaths = await directoryHandle.resolve(handle);
	 * ```
	 *
	 *
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemDirectoryHandle/resolve)
	 */
	resolve(possibleDescendant: FileSystemHandle): Promise<string[] | null>;

	/**
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemDirectoryHandle/values)
	 */
	values(): AsyncIterable<FileSystemHandle>

	/**
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemDirectoryHandle/removeEntry)
	 */
	removeEntry(name: string, options?: {
		/**
		 * 布尔值，默认为 false。当设为 true 时，条目将会被递归移除。
		 */
		recursive?: boolean
	}): Promise<void>;

}
