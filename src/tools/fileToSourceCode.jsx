function fileToBinaryString() {
    var input = File.openDialog("Choose a file to convert to source code");
    if(input === null) return;

    var rawData = readBinaryFile(input);
    sourceCode = convertRawToSourceCode(rawData, convertStringToVariableName(input.name));
    writeTextFile(input.fsName + ".jsx", sourceCode);

    function readBinaryFile(fileInput) {
        fileInput.encoding = "BINARY";
        fileInput.open("r");
        var content = fileInput.read();
        fileInput.close();
        return content;
    }

    function convertRawToSourceCode(rawData, varName) {
        return "var " + varName + " = " + rawData.toSource() + ";\n";
    }

    function writeTextFile(filePath, content) {
        var output = new File(filePath);
        output.open("w");
        output.write(content);
        output.close();
    }

    function convertStringToVariableName(string) {
        return string.replace(/\W/g, "")   // remove anything that is not letter, digit, or _
                     .replace(/^\d+/, ""); // remove digits from the from of the name
    }
}


fileToBinaryString();
