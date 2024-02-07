export default function simpleXORDecryption(
    encryptedString: string,
    key: number,
): {
    email: string;
    password: string;
    name: string;
} {
    let decryptedString = '';

    for (let i = 0; i < encryptedString.length; i++) {
        let decryptedChar = String.fromCharCode(encryptedString.charCodeAt(i) ^ key);
        decryptedString += decryptedChar;
    }
    let DataArr: string[] = decryptedString.split(', ');
    return {
        name: DataArr[0],
        password: DataArr[1],
        email: DataArr[2],
    };
}
