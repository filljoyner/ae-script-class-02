var CSV = (function() {
    var rawData;
    var data;
    var defaultSeparatorSymbol = ',';

    function load(file, options) {
        options = options || {};
        file.encoding = options.encoding || "utf-8";

        if(!file.open("r")) {
            throw new Error("could not open file: " + file.error);
        }

        rawData = file.read();
        file.close();
        if(file.error != "") throw new Error("could not read file: " + file.error);

        return parse(rawData, options);
    }


    function parse(csvString, options) {
        options = options || {};
        separator = options.separator || defaultSeparatorSymbol;

        var currentRow = 0;
        var currentColumn = -1; // increased to 0 in first pass of loop
        var thisCell = "";
        var i;
        var token;
        var cellStart = true;
        var insideQuote;

        for(i=0; i < csvString.length; i++) {
            token = csvString[i];
            if(cellStart) {
                processCellStart();
            }

            if(!insideQuote && token == separator) {
                addCSVCellToData(thisCell, currentRow, currentColumn);
                cellStart = true;
            } else if(!insideQuote && token == "\n") {
                processLineBreak();
            } else if(!insideQuote && token == "\r" && nextTokenLookAhead() == "\n") {
                i++;
                processLineBreak();
            } else if(insideQuote && token == '"') {
                if(nextTokenLookAhead() == '"') {
                    i++;
                    thisCell += '"';
                } else {
                    insideQuote = false;
                }
            } else {
                thisCell += token;
            }
        }

        return data;


        function processCellStart() {
            thisCell = "";
            currentColumn++;
            insideQuote = (token == '"');
            if(insideQuote) {
                i++;
                token = csvString[i];
            }
            cellStart = false;
        }


        function nextTokenLookAhead() {
            var nextTokenId = i + 1;
            return (nextTokenId < csvString.length ? csvString[nextTokenId] : "");
        }


        function addCSVCellToData(cellData, row, column) {
            if(data == undefined) data = [];
            if(data[row] == undefined) data[row] = [];

            data[row][column] = cellData;
        }


        function processLineBreak() {
            addCSVCellToData(thisCell, currentRow, currentColumn);
            cellStart = true;
            currentRow++;
            currentColumn = -1;
        }
    }


    return {
        rawData     : rawData,
        data        : data,
        load        : load,
        parse       : parse
    }
});
