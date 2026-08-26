const conversionTextStorageKey = "conversionText";
const selectedFontStorageKey = "selectedFont";

let fontDropdown = document.getElementById("fontSelectDropdown");
let conversionTextbox = document.getElementById("conversionTextbox");
let fontDemoParagraph = document.getElementById("fontDemoParagraph");
let copyButton = document.getElementById("copyButton");
let reverseButton = document.getElementById("reverseButton");
const pangramOfChoice = "abcdefghijklmnopqrstuvwxyz";//"The quick brown fox jumps over the lazy dog";
let fontNames = Object.keys(fontBlocks);
for(let fontIndex=0; fontIndex<fontNames.length; fontIndex++){
	let fontName = fontNames[fontIndex];
	fontDropdown.add(new Option(fontBlocks[fontName].convertString(fontName), fontName));
}

let previousTextboxLength = conversionTextbox.value.length;
conversionTextbox.addEventListener("beforeinput", (event) => {
	event.preventDefault();
	let newSelectionStart = conversionTextbox.selectionStart,
		newSelectionEnd = conversionTextbox.selectionEnd;
	if(event.inputType == "insertText" || event.inputType == "insertFromPaste"){
		let alteredInputtedText = fontBlocks[fontDropdown.value].convertString(event.data);
		conversionTextbox.value = [conversionTextbox.value.slice(0, conversionTextbox.selectionStart), alteredInputtedText, conversionTextbox.value.slice(conversionTextbox.selectionEnd, conversionTextbox.value.length)].join("");
		newSelectionEnd = (newSelectionStart += alteredInputtedText.length);
	} else if(event.inputType == "deleteContentBackward" && !(newSelectionStart == 0 && newSelectionEnd == 0)){
		conversionTextbox.value = conversionTextbox.value.slice(0, conversionTextbox.selectionStart-1) + conversionTextbox.value.slice(conversionTextbox.selectionEnd);
		newSelectionEnd = (newSelectionStart -= 1);
	} else if(event.inputType == "deleteContentForward" && !(newSelectionStart == conversionTextbox.value.length && newSelectionEnd == conversionTextbox.value.length)){
		conversionTextbox.value = conversionTextbox.value.slice(0, conversionTextbox.selectionStart) + conversionTextbox.value.slice(conversionTextbox.selectionEnd+1);
		newSelectionEnd = newSelectionStart;
	}
	conversionTextbox.selectionStart = newSelectionStart;
	conversionTextbox.selectionEnd = newSelectionEnd;
 	browser.storage.local.set({[conversionTextStorageKey]: conversionTextbox.value}).then(()=>{});
});

function updateDemoText(){
	let normalDemoText = pangramOfChoice.toUpperCase()+"\n"+pangramOfChoice.toLowerCase()+"\n"+"1234567890";
	fontDemoParagraph.innerHTML = fontBlocks[fontDropdown.value].convertString(normalDemoText).replace(/\n/g, "</br>"); // Replace newlines with line breaks here so we don't convert the characters making up the tag.
}

fontDropdown.addEventListener("change", (event)=>{
	updateDemoText();
	console.log("Stored font dropdown value of "+fontDropdown.value);
	browser.storage.local.set({[selectedFontStorageKey]: fontDropdown.value}).then(()=>{});
});

copyButton.addEventListener("click", (event)=>{
	navigator.clipboard.writeText(conversionTextbox.value);
});

reverseButton.addEventListener("click", (event)=>{
	conversionTextbox.value=conversionTextbox.value.split("").reverse().join("");
});

function restoreStateFromStorage(){
	browser.storage.local.get(selectedFontStorageKey).then(value=>{
        let storedSelectedFont = value[selectedFontStorageKey];
        fontDropdown.value = (typeof storedSelectedFont === "string")? storedSelectedFont : "";
        updateDemoText();
    });
	browser.storage.local.get(conversionTextStorageKey).then((value)=>{
        let storedConversionText = value[conversionTextStorageKey] ;
        conversionTextbox.value = (typeof storedConversionText === "string")? storedConversionText : "";
    });
}
restoreStateFromStorage();
