export default function encryptedStringToObject(encryptedString: string, key: number) {
    // Chuyển các ký tự số thành ký tự hoặc số tương ứng
    let decryptedString = encryptedString.replace(/%2(\d+)%2/g, function (match: string, p1) {
        return String.fromCharCode(parseInt(p1));
    });
    // Giải mã chuỗi
    decryptedString = simpleProductXOREncryption(decryptedString, key);
    console.log(decryptedString);

    // Parse chuỗi JSON để nhận lại đối tượng
    return JSON.parse(decryptedString);
}

function simpleProductXOREncryption(inputString: string, key: number) {
    let encryptedString = '';

    for (let i = 0; i < inputString.length; i++) {
        let encryptedChar = String.fromCharCode(inputString.charCodeAt(i) ^ key);
        encryptedString += encryptedChar;
    }

    return encryptedString;
}
