#include "binaryFile.jsx";
#include "filePath.jsx";

function getUIImage(fileName, toolName, rawData) {
    return getBinaryFile(getImagePath(fileName, toolName), rawData);

    function getImagePath(fileName, toolName) {
        return joinPath([getUserDataFolderPath(), toolName, fileName]);
    }
}
