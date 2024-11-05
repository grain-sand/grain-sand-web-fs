import {ISingleFilePickerOptions} from "../opfs";
import {openFile} from "./openFile";
import {Base64DataURL, BlobTypes, EncodingType, formatBytes, readBlob} from "grain-sand-base";
import {FileOpenAccept, IFileData} from "../next-lib";
import {DefaultReadMaxSize, FileSizeError} from "../error/FileSizeError";

export type ReadFile = File | FileOpenAccept | ISingleFilePickerOptions | FileSystemFileHandle

/**
 * 读取文本文件内容
 * @param type
 * @param file 文件对象,或用于打开文件对话框可接受的类型
 * @param maxSize 允许读取文件的最大大小,单位为字节,默认为20M字节; 当文件大小超过此值时会抛出FileSizeError; 当文件大小超过此值时会抛出FileSizeError
 * @param encoding 文本编码默认为 utf-8
 */
export function readFile(type: BlobTypes.Text, file?: ReadFile, maxSize?: number, encoding?: EncodingType): Promise<IFileData<string> | undefined>;

/**
 * 将文件数据读取并编码为Base64 Data URL
 * @param type
 * @param file 文件对象,或用于打开文件对话框可接受的类型
 * @param maxSize 允许读取文件的最大大小,单位为字节,默认为20M字节; 当文件大小超过此值时会抛出FileSizeError
 */
export function readFile(type: BlobTypes.Base64, file?: ReadFile, maxSize?: number): Promise<IFileData<Base64DataURL> | undefined>;

/**
 * 将文件内容加载到缓存
 * @param type
 * @param file
 * @param maxSize 允许读取文件的最大大小,单位为字节,默认为20M字节; 当文件大小超过此值时会抛出FileSizeError
 */
export function readFile(type: BlobTypes.Buffer, file?: ReadFile, maxSize?: number): Promise<IFileData<ArrayBuffer> | undefined>;

/**
 * 读取图片内容,并创建HTMLImageElement
 * @param type
 * @param file
 * @param maxSize 允许读取文件的最大大小,单位为字节,默认为20M字节; 当文件大小超过此值时会抛出FileSizeError
 */
export function readFile(type: BlobTypes.Image, file?: ReadFile, maxSize?: number): Promise<IFileData<HTMLImageElement> | undefined>;

/**
 * 读取Svg图片内容,并创建Svg元素
 * @param type
 * @param file
 * @param maxSize 允许读取文件的最大大小,单位为字节,默认为20M字节; 当文件大小超过此值时会抛出FileSizeError
 */
export function readFile(type: BlobTypes.Svg, file?: ReadFile, maxSize?: number): Promise<IFileData<HTMLUnknownElement> | undefined>;

/**
 * 读取图片内容,并创建位图
 *
 * @warning 仅支持位图图片
 *
 * @param type
 * @param file
 * @param maxSize 允许读取文件的最大大小,单位为字节,默认为20M字节; 当文件大小超过此值时会抛出FileSizeError
 */
export function readFile(type: BlobTypes.Bitmap, file?: ReadFile, maxSize?: number): Promise<IFileData<ImageBitmap> | undefined>;

export async function readFile(type: BlobTypes, readFile: ReadFile | undefined, maxSize?: number, encoding?: EncodingType): Promise<IFileData<any> | undefined> {
	if (!readFile) {
		switch (type) {
			case BlobTypes.Text:
				readFile = await openFile('.text;.txt')
				break;
			case BlobTypes.Svg:
				readFile = await openFile('.svg')
				break;
			case BlobTypes.Base64:
				readFile = await openFile()
				break;
			case BlobTypes.Image:
			case BlobTypes.Bitmap:
				readFile = await openFile('.jpg;.png;.gif;.webp;.svg')
				break;
		}
	}
	if (!(readFile instanceof Blob)) {
		readFile = await openFile(readFile);
	}
	if (!readFile) return;
	maxSize || (maxSize = DefaultReadMaxSize)
	const file = readFile as File;
	if (file.size > maxSize!) {
		throw new FileSizeError(file.size, maxSize!)
	}
	return {
		file,
		name: file.name,
		content: await readBlob(file, type, encoding!)
	}
}