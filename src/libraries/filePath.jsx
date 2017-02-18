#include "OS.jsx";

function joinPath(components) {
    return components.join(getPathSeparatorSymbol());
}

function getPathSeparatorSymbol() {
    return (isWindows() ? "\\" : "/");
}

function getUserDataFolderPath() {
    return Folder.userData.fsName;
}
