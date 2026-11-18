const conversionTextStorageKey = "conversionText";
const selectedFontStorageKey = "selectedFont";

let fontDropdown = document.getElementById("fontSelectDropdown");
let inputTextbox = document.getElementById("inputTextbox");
let outputTextbox = document.getElementById("outputTextbox");
let fontDemoParagraph = document.getElementById("fontDemoParagraph");
let copyButton = document.getElementById("copyButton");
let reverseButton = document.getElementById("reverseButton");
const pangramOfChoice = "abcdefghijklmnopqrstuvwxyz";//"The quick brown fox jumps over the lazy dog";
let fontNames = Object.keys(fontBlocks);
for(let fontIndex=0; fontIndex<fontNames.length; fontIndex++){
	let fontName = fontNames[fontIndex];
	fontDropdown.add(new Option(fontBlocks[fontName].convertString(fontName), fontName));
}

function updateOutputTextbox(){
	outputTextbox.value = fontBlocks[fontDropdown.value].convertString(inputTextbox.value);
}

function inputTextboxChanged(){
	updateOutputTextbox();
	browser.storage.local.set({[conversionTextStorageKey]: inputTextbox.value}).then(()=>{});
}

inputTextbox.addEventListener("input", (event) => {
	inputTextboxChanged();
});

function updateDemoText(){
	let normalDemoText = pangramOfChoice.toUpperCase()+"\n"+pangramOfChoice.toLowerCase()+"\n"+"1234567890";
	fontDemoParagraph.innerHTML = fontBlocks[fontDropdown.value].convertString(normalDemoText).replace(/\n/g, "</br>"); // Replace newlines with line breaks here so we don't convert the characters making up the tag.
}

fontDropdown.addEventListener("change", (event)=>{
	updateDemoText();
	inputTextboxChanged();
	console.log("Stored font dropdown value of "+fontDropdown.value);
	browser.storage.local.set({[selectedFontStorageKey]: fontDropdown.value}).then(()=>{});
});

copyButton.addEventListener("click", (event)=>{
	navigator.clipboard.writeText(outputTextbox.value);
});

reverseButton.addEventListener("click", (event)=>{
	inputTextbox.value=inputTextbox.value.split("").reverse().join("");
	inputTextboxChanged();
});

function restoreStateFromStorage(){
	browser.storage.local.get(selectedFontStorageKey).then(value=>{
        let storedSelectedFont = value[selectedFontStorageKey];
        fontDropdown.value = (typeof storedSelectedFont === "string")? storedSelectedFont : "";
        updateDemoText();
    });
	browser.storage.local.get(conversionTextStorageKey).then((value)=>{
        let storedConversionText = value[conversionTextStorageKey] ;
        inputTextbox.value = (typeof storedConversionText === "string")? storedConversionText : "";
		inputTextboxChanged();
    });
}
restoreStateFromStorage();
