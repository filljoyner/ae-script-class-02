function undoGroup(name, func) {
    app.beginUndoGroup(name);
    func();
    app.endUndoGroup();
}


// get property from layer by _layer(layer, 'property.string.here')
function _l(layer, propertyThread) {
    properties = propertyThread.split('.');
    var obj = layer;
    var _lLoop;

    for(_lLoop = 0; _lLoop < properties.length; _lLoop++) obj = obj(properties[_lLoop]);

    return obj;
}


function removeAllKeyFrames(layerProperty) {
    while(layerProperty.numKeys > 0) {
        layerProperty.removeKey(1);
    }
}
