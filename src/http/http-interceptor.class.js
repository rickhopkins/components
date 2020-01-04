export const httpInterceptors = [];

export class HttpInterceptor {
	constructor() {
		httpInterceptors.push(this);
	}

	intercept(xhr) { // override this method in sub classes
		return xhr;
	}
}