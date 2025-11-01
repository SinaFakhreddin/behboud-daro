




export function validateIranianPhoneNumber(number: string) {
	const Regex = /^(?:\+98|0)?9\d{9}$/
	return Regex.test(number)
}
