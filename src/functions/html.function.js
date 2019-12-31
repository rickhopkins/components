export const html = (strings, ...args) => {
	/** initialize template */
	let template = '';

	/** concatenate the template strings */
	strings.map((s, i) => {
		if (args[i]) s += args[i];
		template += s.replace(/(\r\n|\n|\r)/gm, '')
	});

	/** return the template */
	const templateEl = document.createElement('template');
	templateEl.innerHTML = template;
	return templateEl;
};