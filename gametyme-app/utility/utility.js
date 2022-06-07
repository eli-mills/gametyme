function escapeString(stringToClean) {
    if (typeof stringToClean !== 'string') {
        return stringToClean;
    }
    const specialChars = ["'", '`', '$', '{', '}'];
    let outputString = '';
    for ( char of stringToClean ) {
        if ( specialChars.includes(char) ) {
            outputString += '\\';
            outputString += char;
        } else if (char === '"') {
            outputString += "\\'"
        } else {
            outputString += char;
        }

    }

    return outputString;
}

module.exports = {escapeString};