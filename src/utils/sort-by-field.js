function handleSort(sortByField, arrayToSort)  {
    if (sortByField.length !== 0) {
        arrayToSort.sort((a, b) => {
            const valueA = a[sortByField];
            const valueB = b[sortByField];

            const numA = parseFloat(valueA);
            const numB = parseFloat(valueB);

            const isNumeric = !isNaN(numA) && !isNaN(numB);

            if (isNumeric) {
                return numA - numB;
            }

            return valueA.localeCompare(valueB);
        });
    }
}

export default handleSort
