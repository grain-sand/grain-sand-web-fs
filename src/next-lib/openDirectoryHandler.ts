import {StartInType} from "../opfs";

/**
 * 显示一个目录选择器，以允许用户选择一个目录
 *
 * @warning 不兼容Firefox、Safari与移动端
 *
 * @param startInOrHandler
 * @param mode
 * @param id
 */
export function openDirectoryHandler(startInOrHandler?: StartInType, mode: "read" | "readwrite" = "read", id?: string) {
	return (globalThis as any).showDirectoryPicker({startInOrHandler, mode, id});
}