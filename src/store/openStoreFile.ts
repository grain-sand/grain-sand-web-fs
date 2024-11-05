import {isFunction} from "grain-sand-base";
import {FileNotFoundError} from "../error";

/**
 * 打开存储文件
 * @param nameOrHandler
 * @param mode
 */
export async function openStoreFile(nameOrHandler: string | FileSystemFileHandle, mode: 'read' | 'readwrite' = 'read'): Promise<FileSystemFileHandle> {
	if (nameOrHandler instanceof FileSystemFileHandle) {
		if (!isFunction(nameOrHandler.requestPermission) || await nameOrHandler.requestPermission({mode}) === 'granted') {
			return nameOrHandler
		}
		nameOrHandler = nameOrHandler.name;
	}
	return (await navigator.storage.getDirectory()).getFileHandle(nameOrHandler, {create: mode === 'readwrite'});
}