export const html = (strings, ...args) => {
	/** initialize template */
	let template = '';

	/** concatenate the template strings */
	strings.map((s, i) => {
		if (args[i]) {
			if (Array.isArray(args[i])) s += args[i].join('');
			else s += args[i];
		}
		template += s.replace(/(\r\n|\n|\r)/gm, '')
	});

	/** return the template */
	return template;
};