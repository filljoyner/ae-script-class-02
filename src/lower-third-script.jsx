/*
----------
Imports
----------
*/
#include "libraries/ae-helpers.jsx";
#include "libraries/helpers.jsx";
#include "libraries/ui.jsx";
#include "libraries/uiImage.jsx";
#include "functions.jsx";


/*
----------
UI setup
----------
*/
var panelName = "Lower Thirds";
var scriptName = "lower_third_script";

// Build UI
var uiResourceString = "group {\
    orientation: 'column',\
    alignment: ['left', 'top'],\
    alignChildren: ['left', 'top'],\
    iconLogo: IconButton {\
        preferredSize:[60,22]\
    },\
    mainTextGroup: Group {\
        orientation: 'row',\
        mainTextLabel: StaticText {\
            preferredSize: [100, -1],\
            text: 'Main Text'\
        },\
        mainTextInput: EditText {\
            text: '',\
            characters: 40\
        },\
    },\
    secondaryTextGroup: Group {\
        orientation: 'row',\
        secondaryTextLabel: StaticText {\
            preferredSize: [100, -1],\
            text: 'Secondary Text'\
        },\
        secondaryTextInput: EditText {\
            text: '',\
            characters: 40\
        },\
    },\
    iconRadioGroup: Group {\
        orientation: 'row',\
        iconRadioLabel: StaticText {\
            preferredSize: [100, -1],\
            text: 'Icon'\
        },\
        iconMamoworldInput: RadioButton {\
            text: 'Mamoworld'\
        },\
        iconMochaImportInput: RadioButton {\
            text: 'MochaImport'\
        },\
        iconIExpressionsInput: RadioButton {\
            text: 'iExpressions'\
        },\
    }\
    iconColorGroup: Group {\
        orientation: 'row',\
        colorTextLabel: StaticText {\
            preferredSize: [100, -1],\
            text: 'Icon Color (RGB)'\
        }\
        redTextInput: EditText {\
            text: 0,\
            characters: 3\
        },\
        greenTextInput: EditText {\
            text: 0,\
            characters: 3\
        },\
        blueTextInput: EditText {\
            text: 0,\
            characters: 3\
        }\
    },\
    fadeDurationGroup: Group {\
        orientation: 'row',\
        fadeDurationTextLabel: StaticText {\
            preferredSize: [100, -1],\
            text: 'Fade Duration'\
        },\
        fadeDurationInput: EditText {\
            text: '1.0',\
            characters: 4\
        },\
    },\
    applyButtonGroup: Group {\
        orientation: 'row',\
        applyTextSpacer: StaticText {\
            preferredSize: [100, -1],\
            text: ' '\
        },\
        applyButton: Button {\
            alignment: ['left', 'bottom'],\
            text:'Apply'\
        }\
    }\
}";


// Create Panel
var scriptUIPanel = createPanel(this, uiResourceString, panelName);
// add image to iconLogo
#include "../img/logo.png.jsx";
scriptUIPanel.iconLogo.image = getUIImage("logo.png", scriptName, logopng);



/*
----------
Actions
----------
*/
scriptUIPanel.applyButtonGroup.applyButton.onClick = function() {
    panelConfigInput = {
        mainText: scriptUIPanel.mainTextGroup.mainTextInput.text,
        secondaryText: scriptUIPanel.secondaryTextGroup.secondaryTextInput.text,
        fillColor: [
            parseFloat(scriptUIPanel.iconColorGroup.redTextInput.text / 255),
            parseFloat(scriptUIPanel.iconColorGroup.greenTextInput.text / 255),
            parseFloat(scriptUIPanel.iconColorGroup.blueTextInput.text / 255)
        ],
        logo: (function() {
            if(scriptUIPanel.iconRadioGroup.iconMamoworldInput.value) return 'mamoworld';
            if(scriptUIPanel.iconRadioGroup.iconMochaImportInput.value) return 'mochaimport';
            if(scriptUIPanel.iconRadioGroup.iconIExpressionsInput.value) return 'iexpressions';
        })(),
        opacityItems: [
            [.25, 0],
            [.75, 100]
        ],
        fadeInDuration: parseFloat(scriptUIPanel.fadeDurationGroup.fadeDurationInput.text)
    }

    adjustComp(app.project.activeItem, panelConfigInput);
}
