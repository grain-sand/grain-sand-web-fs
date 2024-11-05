/**
 * 是附加了便于操作磁盘上单个文件的方法的 WritableStream 对象。
 * 这个接口通过 FileSystemFileHandle.createWritable() 方法来访问。
 *
 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemWritableFileStream)
 */
export interface IFileSystemWritableFileStream extends WritableStream{

	/**
	 * 于更新文件当前指针的偏移到指定的位置（以字节为单位）。
	 * [MDN Reference](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemWritableFileStream/seek)
	 */
	seek(position: number): Promise<void>;

	/**
	 * 用于将与流相关联的文件调整为指定字节大小。
	 * [MDN Reference](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemWritableFileStream/truncate)
	 */
	truncate(size: number): Promise<void>;

	/**
	 * 用于在调用此方法的文件上的当前指针偏移处写入内容。
	 *
	 * 在流被关闭前，更改不会写入到磁盘上实际的文件。通常更改会被先写入到临时文件。
	 * 这个方法也能被用于定位到流中的字节点位还有进行裁剪以改变文件内容的总字节数。
	 *
	 * [MDN Reference](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemWritableFileStream/write)
	 */
	write(data: FileSystemWriteChunkType): Promise<void>;

}