import {formatBytes} from "grain-sand-base";

export const DefaultReadMaxSize = 1024 * 1024 * 20;

export class FileSizeError extends Error{

	currentSize: number;
	maxSize: number;

	constructor(currentSize: number, maxSize: number) {
		super(`The file size is too large. ${formatBytes(currentSize)} > ${formatBytes(maxSize)}`)
		this.currentSize = currentSize;
		this.maxSize = maxSize;
	}

}