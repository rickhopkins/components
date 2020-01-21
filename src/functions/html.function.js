export const html = (strings, ...args) => {
	/** initialize template */
	let template = '';

	/** concatenate the template strings */
	if (Array.isArray(strings)) {
		strings.map((s, i) => {
			if (args[i]) {
				if (Array.isArray(args[i])) s += args[i].join('');
				else s += args[i];
			}
			template += s.replace(/(\r\n|\n|\r)/gm, '')
		});
	} else {
		template = strings;
	}

	/** return the parts */
	return { 'strings': strings, 'args': args, 'template': template };
};