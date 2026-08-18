const conversionTextStorageKey = "conversionText";
const selectedFontStorageKey = "selectedFont";

let fontDropdown = document.getElementById("fontSelectDropdown");
let conversionTextbox = document.getElementById("conversionTextbox");
let fontDemoParagraph = document.getElementById("fontDemoParagraph");
let copyButton = document.getElementById("copyButton");
const pangramOfChoice = "The quick brown fox jumps over the lazy dog.";
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
	browser.storage.local.set({[conversionTextStorageKey]: conversionTextbox.value}).then(()=>{});
}

function updateDemoText(){
	let normalDemoText = pangramOfChoice.toUpperCase()+"\n"+pangramOfChoice.toLowerCase()+"\n"+"1234567890";
	fontDemoParagraph.innerHTML = fontBlocks[fontDropdown.value].convertString(normalDemoText).replace(/\n/g, "</br>"); // Replace newlines with line breaks here so we don't convert the characters making up the tag.
}
updateDemoText();

fontDropdown.addEventListener("change", (event)=>{
	updateDemoText();
	console.log("Stored font dropdown value of "+fontDropdown.value);
	browser.storage.local.set({[selectedFontStorageKey]: fontDropdown.value}).then(()=>{});
});

copyButton.addEventListener("click", (event)=>{
	navigator.clipboard.writeText(conversionTextbox.value);
});

function restoreStateFromStorage(){
	browser.storage.local.get(selectedFontStorageKey).then(value=>{fontDropdown.value = value[selectedFontStorageKey]});
	browser.storage.local.get(conversionTextStorageKey).then((value)=>{conversionTextbox.value = value[conversionTextStorageKey]});
}
restoreStateFromStorage();
