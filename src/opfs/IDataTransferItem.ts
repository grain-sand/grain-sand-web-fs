/**
 *
 * 拖拽项。在一个拖拽操作*中，*每一个 drag event 都有一个dataTransfer 属性，它包含一个存有拖拽数据的 list ，其中每一项都是一个 DataTransferItem 。
 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransferItem)
 */
export interface IDataTransferItem {

	kind: 'file' | 'string' | 'filesystem' | 'directory' | 'string[]' | 'filesystem[]' | 'directory[]' | 'mixed' | string;

	type: 'text/plain' | 'text/html' | string;

	/**
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransferItem/webkitGetAsEntry)
	 */
	getAsFile(): File | null | undefined;

	/**
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransferItem/getAsString)
	 */
	getAsString(callback: FunctionStringCallback | null): void;

	/**
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransferItem/getAsFileSystemHandle)
	 */
	getAsFileSystemHandle(): FileSystemDirectoryHandle | FileSystemFileHandle | null | undefined;

}