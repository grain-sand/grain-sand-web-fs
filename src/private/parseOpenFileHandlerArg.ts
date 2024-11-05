import {IFilePickerOptionsType, IOpenFilePickerOptions} from "../opfs";
import {isBoolean, isObject, isString} from "grain-sand-base";
import {ISimpleFilePickerOptionsType} from "../next-lib";

export function parseOpenFileHandlerArg(args: any[]): IOpenFilePickerOptions {
	const options: IOpenFilePickerOptions = {};
	const addType = (type: IFilePickerOptionsType) => (options.types || (options.types = [])) && options.types.push(type);
	const addArrayType = (arr: string[]) => addType({accept: {'*/*': arr}})
	let i = 0;
	args[i] === undefined && i++;
	args[i] instanceof FileSystemHandle && (options.startIn = args[i++]);
	(isString(args[i]) && args[i].startsWith('.')) && (addArrayType(args[i++].split(/[,;]/)));
	Array.isArray(args[i]) && (addArrayType(args[i++]));
	if (isObject(args[i])) {
		const arg = args[i++];
		if (arg instanceof FileSystemHandle) {
			options.startIn = arg;
		} else if ('accept' in arg) {
			const acceptType: ISimpleFilePickerOptionsType | IFilePickerOptionsType = arg as any;
			isString(acceptType.accept) && (acceptType.accept = {'*/*': (acceptType.accept as string).split(/[,;]/)});
			Array.isArray(acceptType.accept) && (acceptType.accept = {'*/*': acceptType.accept});
			addType(acceptType as any);
		} else {
			Object.assign(options, arg);
		}
	}
	isBoolean(args[i]) && (options.multiple = args[i++]);
	(!options.startIn && (args[i] instanceof FileSystemHandle || isString(args[i]))) && (options.startIn = args[i++]);
	return options;
}