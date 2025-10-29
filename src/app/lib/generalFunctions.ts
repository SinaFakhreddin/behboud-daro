export function isValidEmail(email: string) {
	const regex =
		/^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	return regex.test(email);
}

export function isValidIranPhoneNumber(number: string) {
	const regex = /^09(0[1-5]|1[0-9]|2[0-9]|3[0-9]|9[0-9])[0-9]{7}$/;
	return regex.test(number);
}

export function safePassword(password: string) {
	const regex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
	return regex.test(password);
}
