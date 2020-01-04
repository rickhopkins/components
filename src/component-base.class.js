import { virtualizeDOM, updateDOM } from './functions/dom.functions.js';

export class ComponentBase extends HTMLElement {
	/** public properties */
	get tag() {
		return this.constructor['tag'] || null;
	}
	get observedAttributes() {
		return this.constructor['observedAttributes'] || [];
	}
	initd = false;

	/** constructor */
	constructor() {
		super();

		/** check for tag */
		if (this.tag === null || typeof this.tag !== 'string' || this.tag.length === 0) {
			throw `Components must specify a static 'tag' property.`;
		}

		this.template = '';
		this.dom = this.attachShadow({mode: 'open'});
	}

	/** public methods */

	render() {
		/** get the template */
		let template = this.template;
		if (typeof(this.template) === 'function') template = this.template();

		/** return the template */
		const templateEl = document.createElement('template');
		templateEl.innerHTML = template;

		/** check the template for one and only one child */
		if (templateEl.content.children.length !== 1) throw 'The template must contain one root element.';

		/** add the template contents to the dom */
		updateDOM(this.dom, virtualizeDOM(templateEl.content.children[0]), this.initd ? virtualizeDOM(this.dom.children[0]) : undefined);

		/** set the initd property */
		this.initd = true;
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

	/** static methods */

	/**
	 * Register a component
	 */
	static register() {
		/** register the component */
		customElements.define(this.tag, this);
	}
}