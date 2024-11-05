import {Base64DataURL, BlobTypes, EncodingType, readBlob} from "grain-sand-base";
import {IFileHandlerData} from "../next-lib";
import {openStoreFile} from "./openStoreFile";
import {FileNotFoundError,FileSizeError} from "../error";

/**
 * 读取文本文件内容
 *
 * @throws FileSizeError 当文件大小超过maxSize时会抛出
 * @throws FileNotFoundError 当文件不存在时会抛出
 *
 * @param type
 * @param readStoreFile 文件句柄或文件名
 * @param maxSize 允许读取文件的最大大小,单位为字节,默认为20M字节; 当文件大小超过此值时会抛出FileSizeError
 * @param encoding 文本编码默认为 utf-8
 */
export function readStoreFile(type: BlobTypes.Text, readStoreFile: string | FileSystemFileHandle, maxSize?: number, encoding?: EncodingType): Promise<IFileHandlerData<string> | undefined>;

/**
 * 将文件数据读取并编码为Base64 Data URL
 *
 * @throws FileSizeError 当文件大小超过maxSize时会抛出
 * @throws FileNotFoundError 当文件不存在时会抛出
 *
 * @param type
 * @param readStoreFile 文件句柄或文件名
 * @param maxSize 允许读取文件的最大大小,单位为字节,默认为20M字节; 当文件大小超过此值时会抛出FileSizeError
 */
export function readStoreFile(type: BlobTypes.Base64, readStoreFile: string | FileSystemFileHandle, maxSize?: number): Promise<IFileHandlerData<Base64DataURL> | undefined>;

/**
 * 将文件内容加载到缓存
 *
 * @throws FileSizeError 当文件大小超过maxSize时会抛出
 * @throws FileNotFoundError 当文件不存在时会抛出
 *
 * @param type
 * @param readStoreFile
 * @param maxSize 允许读取文件的最大大小,单位为字节,默认为20M字节; 当文件大小超过此值时会抛出FileSizeError
 */
export function readStoreFile(type: BlobTypes.Buffer, readStoreFile: string | FileSystemFileHandle, maxSize?: number): Promise<IFileHandlerData<ArrayBuffer> | undefined>;

/**
 * 读取图片内容,并创建HTMLImageElement
 *
 * @throws FileSizeError 当文件大小超过maxSize时会抛出
 * @throws FileNotFoundError 当文件不存在时会抛出
 *
 * @param type
 * @param readStoreFile
 * @param maxSize 允许读取文件的最大大小,单位为字节,默认为20M字节; 当文件大小超过此值时会抛出FileSizeError
 */
export function readStoreFile(type: BlobTypes.Image, readStoreFile: string | FileSystemFileHandle, maxSize?: number): Promise<IFileHandlerData<HTMLImageElement> | undefined>;

/**
 * 读取Svg文件内容,并创建Svg元素
 *
 * @throws FileSizeError 当文件大小超过maxSize时会抛出
 * @throws FileNotFoundError 当文件不存在时会抛出
 *
 * @param type
 * @param readStoreFile
 * @param maxSize 允许读取文件的最大大小,单位为字节,默认为20M字节; 当文件大小超过此值时会抛出FileSizeError
 */
export function readStoreFile(type: BlobTypes.Svg, readStoreFile: string | FileSystemFileHandle, maxSize?: number): Promise<IFileHandlerData<HTMLUnknownElement> | undefined>;

/**
 * 读取图片内容,并创建位图
 *
 * @warning 仅支持位图图片
 *
 * @throws FileSizeError 当文件大小超过maxSize时会抛出
 * @throws FileNotFoundError 当文件不存在时会抛出
 *
 * @param type
 * @param readStoreFile
 * @param maxSize 允许读取文件的最大大小,单位为字节,默认为20M字节; 当文件大小超过此值时会抛出FileSizeError
 */
export function readStoreFile(type: BlobTypes.Bitmap, readStoreFile: string | FileSystemFileHandle, maxSize?: number): Promise<IFileHandlerData<ImageBitmap> | undefined>;


export async function readStoreFile(type: BlobTypes, readStoreFile: string | FileSystemFileHandle, maxSize?: number, encoding?: EncodingType): Promise<IFileHandlerData<any> | undefined> {
	try {
		const fileHandler = await openStoreFile(readStoreFile, 'read');
		const file = await fileHandler.getFile();
		if (file.size > maxSize!) {
			// noinspection ExceptionCaughtLocallyJS
			throw new FileSizeError(file.size, maxSize!)
		}
		return {
			file,
			fileHandler,
			name: file.name,
			content: await readBlob(file, type, encoding!)
		}
	} catch (e: any) {
		if (e.name === 'NotFoundError' || /not\s*found/.test(e.message)) {
			throw new FileNotFoundError(`${readStoreFile} not found`);
		}
		throw e;
	}
}