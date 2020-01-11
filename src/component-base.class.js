import { virtualizeDOM, updateDOM } from './functions/dom.functions.js';
import { newGuid } from './functions/index.js';

export class ComponentBase extends HTMLElement {
	/** public properties */
	get tag() {
		return this.constructor['tag'] || null;
	}
	get observedAttributes() {
		return this.constructor['observedAttributes'] || [];
	}
	id = newGuid();
	zones = new Map();
	initd = false;

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
		this.template();
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