export class Injectable {
	token = null;
	injectable = null;
	instance = null;
	dependencies = [];
	args = [];
	singleton = true;

	constructor(token, injectable) {
		this.token = token;
		this.injectable = injectable;
	}

	/** public methods */

	addDependency(token) {
		this.dependencies.push(token);
		return this;
	}

	addDependencies(tokens) {
		tokens.forEach(token => this.addDependency(token));
		return this;
	}

	addArg(value) {
		this.args.push(value);
		return this;
	}

	addArgs(values) {
		values.forEach(value => this.addArg(value));
		return this;
	}

	setSingleton(singleton) {
		this.singleton = singleton;
		return this;
	}

	isSingleton() {
		return this.singleton;
	}

	setInstance(instance) {
		this.instance = instance;
	}

	getInstance() {
		return this.instance;
	}
}