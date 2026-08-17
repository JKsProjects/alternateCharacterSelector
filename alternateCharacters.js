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
			convertedCharacterId = this.characterOverrides[character];
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

// https://en.wikipedia.org/wiki/Mathematical_Alphanumeric_Symbols
let fontBlocks = {
	"Normal": new FontBlock(undefined, undefined, undefined),
	"Sans serif": new FontBlock(0x1d5a0, 0x1d5ba, 0x1d7e2),
	"Script": new FontBlock(0x1d49c, 0x1d4b6, undefined, {"B":0x212c, "E":0x2130, "F":0x2131, "H":0x210b, "I":0x2110, "L": 0x2112, "M": 0x2133, "R": 0x211b, "e":0x212f, "g": 0x210a, "o":0x2134}),
	"Franktur normal": new FontBlock(0x1d504, 0x1d51e, undefined, {"C": 0x212d, "H": 0x210c, "I": 0x2111, "R": 0x211c, "Z": 0x2128}),
	"Monospace": new FontBlock(0x1d670, 0x1d68a, 0x1d7f6),
	"Double-struck": new FontBlock(0x1d538, 0x1d552, 0x1d7d8, {"C": 0x2102, "H": 0x210d, "N": 0x2115, "P": 0x2119, "Q": 0x211a, "R": 0x211d, "Z": 0x2124}),
	"Circled": new FontBlock(0x24b6, 0x24d0, 0x2460)
};
