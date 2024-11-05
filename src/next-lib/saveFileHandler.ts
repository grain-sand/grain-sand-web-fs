import {isFunction, isString} from "grain-sand-base";
import {ISaveFilePickerOptions, StartInType} from "../opfs";

/**
 * 保存文件
 *
 * @warning 不兼容Firefox、Safari与移动端
 *
 * @param nameOrHandler 类型为FileSystemFileHandle,且能取得写入权限时将直接写入,否则将打开保存文件对话框
 * @param content
 * @param parentOrStartIn 类型为FileSystemDirectoryHandle,且能取得写入权限时将直接写入,否则将作为打开文件对话框的起始位置
 */
export async function saveFileHandler(nameOrHandler: string | FileSystemFileHandle, content: FileSystemWriteChunkType, parentOrStartIn?: StartInType): Promise<FileSystemFileHandle> {
	if (nameOrHandler instanceof FileSystemFileHandle
		&& (!isFunction(nameOrHandler.requestPermission) || await nameOrHandler.requestPermission({mode: 'readwrite'}) === 'granted')) {
		const writable = await nameOrHandler.createWritable();
		try {
			await writable.write(content);
		} finally {
			await writable.close();
		}
		return nameOrHandler;
	}
	if (parentOrStartIn && isString(nameOrHandler) && parentOrStartIn instanceof FileSystemDirectoryHandle
		&& (await parentOrStartIn.requestPermission({mode: 'readwrite'})) === 'granted') {
		return await saveFileHandler(await parentOrStartIn.getFileHandle(nameOrHandler as string, {create: true}), content);
	}
	const suggestedName = nameOrHandler instanceof FileSystemHandle ? nameOrHandler.name : `${nameOrHandler}`;
	const options: ISaveFilePickerOptions = {suggestedName};
	const dotIndex = suggestedName.lastIndexOf('.');
	dotIndex > -1 && (options.types = [{accept: {'*/*': [suggestedName.slice(dotIndex)]}}]);
	parentOrStartIn && (options.startIn = parentOrStartIn);
	return await saveFileHandler(await (globalThis as any).showSaveFilePicker(options), content);
}