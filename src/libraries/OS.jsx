function isWindows() {
    return $.os.indexOf("Windows") != -1;
}

function isMacOS() {
    return !isWindows();
}

function openUrl(url) {
    if(isWindows()) {
        openUrlWin(url);
    } else {
        openUrlMac(url);
    }
}

function openUrlWin(url) {
}

function openUrlMac(url) {
    var command = 'open "' + url + '"';
    system.callSystem(command);
}
