import {ICreateWritableOptions} from "./ICreateWritableOptions";


/**
 *
 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemFileHandle)
 */
export interface IFileSystemFileHandle extends FileSystemHandle {

	getFile(): Promise<File>;

	createWritable(options: ICreateWritableOptions): Promise<FileSystemWritableFileStream>;

}