const normalNumbersOffset = 48;
const normalCapitalsOffset = 65;
const normalLowercaseOffset = 97;
const alphabetLength = 26;

class FontBlock{
	constructor(capitalsStartOffset, lowercaseStartOffset, numbersStartOffset, characterOverrides){
		this.capitalsStartOffset = capitalsStartOffset || normalCapitalsOffset;
		this.lowercaseStartOffset = lowercaseStartOffset || normalLowercaseOffset;
		this.numbersStartOffset = numbersStartOffset || normalNumbersOffset;
		this.characterOverrides = characterOverrides;
		if(!this.characterOverrides){
			this.characterOverrides = {};
		}
	}

	convertCharacter(character){
		let characterId = character.codePointAt(0);
		let convertedCharacterId;
		if(Object.hasOwn(this.characterOverrides, character)){
			return this.characterOverrides[character];
		} else if(characterId>=normalNumbersOffset && characterId<normalNumbersOffset+10){
			convertedCharacterId = characterId-normalNumbersOffset+this.numbersStartOffset;
		} else if(characterId>=normalCapitalsOffset && characterId<normalCapitalsOffset+alphabetLength){
			convertedCharacterId = characterId-normalCapitalsOffset+this.capitalsStartOffset;
		} else if(characterId>=normalLowercaseOffset && characterId<normalLowercaseOffset+alphabetLength){
			convertedCharacterId = characterId-normalLowercaseOffset+this.lowercaseStartOffset;
		} else{
			convertedCharacterId = characterId;
		}
		return String.fromCodePoint(convertedCharacterId);
	}

	convertString(characterString){
		let result = "";
		for(let characterIndex=0; characterIndex<characterString.length; characterIndex++){
			result = result + this.convertCharacter(characterString[characterIndex]);
		}
		return result;
	}
}

let fontBlocks = {
	"Normal": new FontBlock(undefined, undefined, undefined, undefined),
	"Script": new FontBlock(0x1d49c, 0x1d4b6, undefined, undefined),
	"Franktur normal": new FontBlock(0x1d504, 0x1d51e, undefined, undefined)
};
