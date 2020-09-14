swapEditor = ()=>{
	var formulaEditorOuter = document.getElementsByClassName('formulaEditorOuter')
	if(formulaEditorOuter.length > 0) {
		const fieldSelector = document.getElementById('fieldSelector')
		let fields = []
		if(fieldSelector) {
			fields = Object.values(fieldSelector.options)
				.map((e)=>{return {label: "Field: " + e.text, value: e.value}})
			fields.shift()
		}
//TODO make auto fill box follow cursor better
		formulaEditorOuter = formulaEditorOuter[0]
		let formulaEditor = formulaEditorOuter.getElementsByTagName('textarea')[0]
		const content = formulaEditor.value
		Vue.use(VTooltip)
		Vue.use(VueMention)
		var app = new Vue({
			template: `
			<div id="app">
				<Mentionable :keys="triggerKeys" :items="functionValues" placement="auto" omit-key>
					<prism-editor class="height-400" v-model="content" :highlight="highlighter" @input="updateRealValue" line-numbers></prism-editor>
				</Mentionable>
			</div>`,
			data: {
				content: content,
				functionValues: functionValues.concat(fields),
				triggerKeys: ['?']
			},
			methods: {
				highlighter(code) {
					return Prism.highlight(code, Prism.languages.js, "excel-formula")
				},
				updateRealValue(i,s) {
					formulaEditor.value = this.content
				}
			}
		})
		formulaEditor.hidden = true
		app.$mount(document.getElementById('CalculatedFormula_header'))
	}
}
swapEditor()
