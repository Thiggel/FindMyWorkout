exports.globals = {
    transformCurrency(currency) {
        switch(currency) {
            case 'dollars':
                return '$';
            case 'euros':
                return '€';
            case 'pounds':
                return '£';
        }
    },

    getPrice(program) {
        return `${program.price} ${this.transformCurrency(program.currency)} ${program.priceType}`
    },

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