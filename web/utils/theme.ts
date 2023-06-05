export const getColorByTheme = (isDark: boolean) => {
	// return isDark ? '#000' : '#fff'
	return isDark ? '#fff' : '#000'
}

export const getFontColorByTheme = (isDark: boolean) => {
	return isDark ? 'text-white bg-gray-500/20' : 'text-black bg-gray-100/30'
}
