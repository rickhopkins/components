import { ComponentBase, injector } from '../../test.module.js';
import { myFirstComponentTemplate } from './my-first-component.template.js';

export class MyFirstComponent extends ComponentBase {
	static tag = 'my-first-component';
	static observedAttributes = ['testattr1', 'testattr2'];

	_users = [];

	get testAttr1() {
		return this.getAttribute('testattr1') || '0';
	}

	get testAttr2() {
		return this.getAttribute('testattr2') || '0';
	}
	get users() {
		return this._users;
	}
	set users(users) {
		this._users = users;
		this.render();
	}

	constructor(test = injector.get('TestService')) {
		super();

		this.template = () => myFirstComponentTemplate.call(this, this.tag, this.testAttr1, this.testAttr2, test.getValues(), test.isTrue, this.users);
		this.render();

		const usersTopic = test.getUsers();
		usersTopic.subscribe((users) => {
			if (users === null) return;
			this.users = users;

			setInterval(() => {
				this.users.pop();
				this.users = this.users;
			}, 5000);
		});
	}
}

/** register the component */
MyFirstComponent.register();