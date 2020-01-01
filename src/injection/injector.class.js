import { Dependency } from './dependency.class.js';

class InjectionEngine {
	dependencies = [];

	bind(token, item) {
		/** create a new dependency, add to array, and return */
		let dependency = new Dependency(token, item);
		this.dependencies.push(dependency);
		return dependency;
	}

	get(token) {
		const dependencyRef = this.dependencies.find(d => d.token === token);
		if (dependencyRef === undefined) throw `Dependency could not be found: ${token}`;

		/** check for singleton and instance */
		let instance = dependencyRef.getInstance();
		if (instance === null) {
			/** construct the dependency */
			instance = this.construct(dependencyRef.service, dependencyRef.dependencies, dependencyRef.args);

			/** set the dependencyRef instance */
			if (dependencyRef.isSingleton()) dependencyRef.getInstance(instance);
		}

		/** return the instance */
		return instance;
	}

	getDependency() {
		return this.dependencies.find(d => d.token === token);
	}

	construct(dependent, tokens = [], args = []) {
		/** recursively create dependencies */
		let dependencies = [];
		if (tokens.length > 0) {
			tokens.forEach(token => {
				/** get the dependency */
				let dependencyRef = this.get(token);

				/** check for singleton and instance */
				let dependency = dependencyRef.getInstance();
				if ((dependencyRef.isSingleton() && dependency === null) || !dependencyRef.isSingleton()) {
					/** construct the dependency */
					dependency = this.construct(dependencyRef.item, dependencyRef.dependencies, dependencyRef.args);
				}

				/** set the dependencyRef instance */
				if (dependencyRef.isSingleton() && dependencyRef.getInstance() ===  null) {
					dependencyRef.setInstance(dependency);
				}

				/** add the dependency */
				dependencies.push(dependency);
			});
		}

		/** check for args */
		if (args.length > 0) dependencies = dependencies.concat(args);

		/** initialize the new dependent */
		return new dependent(...dependencies);
	}
}

/** export InjectionEngine */
export const injector = new InjectionEngine();