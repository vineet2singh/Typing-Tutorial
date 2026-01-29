export const hindiDisplayMap = {
    'Backquote': ['़', 'ॾ'], 'Digit1': ['1', '!'], 'Digit2': ['2', '@'], 'Digit3': ['3', '#'], 'Digit4': ['4', 'र्'], 'Digit5': ['5', 'ज्ञ'], 'Digit6': ['6', 'त्र'], 'Digit7': ['7', 'क्ष'], 'Digit8': ['8', 'श्र'], 'Digit9': ['9', '('], 'Digit0': ['0', ')'], 'Minus': ['-', 'ः'], 'Equal': ['ृ', 'ऋ'],
    'KeyQ': ['ौ', 'औ'], 'KeyW': ['ै', 'ऐ'], 'KeyE': ['ा', 'आ'], 'KeyR': ['ी', 'ई'], 'KeyT': ['ू', 'ऊ'], 'KeyY': ['ब', 'भ'], 'KeyU': ['ह', 'ङ'], 'KeyI': ['ग', 'घ'], 'KeyO': ['द', 'ध'], 'KeyP': ['ज', 'झ'], 'BracketLeft': ['ड', 'ढ'], 'BracketRight':['़', 'ञ'], 'Backslash': ['ॉ', 'ऑ'],
    'KeyA': ['ो', 'ओ'], 'KeyS': ['े', 'ए'], 'KeyD': ['्', 'अ'], 'KeyF': ['ि', 'इ'], 'KeyG': ['ु', 'उ'], 'KeyH': ['प', 'फ'], 'KeyJ': ['र', 'ऱ'], 'KeyK': ['क', 'ख'], 'KeyL': ['त', 'थ'], 'Semicolon': ['च', 'छ'], 'Quote': ['ट', 'ठ'],
    'KeyZ': ['ॆ', 'ऍ'], 'KeyX': ['ं', 'ँ'], 'KeyC': ['म', 'ण'], 'KeyV': ['न', 'ऩ'], 'KeyB': ['व', 'ऴ'], 'KeyN': ['ल', 'ळ'], 'KeyM': ['s', 'श'], 'Comma': [',', 'ष'], 'Period': ['.', '।'], 'Slash': ['य', '?']
};

export const engDisplayMap = {
    'Backquote': ['`', '~'], 'Digit1': ['1', '!'], 'Digit2': ['2', '@'], 'Digit3': ['3', '#'], 'Digit4': ['4', '$'], 'Digit5': ['5', '%'], 'Digit6': ['6', '^'], 'Digit7': ['7', '&'], 'Digit8': ['8', '*'], 'Digit9': ['9', '('], 'Digit0': ['0', ')'], 'Minus': ['-', '_'], 'Equal': ['=', '+'],
    'KeyQ': ['q', 'Q'], 'KeyW': ['w', 'W'], 'KeyE': ['e', 'E'], 'KeyR': ['r', 'R'], 'KeyT': ['t', 'T'], 'KeyY': ['y', 'Y'], 'KeyU': ['u', 'U'], 'KeyI': ['i', 'I'], 'KeyO': ['o', 'O'], 'KeyP': ['p', 'P'], 'BracketLeft': ['[', '{'], 'BracketRight':[']', '}'], 'Backslash': ['\\', '|'],
    'KeyA': ['a', 'A'], 'KeyS': ['s', 'S'], 'KeyD': ['d', 'D'], 'KeyF': ['f', 'F'], 'KeyG': ['g', 'G'], 'KeyH': ['h', 'H'], 'KeyJ': ['j', 'J'], 'KeyK': ['k', 'K'], 'KeyL': ['l', 'L'], 'Semicolon': [';', ':'], 'Quote': ["'", '"'],
    'KeyZ': ['z', 'Z'], 'KeyX': ['x', 'X'], 'KeyC': ['c', 'C'], 'KeyV': ['v', 'V'], 'KeyB': ['b', 'B'], 'KeyN': ['n', 'N'], 'KeyM': ['m', 'M'], 'Comma': [',', '<'], 'Period': ['.', '>'], 'Slash': ['/', '?']
};

// Generate Input Mapping Logic
export const inscriptMapping = {};
for(let [code, chars] of Object.entries(hindiDisplayMap)) {
    let engChars = engDisplayMap[code];
    if(engChars) { inscriptMapping[engChars[0]] = chars[0]; inscriptMapping[engChars[1]] = chars[1]; }
}