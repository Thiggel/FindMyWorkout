exports.globals = {
    intersection(arrA, arrB) {
        return arrA.filter(x => arrB.includes(x));
    },

    intersect(arrA, arrB) {
        return this.intersection(arrA, arrB).length > 0;
    },

    arrayEquals(a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    },
};