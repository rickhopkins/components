import { html, uniqueID } from './functions/index.js';

export class ComponentBase extends HTMLElement {
	/** public properties */
	get tag() {
		return this.constructor['tag'] || null;
	}
	get observedAttributes() {
		return this.constructor['observedAttributes'] || [];
	}
	id = uniqueID();
	zones = new Map();

	/** constructor */
	constructor() {
		super();

		/** check for tag */
		if (this.tag === null || typeof this.tag !== 'string' || this.tag.length === 0) {
			throw `Components must specify a static 'tag' property.`;
		}

		this.template = () => {};
		this.dom = this.attachShadow({mode: 'open'});
	}

	/** public methods */

	render() {
		/** render the template */
		const { strings, args } = this.template();
		this.compile(strings, args);
	}

	/** lifecycle callbacks */
	connectedCallback() {
		console.log(`Component Connected`);
	}

	disconnectedCallback() {
		console.log(`Component Disconnected`);
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		console.log(`Component Attribute Value Changed. Attribute ${attrName} changed from '${oldVal}' to '${newVal}'.`);
		this.render();
	}

	adoptedCallback() {
		console.log(`Component Adopted`);
	}

	empty() {
		while (this.dom.firstChild) this.dom.removeChild(this.dom.firstChild);
	}

	addZone(zone) {
		this.zones.set(zone.id, zone);
	}

	compile(strings, args) {
		/** initialize template */
		let template = '';

		/** cycle through args */
		args.map((a, i) => {
			if (typeof a !== 'string') {
				if (Array.isArray(a)) {
					a.map((d, j) => a[j] = d.template);
				} else {
					a = a.template
				}

				args[i] = a;
			}
		});

		/** check for zones */
		if (this.zones.size > 0) {
			args.map((a, i) => {
				const id = `${this.id}_${i}`;
				const zone = this.zones.get(id);
				if (!zone.isEqual(a)) {
					zone.data = a;
					this.dom.getElementById(zone.id).innerHTML = html(a).template;
				}
			});
		} else {
			/** concatenate the template strings */
			strings.map((s, i) => {
				if (args[i]) {
					/** create/update zone */
					const zone = new Zone(`${this.id}_${i}`, args[i]);
					this.addZone(zone);

					/** add the zone tags */
					s += `<zone id="${zone.id}">`;
					if (Array.isArray(args[i])) s += args[i].join('');
					else s += args[i];
					s+= `</zone>`;
				}
				template += s.replace(/(\r\n|\n|\r)/gm, '')
			});

			/** return the template */
			this.dom.innerHTML = template;
		}
	}

	/** static methods */

	/**
	 * Register a component
	 */
	static register() {
		/** register the component */
		customElements.define(this.tag, this);
	}
}

export class Zone {
	_id;
	_data;

	get id() {
		return this._id;
	};
	set id(id) {
		this._id = id;
	}
	get data() {
		return this._data;
	}
	set data(data) {
		this._data = JSON.stringify(data);
	}

	constructor(id, data) {
		this.id = id;
		this.data = data;
	}

	isEqual(data) {
		return JSON.stringify(data) === this.data;
	}
}