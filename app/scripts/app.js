[
	"styles/prismeditor.min.css",
	"styles/prism-coy.css",
	"styles/prism-okaidia.css",
	"styles/main.css"
].forEach((s)=>{
	var elem = document.createElement('link')
	elem.rel = 'stylesheet'
	elem.setAttribute('href', chrome.extension.getURL(s))
	elem.setAttribute('title', 'thor')
	document.body.appendChild(elem)
})

swapEditor = ()=>{
	var formulaEditorOuter = document.getElementsByClassName('formulaEditorOuter')
	var insertFieldButton = document.querySelector('input[name=insertField]') // don't replace the advanced editor
	if(formulaEditorOuter.length > 0 && insertFieldButton == null) {
		const fieldSelector = document.getElementById('fieldSelector')
		let fields = []
		if(fieldSelector) {
			fields = Object.values(fieldSelector.options)
				.map((e)=>{return {label: "Field: " + e.text, value: e.value}})
			fields.shift()
		}
		formulaEditorOuter = formulaEditorOuter[0]
		let formulaEditor = formulaEditorOuter.getElementsByTagName('textarea')[0]
		const content = formulaEditor.value
		Vue.use(VTooltip)
		Vue.use(VueMention)
		var app = new Vue({
			template: `
			<div id="app" :class="theme + ' highlight-keywords match-braces rainbow-braces'">
				<header data-plugin-header="highlight-keywords"></header>
				<header data-plugin-header="show-invisibles"></header>
				<Mentionable ref="suggestions" :keys="triggerKeys" @caret="updateCaretPosition" :items="functionValues" placement="right-start" omit-key>
					<prism-editor id="thorEditor" ref="editor" class="height-400" v-model="content" :highlight="highlighter" @input="updateRealValue" line-numbers></prism-editor>
				</Mentionable>
				<div class="controls" style="font-size:14px">
					<select v-model="theme" class="themeSelector">
						<option v-for="t in themes" v-bind:value="t.value">
							{{ t.label }}
						</option>
					</select>
					<label for="fontSizeSelector" style="color:black">Font size:</label>
					<input type="range" @change="updateFontSize" min="12" max="18" id="fontSizeSelector" name="fontSizeSelector" v-model="fontSize" class="slider"/><i style="color:black">{{ fontSize }}</i>
				</div>
			</div>`,
			data: {
				content: content,
				fontSize: 14,
				functionValues: functionValues.concat(fields),
				themes: [
					{value: 'okaidia', label: 'Dark Mode'},
					{value: 'coy', label: 'Light Mode'}
				],
				theme: 'okaidia',
				styleRef: false,
				triggerKeys: ['?']
			},
			methods: {
				highlighter(code) {
					return Prism.highlight(code, Prism.languages.sfdx, "sfdx")
				},
				updateCaretPosition(o) {
					const p = this.getCursorXY(o.input,o.selectionEnd)
					if(!this.styleRef) {
						let s = Object.values(document.styleSheets).filter((c)=>{ return c.title == "thor" && c.href?.includes('main.css') })[0]
						if(s.rules)
							this.styleRef = s.rules[0]
					}
					const e = document.getElementById('app').getBoundingClientRect()
					this.styleRef.style.setProperty('--caretPositionX', (e.x + p.x +  4 + this.fontSize) + "px")
					this.styleRef.style.setProperty('--caretPositionY', (e.y + p.y + 14 + this.fontSize) + "px")
				},
				getCursorXY(input, selectionPoint) {
					const {
						offsetLeft: inputX,
						offsetTop: inputY,
					} = input
					const div = document.createElement('div')
					const copyStyle = getComputedStyle(input)
					for (const prop of copyStyle) {
						div.style[prop] = copyStyle[prop]
					}
					const swap = '.'
					const inputValue = input.tagName === 'INPUT' ? input.value.replace(/ /g, swap) : input.value
					const textContent = inputValue.substr(0, selectionPoint)
					div.textContent = textContent
					if (input.tagName === 'TEXTAREA') div.style.height = 'auto'
					if (input.tagName === 'INPUT') div.style.width = 'auto'
					const span = document.createElement('span')
					span.textContent = inputValue.substr(selectionPoint) || '.'
					div.appendChild(span)
					document.body.appendChild(div)
					const { offsetLeft: spanX, offsetTop: spanY } = span
					document.body.removeChild(div)
					return {
						x: inputX + spanX,
						y: inputY + spanY,
					}
				},
				updateRealValue(i,s) {
					formulaEditor.value = this.content
				},
				updateFontSize() {
					document.documentElement.style.setProperty('--fontSize', this.fontSize + "px")
				}
			}
		})
		formulaEditor.hidden = true
		app.$mount(document.getElementById('CalculatedFormula_header'))
	}
}
swapEditor()