import {Base64DataURL} from "grain-sand-base";

export type FileSuffix = `.${string}`;


export type ReadContent = Base64DataURL | string | ArrayBuffer | HTMLImageElement | ImageBitmap | HTMLUnknownElement;


export interface IReadData<T extends ReadContent> {

	name: string;

	content: T;

}

export interface IFileData<T extends ReadContent> extends IReadData<T> {

	file: File

}

export interface IFileHandlerData<T extends ReadContent> extends IFileData<T> {

	fileHandler: FileSystemFileHandle

}