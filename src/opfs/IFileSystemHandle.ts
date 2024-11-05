/**
 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemHandle)
 */
export interface IFileSystemHandle {

	// @ts-ignore
	kind: 'file' | 'directory'

	// @ts-ignore
	name: string

	/**
	 * 方法用于比对两个句柄以查看两者关联的条目（文件或目录）是否相符。
	 *
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemHandle/isSameEntry)
	 */
	isSameEntry(other: IFileSystemHandle): Promise<boolean>;

	/**
	 * 用于查询当前句柄目前的权限状态。
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemHandle/queryPermission)
	 */
	queryPermission(descriptor?: { mode: 'read' | 'readwrite' }): Promise<PermissionState>;

	/**
	 * 用于为文件句柄请求读取或读写权限。
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemHandle/requestPermission)
	 */
	requestPermission(descriptor?: { mode: 'read' | 'readwrite' }): Promise<PermissionState>;

	/**
	 * 用于删除句柄。
	 * @warn 非标准: 该特性是非标准的，请尽量不要在生产环境中使用它！
	 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystemHandle/remove)
	 */
	remove?(options?: { recursive: boolean }): Promise<void>;

}