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
var app

swapEditor = ()=>{
	if(app)
		app.$destroy()
	var formulaEditorOuter = document.getElementsByClassName('formulaEditorOuter')[0] //formula editor
	var insertFieldButton = null
	if(formulaEditorOuter)
		insertFieldButton = document.querySelector('input[name=insertField]') // don't replace the advanced editor
	if(!formulaEditorOuter)
		formulaEditorOuter = document.getElementsByClassName('pbWizardBody')[0] // new formula
	if(!formulaEditorOuter) {
		formulaEditorOuter = document.getElementById('ValidationFormula')?.parentElement // validation rule
		if(formulaEditorOuter)
			formulaEditorOuter.closest('table').style.width = "100%"
	}
	if(!formulaEditorOuter)
		formulaEditorOuter = document.querySelector('div[builder_platform_interaction-resourcedtextarea_resourcedtextarea].property-input') // flow editor
console.log(formulaEditorOuter)

	if(formulaEditorOuter && insertFieldButton == null) {
		let fieldSelector = document.getElementById('fieldSelector')
		let fields = []
		if(fieldSelector && fieldSelector.options) {
			fields = Object.values(fieldSelector.options)
				.map((e)=>{return {label: "Field: " + e.text, value: e.value}})
			fields.shift()
		}
		formulaEditor = formulaEditorOuter.getElementsByTagName('textarea')[0]

		if(formulaEditor) {
			const content = formulaEditor.value
			Vue.use(VTooltip)
			Vue.use(VueMention)
			app = new Vue({
				template: `
				<div id="app" :class="theme + ' highlight-keywords match-braces rainbow-braces'">
					<header data-plugin-header="highlight-keywords"></header>
					<header data-plugin-header="show-invisibles"></header>
					<Mentionable ref="suggestions" :keys="triggerKeys" @caret="updateCaretPosition" :items="functionValues" placement="right-start" omit-key>
						<prism-editor id="thorEditor" ref="editor" class="height-400" v-model="content" :highlight="highlighter" @input="pushToSource" line-numbers></prism-editor>
					</Mentionable>
					<div class="controls" style="font-size:14px">
						<select v-model="theme" class="themeSelector">
							<option v-for="t in themes" v-bind:value="t.value">
								{{ t.label }}
							</option>
						</select>
						<label for="fontSizeSelector" style="color:black">Font size:</label>
						<input type="range" @change="updateFontSize" min="12" max="18" id="fontSizeSelector" name="fontSizeSelector" v-model="fontSize" class="slider"/><i style="color:black">{{ fontSize }}</i>
						<br/>
					</div>
				</div>`,
				data: {
					content: content,
					originalContent: content,
					fontSize: 14,
					functionValues: functionValues.concat(fields),
					themes: [
						{value: 'okaidia', label: 'Dark Mode'},
						{value: 'coy', label: 'Light Mode'}
					],
					theme: 'okaidia',
					styleRef: false,
					x: 0,
					y: 0,
					formulaEditor: formulaEditor,
					formulaEditorOuter: formulaEditorOuter,
					isSaving: false,
					triggerKeys: ['?']
				},
				mounted() {
					this.$children[0].input.addEventListener('keyup', this.updateSourcePosition)
					this.$children[0].input.addEventListener('mouseup', this.updateSourcePosition)
				},
				methods: {
					highlighter(code) {
						return Prism.highlight(code, Prism.languages.sfdx, "sfdx")
					},
					updateSourcePosition(o) {
						this.formulaEditor.selectionStart = o.target.selectionStart
						this.formulaEditor.selectionEnd = o.target.selectionEnd
					},
					updateCaretPosition(o) {
						const p = this.getCursorXY(o.input,o.selectionEnd)
						if(!this.styleRef) {
							let s = Object.values(document.styleSheets).filter((c)=>{ return c.title == "thor" && c.href?.includes('main.css') })[0]
							if(s.rules)
								this.styleRef = s.rules[0]
						}
						const e = document.getElementById('app').getBoundingClientRect()
						this.x = (e.x + p.x +  4 + this.fontSize)
						this.y = (e.y + p.y + 14 + this.fontSize)
						this.styleRef.style.setProperty('--caretPositionX', this.x + "px")
						this.styleRef.style.setProperty('--caretPositionY', this.y + "px")
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
					pushToSource(i,s) { this.formulaEditor.value = this.content },
					pullFromSource(i,s) { this.content = this.formulaEditor.value },
					updateFontSize() { document.documentElement.style.setProperty('--fontSize', this.fontSize + "px") }
				}
			})
			formulaEditor.hidden = true
			formulaEditor.style.display = "none"
			mountPoint = document.createElement('DIV')
			mountPoint.id = 'mountPoint'
			formulaEditorOuter.append(mountPoint)
			app.$mount(mountPoint)
		}
	}
}
const checkClicks = (e)=>{
	if(e.target.tagName == 'A' || (e.target.tagName == 'SPAN' && e.target.textContent == 'Formula')) // used in Flow editor to detect when a formula is added or opened
		setTimeout(swapEditor, 300)
	else {
		let selection = e.path.filter((s)=>{ return s.tagName?.toLowerCase() == 'lightning-base-combobox-item'})[0]
		if(!selection && e.target.tagName == 'SELECT')
			selection = e.target
		if(selection && app)
			setTimeout(app.pullFromSource, 200)
	}
}
document.addEventListener('mouseup', checkClicks)
swapEditor()