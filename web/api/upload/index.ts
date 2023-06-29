import { upload } from '@/utils/http'

interface UploadResponse {
	type: string
	url: string
	size: string
}

export function Upload(file: File) {
	return upload<UploadResponse>('/upload', file)
}
