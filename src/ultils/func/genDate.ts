export default function covertDateToString(date: string): string {
    const dateObject = new Date(date);

    // Lấy ra các thành phần của ngày/tháng/năm, giờ/phút/giây
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    const hour = dateObject.getHours().toString().padStart(2, '0');
    const minute = dateObject.getMinutes().toString().padStart(2, '0');
    const second = dateObject.getSeconds().toString().padStart(2, '0');
    return `${hour}:${minute}:${second} ${day}/${month}/${year}`;
}
