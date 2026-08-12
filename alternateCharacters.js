const normalNumbersOffset = 48;
const normalCapitalsOffset = 65;
const normalLowercaseOffset = 97;
const alphabetLength = 26;

class FontBlock{
	constructor(capitalsStartOffset, lowercaseStartOffset, numbersStartOffset){
		this.capitalsStartOffset = capitalsStartOffset || normalCapitalsOffset;
		this.lowercaseStartOffset = lowercaseStartOffset || normalLowercaseOffset;
		this.numbersStartOffset = numbersStartOffset || normalNumbersOffset;
	}

	getCapital(letterId){
		return letterId-normalCapitalsOffset+this.capitalsStartOffset;
	}

	getLowercase(letterId){
		return letterId-normalLowercaseOffset+this.lowercaseStartOffset;
	}

	getNumber(digitId){
		return digitId-normalNumbersOffset+this.numbersStartOffset;
	}

	convertCharacter(character){
		let characterId = character.codePointAt(0);
		let convertedCharacterId;
		if(characterId>=normalNumbersOffset && characterId<normalNumbersOffset+10){
			convertedCharacterId = this.getNumber(characterId);
		} else if(characterId>=normalCapitalsOffset && characterId<normalCapitalsOffset+alphabetLength){
			convertedCharacterId = this.getCapital(characterId);
		} else if(characterId>=normalLowercaseOffset && characterId<normalLowercaseOffset+alphabetLength){
			convertedCharacterId = this.getLowercase(characterId);
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
	"Normal": new FontBlock(undefined, undefined, undefined),
	"Script": new FontBlock(0x1d49c, 0x1d4b6, undefined),
	"Franktur normal": new FontBlock(0x1d504, 0x1d51e, undefined)
};
