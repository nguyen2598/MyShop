export default function dataToString(obj: object, key: number) {
    let jsonString = JSON.stringify(obj); // Chuyển đối tượng thành chuỗi JSON
    return simpleProductXOREncryption(jsonString, key); // Mã hóa chuỗi JSON
}

function simpleProductXOREncryption(inputString: string, key: number) {
    let encryptedString = '';

    for (let i = 0; i < inputString.length; i++) {
        // Phép toán XOR giữa ký tự và khóa
        let encryptedChar = String.fromCharCode(inputString.charCodeAt(i) ^ key);
        encryptedString += encryptedChar;
    }

    // Chuyển các ký tự không phải chữ cái hoặc số thành ký tự số tương ứng
    encryptedString = encryptedString.replace(/[^a-zA-Z0-9]/g, function (match) {
        return `%2${match.charCodeAt(0)}%2`;
    });

    return encryptedString;
}
