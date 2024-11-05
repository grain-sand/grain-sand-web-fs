export const enum FileMimeTypes {
	// 文本类型
	Text = "text/plain",
	HTML = "text/html",
	CSS = "text/css",
	JavaScript = "text/javascript",
	XML = "text/xml",

	// 图片类型
	JPEG = "image/jpeg",
	PNG = "image/png",
	GIF = "image/gif",
	SVG = "image/svg+xml",
	WebP = "image/webp",
	BMP = "image/bmp",

	// 视频类型
	MP4 = "video/mp4",
	MPEG = "video/mpeg",
	WebMVideo = "video/webm",
	OGGVideo = "video/ogg",
	AVI = "video/x-msvideo",

	// 音频类型
	MP3 = "audio/mpeg",
	OGG = "audio/ogg",
	WAV = "audio/wav",
	WebMAudio = "audio/webm",
	AAC = "audio/aac",

	// 应用程序类型
	JSON = "application/json",
	XMLApplication = "application/xml",
	JavaScriptApp = "application/javascript",
	PDF = "application/pdf",
	ZIP = "application/zip",
	FormURLEncoded = "application/x-www-form-urlencoded",
	Excel = "application/vnd.ms-excel",
	ExcelOpenXML = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	PowerPoint = "application/vnd.ms-powerpoint",
	PowerPointOpenXML = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
	Word = "application/msword",
	WordOpenXML = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

	// 多用途类型
	MultipartFormData = "multipart/form-data",
	MultipartMixed = "multipart/mixed",

	// 字体类型
	TTF = "font/ttf",
	OTF = "font/otf",
	WOFF = "font/woff",
	WOFF2 = "font/woff2",

	// 消息类型
	RFC822 = "message/rfc822"
}
