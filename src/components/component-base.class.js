import { html } from '../functions/index.js';
import { Property } from './property.class.js';
import { Zone } from './zone.class.js';

export class ComponentBase extends HTMLElement {
	/** public properties */
	get tag() {
		return this.constructor['tag'] || null;
	}
	get observedAttributes() {
		return this.constructor['observedAttributes'] || [];
	}
	get properties() {
		return this.constructor['properties'];
	}

	zones = new Map();

	constructor() {
		super();

		this.properties.forEach(prop => {
			/** get the initial value */
			let _val = this[prop.name] || '1';

			/** create getter / setter */
			const getter = () => {
				return _val;
			};
			const setter = (newVal) => {
				_val = newVal;
				this.render();
			};

			/** redefine the property */
			Object.defineProperty(this, prop.name, { get: getter, set: setter });
		});

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
		this[attrName] = newVal;
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
		/** TODO: THIS ISN'T RECURSIVE. SHOULD BE */ 
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
				const id = `z${i}`;
				const zone = this.zones.get(id);
				if (!zone.isEqual(a)) {
					zone.data = a;
					this.dom.querySelector(`${zone.id}`).innerHTML = html(a).template;
				}
			});
		} else {
			/** concatenate the template strings */
			strings.map((s, i) => {
				if (args[i]) {
					/** create/update zone */
					const zone = new Zone(`z${i}`, args[i]);
					this.addZone(zone);

					/** add the zone tags */
					s += `<${zone.id}>`;
					if (Array.isArray(args[i])) s += args[i].join('');
					else s += args[i];
					s+= `</${zone.id}>`;
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
		/** check for tag */
		if (this.tag === null || typeof this.tag !== 'string' || this.tag.length === 0) {
			throw `Components must specify a static 'tag' property.`;
		}

		/** create observedAttributes */
		this.observedAttributes = this.properties.map(prop => prop.name);

		/** register the component */
		customElements.define(this.tag, this);
	}
}