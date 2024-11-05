import {saveFileHandler} from "../next-lib";
import {openStoreFile} from "./openStoreFile";

export async function saveStoreFile(nameOrHandler: string | FileSystemFileHandle, content: FileSystemWriteChunkType) {
	return await saveFileHandler(await openStoreFile(nameOrHandler,'readwrite'), content);
}