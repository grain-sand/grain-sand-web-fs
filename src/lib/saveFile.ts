import {StartInType} from "../opfs";
import {isFunction, isObject, isString} from "grain-sand-base";
import {saveFileHandler} from "../next-lib";
import {createDownload} from "./createDownload";
import {NotSuppedError} from "../error/NotSuppedError";

/**
 * 尽量浏览器兼容的方式保存文件
 *
 * 当浏览器不支持保存文件API时,将改为创建下载文件
 *
 * @param nameOrHandler 类型为FileSystemFileHandle,且能取得写入权限时将直接写入,否则将打开保存文件对话框
 * @param content
 * @param parentOrStartIn 类型为FileSystemDirectoryHandle,且能取得写入权限时将直接写入,否则将作为打开文件对话框的起始位置
 */
export async function saveFile(nameOrHandler: string | FileSystemFileHandle, content: FileSystemWriteChunkType, parentOrStartIn?: StartInType): Promise<FileSystemFileHandle | void> {
	if (nameOrHandler instanceof FileSystemFileHandle || isFunction((globalThis as any).showSaveFilePicker)) {
		return await saveFileHandler(nameOrHandler, content, parentOrStartIn);
	}
	if (isString(content) || content instanceof Blob || content instanceof ArrayBuffer || ArrayBuffer.isView(content)) {
		await createDownload(nameOrHandler, content as any);
	} else if (isObject(content) && 'data' in (content as any)) {
		await saveFile((content as any).data, nameOrHandler, parentOrStartIn);
	} else {
		throw new NotSuppedError(`${content} is not supported`);
	}
}