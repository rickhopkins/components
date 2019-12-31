/** virtualize the passed DOM element */
export const virtualizeDOM = (element) => {
	let vElement = { type: element.nodeName, props: [], children: [], value: '' };
	if (['#text', '#comment'].includes(element.nodeName)) vElement.value = element.nodeValue;

	if (element.attributes) {
		for (let i = 0; i < element.attributes.length; i++) {
			let a = element.attributes[i];
			vElement.props.push({ 'name': a.name, 'value': a.value });
		}
	}

	if (element.childNodes) {
		element.childNodes.forEach(c => {
			vElement.children.push(virtualizeDOM(c));
		});
	}

	return vElement;
};

/** update the given parent with new virtual DOM nodes */
export const updateDOM = (parent, newNode, oldNode, index) => {
	if (!index) index = 0;

	if (!oldNode) {
		if (newNode) {
			let newDOMNode = createElement(newNode);
			parent.appendChild(newDOMNode);
		}
	} else if (!newNode) {
		parent.removeChild(parent.childNodes[index]);
	} else if (hasChanged(newNode, oldNode)) {
		let newDOMNode = createElement(newNode);
		parent.replaceChild(newDOMNode, parent.childNodes[index]);
	} else if (newNode.type) {
		updateProps(parent.childNodes[index], newNode.props, oldNode.props);

		const newLength = newNode.children.length;
		const oldLength = oldNode.children.length;
		
		/** check for less new than old */
		if (newLength < oldLength) {
			/** get all the old elements that are past the new */
			let children = [];
			for (let i = newLength; i < oldLength; i++) {
				children.push(parent.childNodes[index].childNodes[i]);
			}

			/** remove old elements */
			children.forEach(c => parent.childNodes[index].removeChild(c));
		}

		/** compare all new nodes */
		for (let i = 0; i < newLength; i++) {
			updateDOM(parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
		}
	}
};

/** check to see if has changed */
export const hasChanged = (node1, node2) => {
	return (typeof node1 !== typeof node2) || (node1.type !== node2.type) || (['#text', '#comment'].includes(node1.type) && node1.value !== node2.value);
};

/** create a DOM element based on the virtual DOM node passed */
export const createElement = (node) => {
	if (node.type === '#text') {
		return document.createTextNode(node.value);
	}
	if (node.type === '#comment') {
		return document.createComment(node.value);
	}
	const $el = document.createElement(node.type);
	setProps($el, node.props);
	node.children.map(createElement).forEach($el.appendChild.bind($el));
	return $el;
};

/** set a target element's property value */
export const setProp = (target, prop) => {
	target.setAttribute(prop.name, prop.value);
};

/** set multiple property values on a target element */
export const setProps = (target, props) => {
	props.forEach(prop => {
		setProp(target, prop);
	});
};

/** remove a property from a target element */
export const removeProp = (target, prop) => {
	target.removeAttribute(prop.name);
};

/** update the properties on a target element */
export const updateProps = (target, newProps, oldProps) => {
	newProps.forEach(prop => {
		let match = oldProps.find(p => p.name === prop.name);
		if (match) {
			if (match.value !== prop.value) setProp(target, prop); // update
		} else {
			if (!isEventProp(prop)) {
				setProp(target, prop); // add new
			}
		}
	});
	oldProps.forEach(prop => {
		let match = newProps.find(p => p.name === prop.name);
		if (!match) {
			removeProp(target, prop);
		}
	});
};