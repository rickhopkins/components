import { Zone } from '../component-base.class.js';

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

export const compile = function(component) {
	return (strings, ...args) => {
		/** initialize template */
		let template = '';

		/** check for zones */
		if (component.zones.size > 0) {
			args.map((a, i) => {
				const id = `${component.id}_${i}`;
				const zone = component.zones.get(id);
				if (!zone.isEqual(a)) {
					zone.data = a;
					component.dom.getElementById(zone.id).innerHTML = html(a);
				}
			});
		} else {
			/** concatenate the template strings */
			strings.map((s, i) => {
				if (args[i]) {
					/** create/update zone */
					const zone = new Zone(`${component.id}_${i}`, args[i]);
					component.addZone(zone);

					/** add the zone tags */
					s += `<zone id="${zone.id}">`;
					if (Array.isArray(args[i])) s += args[i].join('');
					else s += args[i];
					s+= `</zone>`;
				}
				template += s.replace(/(\r\n|\n|\r)/gm, '')
			});

			/** return the template */
			component.dom.innerHTML = template;
		}
	}
};

// http://byronsalau.com/blog/how-to-create-a-guid-uuid-in-javascript/
export const newGuid = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		// tslint:disable-next-line:no-bitwise
		const r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
};