lowerThirdCSV = (function() {
    #include "libraries/ae_helpers.jsx"
    #include "libraries/helpers.jsx"
    #include "functions.jsx"
    #include "libraries/CSV.jsx"

    var csv;
    var csvData;
    var config;


    function load(file) {
        csv = new CSV();
        csvData = csv.load(file)
        file.close();

        return this;
    }


    function setRow(rowNumber) {
        var dataRow = csvData[rowNumber];
        var colorArray = dataRow[2].split(',');

        config = {
            mainText: dataRow[0],
            secondaryText: dataRow[1],
            fillColor: [
                parseFloat(colorArray[0] / 255),
                parseFloat(colorArray[1] / 255),
                parseFloat(colorArray[2] / 255)
            ],
            logo: (function() {
                if(dataRow[4]) return 'mamoworld';
                if(dataRow[4]) return 'mochaimport';
                if(dataRow[4]) return 'iexpressions';
            })(),
            opacityItems: [
                [.25, 0],
                [.75, 100]
            ],
            fadeInDuration: parseFloat(dataRow[3])
        }

        return this;
    }

    function update() {
        adjustComp(app.project.activeItem, config)
    }

    return {
        load    : load,
        setRow  : setRow,
        update  : update
    }

})();

lowerThirdCSV.load(
    new File("C:\\Users\\fillj\\OneDrive\\Code\\AfterFX\\Learning\\class-02\\data\\sampleCSV.csv")
).setRow(4).update();
