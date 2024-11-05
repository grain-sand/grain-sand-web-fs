/**
 * 使用数据创建下载文件
 * @param fileName
 * @param content
 * @param type 文件的mime类型,默认为 text/plain
 */
export async function createDownload(fileName: string, content: BlobPart, type: string = 'text/plain'):Promise<void> {
	const blob = content instanceof Blob ? content : new Blob([content], {type}) as Blob;
	const url = URL.createObjectURL(blob);
	try {
		const g = globalThis as any;
		if (globalThis.document) {
			const a = globalThis.document.createElement('a');
			a.href = url;
			a.type = type;
			a.download = fileName;
			a.click();
		} else if (g.chrome?.downloads || g.browser?.downloads) {
			await (g.chrome?.downloads || g.browser?.downloads).download({
				url: url,
				filename: fileName,
				saveAs: true
			});
		} else {
			throw new Error('createDownload Not supported');
		}
	} finally {
		URL.revokeObjectURL(url);
	}
}