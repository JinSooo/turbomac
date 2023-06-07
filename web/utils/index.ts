export const base64ToBlob = (base64: string) => {
	const parts = base64.split(';base64,')
	const contentType = parts[0].split(':')[1]

	const raw = window.atob(parts[1])
	const uInt8Array = new Uint8Array(raw.length)
	for (let i = 0; i < raw.length; i++) {
		uInt8Array[i] = raw.charCodeAt(i)
	}

	return new Blob([uInt8Array], { type: contentType })
}
