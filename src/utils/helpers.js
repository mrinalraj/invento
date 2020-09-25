export const range = (start, end) => new Array(end - start).fill(0).map((_, i) => i + start)

export const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array)
	}
}

export function csvJSON(csv) {
	var lines = csv.split('\n')

	var result = []

	var headers = lines[0].split(',')

	for (var i = 1; i < lines.length; i++) {
		var obj = {}
		var currentline = lines[i].split(',')

		for (var j = 0; j < headers.length; j++) {
			obj[headers[j]] = currentline[j]
		}

		result.push(obj)
	}

	return [headers, result]
}
