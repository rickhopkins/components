import { ComponentBase } from './src/component-base.class.js';
import { html } from './src/functions/html.function.js';

/** create the component */
class MyFirstComponent extends ComponentBase {
	static tag = 'my-first-component';
	static observedAttributes = ['testattr1', 'testattr2'];

	get testAttr1() {
		return this.getAttribute('testattr1') || '0';
	}

	get testAttr2() {
		return this.getAttribute('testattr2') || '0';
	}

	constructor() {
		super();

		this.template = () => html`
<div>
	<div class="test">
		Custom Elements Coming Soon!!!
	</div>
	<div>
		<b>TAG: ${this.tag} | ${this.testAttr1}:${this.testAttr2}</b>
	</div>
</div>`;

		this.render();
	}
}

/** register the component */
MyFirstComponent.register();