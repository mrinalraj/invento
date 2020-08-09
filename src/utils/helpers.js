export const range = (start, end) => new Array(end - start).fill(0).map((_, i) => i + start)

export const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array)
	}
}
