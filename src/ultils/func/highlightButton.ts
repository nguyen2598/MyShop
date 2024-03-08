export default function highlightBtn(
    input: [x: number, y: number],
    data: [x: number, y: number],
    ismaxed: boolean,
): boolean {
    if (!ismaxed) {
        if (input[0] <= data[0] && input[1] >= data[1]) return true;
    } else {
        if (input[0] <= data[0]) return true;
    }
    return false;
}
