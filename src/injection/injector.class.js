import { Injectable } from './injectable.class.js';

class InjectionEngine {
	injectables = [];

	register(injectable, token = null) {
		/** check the injectable type */
		if (!(injectable instanceof Injectable)) {
			/** create a new Injectable, add to array, and return */
			injectable = new Injectable(token, injectable);
		}

		/** create a new dependency, add to array, and return */
		this.injectables.push(injectable);
	}

	get(token) {
		const injectableRef = this.getInjectable(token);
		if (injectableRef === undefined) throw `Injectable could not be found: ${token}`;

		/** check for singleton and instance */
		let instance = injectableRef.getInstance();
		if (instance === null) {
			/** construct the injectable */
			instance = this.construct(injectableRef.injectable, injectableRef.dependencies, injectableRef.args);

			/** set the injectableRef instance */
			if (injectableRef.isSingleton()) injectableRef.getInstance(instance);
		}

		/** return the instance */
		return instance;
	}

	getInjectable(token) {
		return this.injectables.find(d => d.token === token);
	}

	construct(injectable, tokens = [], args = []) {
		/** recursively create injectables */
		let dependencies = [];
		if (tokens.length > 0) {
			tokens.forEach(token => {
				/** get the dependency */
				let dependencyRef = this.get(token);

				/** check for singleton and instance */
				let dependency = dependencyRef.getInstance();
				if ((dependencyRef.isSingleton() && dependency === null) || !dependencyRef.isSingleton()) {
					/** construct the injectable */
					dependency = this.construct(dependencyRef.injectable, dependencyRef.dependencies, dependencyRef.args);
				}

				/** set the dependencyRef instance */
				if (dependencyRef.isSingleton() && dependencyRef.getInstance() ===  null) {
					dependencyRef.setInstance(injectable);
				}

				/** add the dependency */
				dependencies.push(dependency);
			});
		}

		/** check for args */
		if (args.length > 0) dependencies = dependencies.concat(args);

		/** initialize the new injectable */
		return new injectable(...dependencies);
	}
}

/** export InjectionEngine */
export const injector = new InjectionEngine();