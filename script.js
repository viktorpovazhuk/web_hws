function reverseString(str) {
    let newStr = "";

    for (let i = str.length - 1; i >= 0; i--) {
        newStr += str[i];
    }

    return newStr;
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function reverseString(str) {
    if (str === "") return "";
    return reverseString(str.substr(1)) + str.charAt(0);
}

console.log(reverseString('123 456'));