// http://byronsalau.com/blog/how-to-create-a-guid-uuid-in-javascript/
export const newGuid = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		// tslint:disable-next-line:no-bitwise
		const r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
};

export const uniqueID = () => {
	/** return the number of seconds since epoch */
	var r = Math.random().toString(36).substr(2);
	return Date.now().toString(36) + r;
};