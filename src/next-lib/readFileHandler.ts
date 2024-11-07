import {IFileHandlerData} from "./IReadData";
import {FileOpenAccept, openFileHandler} from "./openFileHandler";
import {ISingleFilePickerOptions} from "../opfs";
import {DefaultReadMaxSize, FileSizeError} from "../error";
import {BlobTypes, Base64DataURL, readBlob} from "grain-sand-data";
import {EncodingType} from "grain-sand-base";

export type ReadFileHandler = FileSystemFileHandle | FileOpenAccept | ISingleFilePickerOptions;

/**
 * 读取文本文件内容
 *
 * @warning 不兼容Firefox、Safari与移动端
 *
 * @param type
 * @param readFileHandler 文件对象,或用于打开文件对话框可接受的类型
 * @param maxSize 允许读取文件的最大大小,单位为字节,默认为20M字节; 当文件大小超过此值时会抛出FileSizeError
 * @param encoding 文本编码默认为 utf-8
 */
export function readFileHandler(type: BlobTypes.Text, readFileHandler?: ReadFileHandler, maxSize?: number, encoding?: EncodingType): Promise<IFileHandlerData<string> | undefined>;

/**
 * 将文件数据读取并编码为Base64 Data URL
 *
 * @warning 不兼容Firefox、Safari与移动端
 *
 * @param type
 * @param readFileHandler 文件对象,或用于打开文件对话框可接受的类型
 * @param maxSize 允许读取文件的最大大小,单位为字节,默认为20M字节; 当文件大小超过此值时会抛出FileSizeError
 */
export function readFileHandler(type: BlobTypes.Base64, readFileHandler?: ReadFileHandler, maxSize?: number): Promise<IFileHandlerData<Base64DataURL> | undefined>;


/**
 * 读取图片内容,并创建HTMLImageElement
 *
 * @warning 不兼容Firefox、Safari与移动端
 *
 * @param type
 * @param readFileHandler
 * @param maxSize 允许读取文件的最大大小,单位为字节,默认为20M字节; 当文件大小超过此值时会抛出FileSizeError
 */
export function readFileHandler(type: BlobTypes.Image, readFileHandler?: ReadFileHandler, maxSize?: number): Promise<IFileHandlerData<HTMLImageElement> | undefined>;

/**
 * 读取Svg文件内容,并创建Svg元素
 *
 * @warning 不兼容Firefox、Safari与移动端
 *
 * @param type
 * @param readFileHandler
 * @param maxSize 允许读取文件的最大大小,单位为字节,默认为20M字节; 当文件大小超过此值时会抛出FileSizeError
 */
export function readFileHandler(type: BlobTypes.Svg, readFileHandler?: ReadFileHandler, maxSize?: number): Promise<IFileHandlerData<HTMLUnknownElement> | undefined>;

/**
 * 读取图片内容,并创建位图
 *
 * @warning 不兼容Firefox、Safari与移动端
 *
 * @warning 仅支持位图图片
 *
 * @param type
 * @param readFileHandler
 * @param maxSize 允许读取文件的最大大小,单位为字节,默认为20M字节; 当文件大小超过此值时会抛出FileSizeError
 */
export function readFileHandler(type: BlobTypes.Bitmap, readFileHandler?: ReadFileHandler, maxSize?: number): Promise<IFileHandlerData<ImageBitmap> | undefined>;

export async function readFileHandler(type: BlobTypes, readFileHandler: ReadFileHandler | undefined, maxSize?: number, encoding?: EncodingType): Promise<IFileHandlerData<any> | undefined> {
	if (!readFileHandler) {
		switch (type) {
			case BlobTypes.Text:
				readFileHandler = await openFileHandler('.text;.txt')
				break;
			case BlobTypes.Svg:
				readFileHandler = await openFileHandler('.svg')
				break;
			case BlobTypes.Base64:
				readFileHandler = await openFileHandler()
				break;
			case BlobTypes.Image:
			case BlobTypes.Bitmap:
				readFileHandler = await openFileHandler('.jpg;.png;.gif;.webp;.svg')
				break;
		}
	}
	if (!(readFileHandler instanceof Blob)) {
		readFileHandler = await openFileHandler(readFileHandler as any) as any;
	}
	if (!readFileHandler) return;
	maxSize || (maxSize = DefaultReadMaxSize)
	const fileHandler = readFileHandler as FileSystemFileHandle;
	const file = await fileHandler.getFile();
	if (file.size > maxSize!) {
		throw new FileSizeError(file.size, maxSize!)
	}
	return {
		file,
		fileHandler,
		name: file.name,
		content: await readBlob(file, type, encoding!)
	}
}