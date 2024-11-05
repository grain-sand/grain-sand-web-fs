import {IFileSystemFileHandle} from "./IFileSystemFileHandle";

export * from './IPermissionDescriptor'
export * from './IFilePickerOptions'
export * from './IFileEntryPickerOptions'
export * from './IDirectoryPickerOptions'

import {IWindow} from "./IWindow";
import {IDataTransferItem} from "./IDataTransferItem";
import {IFileSystemDirectoryHandle} from "./IFileSystemDirectoryHandle";
import {IFileSystemHandle} from "./IFileSystemHandle";
import {IPermissions} from "./IPermissions";
import {IFileSystemWritableFileStream} from "./IFileSystemWritableFileStream";

export {
	IWindow,
	IDataTransferItem,
	IFileSystemDirectoryHandle,
	IFileSystemHandle,
	IPermissions,
	IFileSystemWritableFileStream
}

declare global {

	/**
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)
	 */
	interface Window extends IWindow {
	}

	/**
	 * 代表一个文件或一个目录的对象。多个句柄可以代表同一个条目。
	 * 在大多数情况下，你不会直接使用 FileSystemHandle，而是会用到它的 FileSystemFileHandle 和 FileSystemDirectoryHandle 子接口。
	 *
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemHandle)
	 */
	interface FileSystemHandle extends IFileSystemHandle {
	}


	/**
	 * 指向一个文件系统目录的句柄。
	 *
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemDirectoryHandle)
	 */
	interface FileSystemDirectoryHandle extends IFileSystemDirectoryHandle {
	}

	/**
	 *
	 * 表示一个指向文件系统条目的句柄。可通过 window.showOpenFilePicker() 方法来访问此接口。
	 *
	 * 注意，读写操作所依赖的文件访问权限在刷新或关闭页面并且页面所属的源没有其他标签页保持打开的情况下不会继续保有。
	 * queryPermission 方法可用于在访问文件前验证权限状态。
	 *
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemHandle)
	 */
	interface FileSystemFileHandle extends IFileSystemFileHandle {

	}

	/**
	 * 是一类附加了便于操作磁盘上单个文件的方法的 WritableStream 对象。
	 * 这个接口通过 FileSystemFileHandle.createWritable() 方法来访问。
	 *
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemWritableFileStream)
	 */
	interface FileSystemWritableFileStream extends IFileSystemWritableFileStream {

	}

	/**
	 * 提供 Permission API 的核心功能，例如查询和撤消权限的方法。
	 *
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Permissions)
	 */
	interface Permissions extends IPermissions {

	}


	/**
	 * 描述了一个拖拽项。在一个拖拽操作*中，*每一个 drag event 都有一个dataTransfer 属性，
	 * 它包含一个存有拖拽数据的 list ，其中每一项都是一个 DataTransferItem 。
	 *
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransferItem)
	 */
	interface DataTransferItem extends IDataTransferItem {
	}

}

