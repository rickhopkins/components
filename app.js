import { ComponentBase, html, injector } from './src/test.module.js';

class MyFirstComponent extends ComponentBase {
	static tag = 'my-first-component';
	static observedAttributes = ['testattr1', 'testattr2'];

	get testAttr1() {
		return this.getAttribute('testattr1') || '0';
	}

	get testAttr2() {
		return this.getAttribute('testattr2') || '0';
	}

	constructor(test = injector.get('TestService')) {
		super();

		console.log(test);
		console.log(test.getValues());

		this.template = () => html`
<div>
	<div class="test">
		Custom Elements Coming Soon!!!
	</div>
	<div>
		<b>TAG: ${this.tag} | ${this.testAttr1}:${this.testAttr2}</b>
	</div>
	<ul>
		${test.getValues().map(v => `<li>${v}</li>`)}
	</ul>
	${test.isTrue ? `I'm true.` : `I'm false`}
</div>`;

		this.render();
	}
}

/** register the component */
MyFirstComponent.register();