function createPanel(thisObj, resourceString, panelTitle)
{
    var appPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", panelTitle, undefined, {resizeable: true});

    if (appPanel == null) return appPanel;

    var createdUI = appPanel.add(resourceString);

    appPanel.layout.layout(true);
    appPanel.layout.resize();
    appPanel.onResizing = appPanel.onResize = function() {
        this.layout.resize();
    }
    if((appPanel != null) && (appPanel instanceof Window)) {
        appPanel.show();
    }

    return createdUI;
}
