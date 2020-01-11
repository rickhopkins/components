import { html, compile } from '../../functions/html.function.js';

export const myFirstComponentTemplate = function(tag, attr1, attr2, values, isTrue, users = []) {
	return compile(this)/*html*/`
		<div class="test">
			Custom Elements Coming Soon!!!
		</div>
		<div>
			<b>TAG: ${tag} | ${attr1}:${attr2}</b>
		</div>
		<ul>
			${values.map(v => html`<li>${v}</li>`)}
		</ul>
		${isTrue ? `I'm true.` : `I'm false`}
		<hr />
		<div><b>Users:</b></div>
		<ul>
			${users.map(u => html`<li>${u.firstName} ${u.lastName} : ${u.username}</li>`)}
		</ul>
	`;
};