import { html } from '../../functions/html.function.js';

export const myFirstComponentTemplate = (tag, attr1, attr2, values, isTrue) => html`
	<div>
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
	</div>
`;