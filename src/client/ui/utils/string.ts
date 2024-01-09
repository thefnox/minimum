export const padStart = (str: string, targetLength: number, pad: string) => {
	while (str.size() < targetLength) {
		str = pad + str;
	}
	return str;
};
