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
			if(typeof convertedCharacterId === "string"){
				return convertedCharacterId; // The character to convert to is specified by string, not by code point.
			}
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
// https://www.reddit.com/r/Unicode/comments/1j4x4j6/best_upside_down_alphabet/
let fontBlocks = {
	"Normal": new FontBlock(undefined, undefined, undefined),
	"Sans serif": new FontBlock(0x1d5a0, 0x1d5ba, 0x1d7e2),
	"Script": new FontBlock(0x1d49c, 0x1d4b6, undefined, {"B": 0x212c, "E": 0x2130, "F": 0x2131, "H": 0x210b, "I": 0x2110, "L": 0x2112, "M": 0x2133, "R": 0x211b, "e":0x212f, "g": 0x210a, "o": 0x2134}),
	"Franktur normal": new FontBlock(0x1d504, 0x1d51e, undefined, {"C": 0x212d, "H": 0x210c, "I": 0x2111, "R": 0x211c, "Z": 0x2128}),
	"Monospace": new FontBlock(0x1d670, 0x1d68a, 0x1d7f6),
	"Double-struck": new FontBlock(0x1d538, 0x1d552, 0x1d7d8, {"C": 0x2102, "H": 0x210d, "N": 0x2115, "P": 0x2119, "Q": 0x211a, "R": 0x211d, "Z": 0x2124}),
	"Circled": new FontBlock(0x24b6, 0x24d0, 0x245f, {"0": 0x30}),
    "SQUARED": new FontBlock(0x1f130, undefined, undefined),
    "ROUNDED SQUARED": new FontBlock(0x1f170, undefined, undefined),
    "Regional Indicators": new FontBlock(0x1f1e6, 0x1f1e6, undefined),
    "Parentheses": new FontBlock(0x1f110, 0x249c, 0x2473, {"0": 0x30}),
    "Roman numerals": new FontBlock(undefined, undefined, 0x215f, {"0": 0x30}),
    "Music": new FontBlock(undefined, undefined, undefined, {
        "#": 0x266f,
        "c": 0x1d134,
        "b": 0x266d,
        "1": 0x1d15d,
        "2": 0x1d15e,
        "4": 0x2669,
        "8": 0x266a,
        "<": 0x1d192,
        ">": 0x1d193,
        "m": 0x1d190,
        "f": 0x1d191,
        "t": 0x1d11e
    }),
    "Full width": new FontBlock(0xff21, 0xff41, 0xff10, {
        "!": 0xff01,
        "\"": 0xff02,
        "#": 0xff03,
        "$": 0xff04,
        "%": 0xff05,
        "&": 0xff06,
        "'": 0xff07,
        "(": 0xff08,
        ")": 0xff09,
        "*": 0xff0a,
        "+": 0xff0b,
        ",": 0xff0c,
        "-": 0xff0d,
        ".": 0xff0e,
        "/": 0xff0f,
        ":": 0xff1a,
        ";": 0xff1b,
        "<": 0xff1c,
        "=": 0xff1d,
        ">": 0xff1e,
        "?": 0xff1f,
        "@": 0xff20,
        "[": 0xff3b,
        "\\": 0xff3c,
        "]": 0xff3d,
        "^": 0xff3e,
        "_": 0xff3f,
        "`": 0xff40,
        "{": 0xff5b,
        "|": 0xff5c,
        "}": 0xff5d,
        "~": 0xff5e 
    }),
	"Upside down": new FontBlock(undefined, undefined, undefined, {"a": 0x250,
		"b": "q",
		"c": 0x254,
		"d": "p",
		"e": 0x259,
		"f": 0x25f,
		"g": 0x1d77,
		"h": 0x265,
		"i": 0x131,
		"j": 0x17f,
		"k": 0x29e,
		"l": "l",
		"m": 0x26f,
		"n": "u",
		"o": "o",
		"p": "d",
		"q": "b",
		"r": 0x279,
		"s": "s",
		"t": 0x287,
		"u": "n",
		"v": 0x28c,
		"w": 0x28d,
		"x": "x",
		"y": 0x28e,
		"z": "z",
		"A": 0xa4ef,
		"B": 0xa4ed,
		"C": 0xa4db,
		"D": 0xa4f7,
		"E": 0x18e,
		"F": 0x2132,
		"G": 0xa4e8,
		"H": "H",
		"I": "I",
		"J": 0x17f,
		"K": 0xa4d8,
		"L": 0xa4f6,
		"M": "W",
		"N": "N",
		"O": "O",
		"P": 0x500,
		"Q": "`O",
		"R": 0xa4e4,
		"S": "S",
		"T": 0xa4d5,
		"U": 0xa4f5,
		"V": 0x39b,
		"W": "M",
		"X": "X",
		"Y": 0x2144,
		"Z": "Z",
		"0": "0",
		"1": 0x21c2,
		"2": 0xfea1,
		"3": 0x190,
		"4": 0x152d,
		"5": "5",
		"6": "9",
		"7": 0x1228,
		"8": "8",
		"9": "6",
		",": "'",
		".": 0x2d9,
		"?": 0xbf,
		"!": 0xa1,
		"\"": ",,",
		"'": ",",
		"`": ",",
		"(": ")",
		")": "(",
		"[": "]",
		"]": "[",
		"{": "}",
		"}": "{",
		"<": ">",
		">": "<",
		"&": 0x241b,
		"_": 0x203e
	})
};
