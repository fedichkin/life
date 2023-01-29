(function(){
    const SIZE_FIELD = 16;
    let initialState = Array(SIZE_FIELD * SIZE_FIELD). fill(0);
    let interval = 0;
    const fieldElement = document.getElementById("field");
    const buttonStart = document.getElementById("button-start");
    const buttonEnd = document.getElementById("button-end");

    const onClickCell = function(index){
        initialState[index] = initialState[index] === 0 ? 1 : 0;
        render();
    };

    const render = function() {
        fieldElement.innerHTML = "";

        initialState.forEach(function(element, index){
            const cellElement = document.createElement("DIV");

            cellElement.classList.add("field-cell");

            if (element === 1) {
                cellElement.classList.add("active");
            }

            cellElement.addEventListener("click", function() {
                onClickCell(index);
            });

            fieldElement.appendChild(cellElement);
        });
    }

    const getNeighboringIndexes = function(index) {
        const indexes = [
            index - 1,
            index + 1,
            index - SIZE_FIELD - 1,
            index - SIZE_FIELD,
            index - SIZE_FIELD + 1,
            index + SIZE_FIELD - 1,
            index + SIZE_FIELD,
            index + SIZE_FIELD + 1
        ];

        return indexes.filter(function(value){
            return value > 0 && value < (SIZE_FIELD * SIZE_FIELD);
        });
    };

    const getCountNeighbors = function(index) {
        const indexes = getNeighboringIndexes(index);

        return indexes.filter(function(value){
            return initialState[value] === 1;
        }).length;
    };

    const process = function() {
        const newState = [...initialState];

        initialState.forEach(function(value, index){
            const countNeighbors = getCountNeighbors(index);

            if (value === 1 && (countNeighbors < 2 || countNeighbors > 3)) {
                newState[index] = 0;
            } else if (value === 0 && countNeighbors === 3) {
                newState[index] = 1;
            }
        });

        initialState = [...newState];
        render();
    }

    buttonStart.addEventListener("click", function(){
        interval = setInterval(process, 1000);
    });

    buttonEnd.addEventListener("click", function() {
        clearInterval(interval);
    });

    render();
}());
