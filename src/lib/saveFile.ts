import {ISaveFilePickerOptions, StartInType} from "../opfs";
import {isFunction, isObject, isString} from "grain-sand-base";
import {saveFileHandler} from "../next-lib";
import {createDownload} from "./createDownload";
import {NotSuppedError} from "../error";

/**
 * 尽量浏览器兼容的方式保存文件
 *
 * 当浏览器不支持保存文件API时,将改为创建下载文件
 *
 * @param nameOrHandler 类型为FileSystemFileHandle,且能取得写入权限时将直接写入,否则将打开保存文件对话框
 * @param content
 * @param parentOrStartIn 类型为FileSystemDirectoryHandle,且能取得写入权限时将直接写入,否则将作为打开文件对话框的起始位置
 * @param id
 */
export async function saveFile(nameOrHandler: string | FileSystemFileHandle | ISaveFilePickerOptions, content: FileSystemWriteChunkType, parentOrStartIn?: StartInType, id?: string): Promise<FileSystemFileHandle | void> {
	if (nameOrHandler instanceof FileSystemFileHandle || isFunction((globalThis as any).showSaveFilePicker)) {
		// @ts-ignore
		return await saveFileHandler(nameOrHandler, content, parentOrStartIn, id);
	}
	if (isString(content) || content instanceof Blob || content instanceof ArrayBuffer || ArrayBuffer.isView(content)) {
		let name='';
		if(isString(nameOrHandler)) {
			name = nameOrHandler as string;
		} else if( isString((nameOrHandler as any).name)) {
			name = (nameOrHandler as any).name;
		} else if( isString((nameOrHandler as any).suggestedName)) {
			name = (nameOrHandler as any).suggestedName;
		}
		await createDownload(name, content as any);
	} else if (isObject(content) && 'data' in (content as any)) {
		await saveFile(nameOrHandler, (content as any).data, parentOrStartIn);
	} else {
		throw new NotSuppedError(`${content} is not supported`);
	}
}