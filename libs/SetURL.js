export const SetUrl = (param= "") => {
    const flexApp = window.flexApp;
    const config = flexApp?.viewConfig;

    if (!flexApp || !config) {
        return;
    }

    flexApp.init2(
        config.renderView,
        config.afterRenderCallback,
        config.containerId,
        config.ModelClass,
        config.beforeRenderCallback,
        param,
        config.verMas
    );
}
