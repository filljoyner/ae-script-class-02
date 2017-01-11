function selectIcon(logoPrecomp, enabledLayerName) {
    foreach(['mamoworld', 'iexpressions', 'mochaimport'], function(layerName) {
        if(logoPrecomp.layer(layerName) != null) {
            logoPrecomp.layer(layerName).enabled = false;
        }
    });

    if(logoPrecomp.layer(enabledLayerName) != null) {
        logoPrecomp.layer(enabledLayerName).enabled = true;
    }
}


function fadeInLayer(layer, startTime, endTime) {
    var opacityProperty = layer.property("Transform")("Opacity");
    removeAllKeyFrames(opacityProperty);
    opacityProperty.setValueAtTime(startTime, 0);
    opacityProperty.setValueAtTime(endTime, 100);
}


function fadeOutLayer(layer, startTime, endTime) {
    var opacityProperty = layer.property("Transform")("Opacity");
    removeAllKeyFrames(opacityProperty);
    opacityProperty.setValueAtTime(startTime, 100);
    opacityProperty.setValueAtTime(endTime, 0);
}


function adjustComp(comp, config) {
    if(comp instanceof CompItem) {

        // initialize variables
        var fadeLayer = comp.layer('fadeInSolid');
        var textMain = comp.layer("main text");
        var textSub = comp.layer("secondary text");
        var logo = comp.layer("icon");
        var logoPrecomp = (logo ? logo.source : null);

        undoGroup('Exercise Script', function() {

            // set source text
            if(textMain != null) _l(textMain, "Text.Source Text").setValue(config.mainText);
            if(textSub != null) _l(textSub, "Text.Source Text").setValue(config.secondaryText);
            if(logo != null) _l(logo, "Effects.Fill.Color").setValue(config.fillColor);

            // remove all opacity keyframes
            foreach([textMain, textSub, logo], function(layerItem) {
                if(layerItem) removeAllKeyFrames(_l(layerItem, "Transform.Opacity"));
            });

            // add opacity keyframes
            foreach(config.opacityItems, function(opacityItem) {
                foreach([textMain, textSub, logo], function(layerItem) {
                    if(layerItem) _l(layerItem, "Transform.Opacity").setValueAtTime(opacityItem[0], opacityItem[1]);
                });
            });

            fadeOutLayer(fadeLayer, 0, config.fadeInDuration);

            // select icon
            selectIcon(logoPrecomp, config.logo);
        });

    } else {
        alert('Please select a lower third composition');
    }
}
