const normalNumbersOffset = 48;
const normalCapitalsOffset = 65;
const normalLowercaseOffset = 97;
const alphabetLength = 26;

class FontBlock{
	constructor(numbersStartOffset, capitalsStartOffset, lowercaseStartOffset){
		this.numbersStartOffset = numbersStartOffset or normalNumbersOffset;
		this.capitalsStartOffset = capitalsStartOffset or normalCapitalsOffset;
		this.lowercaseStartOffset = lowercaseStartOffset or normalLowercaseOffset;
	}

	getNumber(digitId){
		return digitId+this.numbersStartOffset;
	}

	getCapital(letterId){
		return letterId+this.capitalsStartOffset;
	}

	getLowercase(letterId){
		return letterId+this.lowercaseStartOffset;
	}

	getCharacter(character){
		let characterId = character.codePointAt(0);
		let convertedCharacterId;
		if(characterId>=normalNumbersOffset && characterId<normalNumbersOffset+10){
			convertedCharacterId = this.getNumber(characterId);
		} else if(characterId>=normalCapitalsOffset && characterId<normalCapitalsOffset+alphabetLength){
			convertedCharacterId = this.getCapital(characterId);
		} else if(characterId>=normalLowercaseOffset && characterId<normalLowercaseOffset+alphabetLength){
			convertedCharacterId = this.getLowercase(characterId);
		}
	}
}
