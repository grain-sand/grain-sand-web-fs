export interface ICreateWritableOptions {

	/**
	 * 默认为 false。
	 * 当设为 true 时，如果文件存在，则现将现有文件的内容复制到临时文件，否则临时文件初始时内容为空。
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemFileHandle/createWritable#keepexistingdata)
	 */
	keepExistingData?:boolean

	/**
	 * 指定可写文件流的锁定模式的字符串。默认值为 "siloed"。
	 *
	 * "exclusive"
	 *     只能打开一个 FileSystemWritableFileStream 写入器。在第一个写入器关闭之前尝试打开后续写入器会导致抛出 NoModificationAllowedError 异常。
	 *
	 * "siloed"
	 *     可以同时打开多个 FileSystemWritableFileStream 写入器，每个写入器都有自己的交换文件，
	 *     例如在多个标签页中使用同一个应用时。最后打开的写入器会写入其数据，因为每个写入器关闭时都会刷新数据。
	 *
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemFileHandle/createWritable#mode)
	 */
	mode?:"exclusive"|"siloed"

}