import {IPermissionDescriptor as PermissionDescriptor} from './IPermissionDescriptor'

/**
 * 返回给定 API 的用户权限状态。
 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Permissions)
 */
export interface IPermissions {
	query(permission: PermissionDescriptor): Promise<PermissionStatus>;
}