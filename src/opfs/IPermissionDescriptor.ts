/**
 * [文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Permissions/query)
 */
export interface IPermissionDescriptor {

	name: PermissionName | string

	/**
	 * 对于 midi 权限，可以指定
	 *
	 * 指示是否需要接收系统独有消息。默认值为 false。
	 */
	sysex?: boolean
}

export type PermissionName =
	"accelerometer"
	| "accessibility-events"
	| "ambient-light-sensor"
	| "background-sync"
	| "camera"
	| "clipboard-read"
	| "clipboard-write"
	| "geolocation"
	| "gyroscope"
	| "local-fonts"
	| "magnetometer"
	| "microphone"
	| "midi"
	| "notifications"
	| "payment-handler"
	| "persistent-storage"
	| "push"
	| "screen-wake-lock"
	| "storage-access"
	| "top-level-storage-access"
	| "window-management"
	| "xr-spatial-tracking";