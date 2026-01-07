export function nf(num) {
    num = Math.floor(num);
    if (num < 1000) {
        return num;
    }
    const match = [
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "B" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "Qa" },
        { value: 1e18, symbol: "Qi" },
        { value: 1e21, symbol: "Sx" },
    ];
    let item = match.findLast(function (obj) { return num >= obj.value; });
    return (num / item.value).toFixed(2) + item.symbol;
}
//# sourceMappingURL=formatter.js.map