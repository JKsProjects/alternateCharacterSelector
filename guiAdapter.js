let fontDropdown = document.getElementById("fontSelectDropdown");
let conversionTextbox = document.getElementById("conversionTextbox");
let fontNames = Object.keys(fontBlocks);
for(let fontIndex=0; fontIndex<fontNames.length; fontIndex++){
	let fontName = fontNames[fontIndex];
	fontDropdown.add(new Option(fontBlocks[fontName].convertString(fontName), fontName));
}
let previousTextboxLength = conversionTextbox.value.length;
conversionTextbox.oninput = function(){
	let currentTextboxLength = conversionTextbox.value.length;
	if(currentTextboxLength > previousTextboxLength){
		let newConvertedText = conversionTextbox.value.slice(0, -1) + fontBlocks[fontDropdown.value].convertCharacter(conversionTextbox.value.slice(-1));
		conversionTextbox.value = newConvertedText;
	}
	previousTextboxLength = currentTextboxLength;
}
