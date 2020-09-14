swapEditor = ()=>{
	var formulaEditorOuter = document.getElementsByClassName('formulaEditorOuter')
	if(formulaEditorOuter.length > 0) {
		const fields = Object.values(document.getElementById('fieldSelector').options)
			.map((e)=>{return {label: "Field: " + e.text, value: e.value}})
		fields.shift()
		formulaEditorOuter = formulaEditorOuter[0]
		let formulaEditor = formulaEditorOuter.getElementsByTagName('textarea')[0]
		const content = formulaEditor.value
		Vue.use(VTooltip)
		Vue.use(VueMention)
		var app = new Vue({
			template: `<div id="app">
				<Mentionable :keys="triggerKeys" :items="functionValues" placement="auto" omit-key>
					<prism-editor class="height-400" v-model="content" :highlight="highlighter" @input="updateRealValue" line-numbers></prism-editor>
				</Mentionable>
			</div>`,
			data: {
				content: content,
				functionValues: functionValues.concat(fields),
				triggerKeys: ['?']
				// triggerKeys: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
			},
			methods: {
				highlighter(code) {
					return Prism.highlight(code, Prism.languages.js, "excel-formula")
				},
				updateRealValue(i,s) {
					// console.log(i == this.content, this.content, formulaEditor)
					formulaEditor.innerHTML = this.content
					formulaEditor.dispatchEvent(new KeyboardEvent('keyup'))
				}
			}
		})
		// formulaEditor.remove()
		app.$mount(formulaEditorOuter)
		//figure out how to update formulaEditor from the Vue component
	}
}
swapEditor()
