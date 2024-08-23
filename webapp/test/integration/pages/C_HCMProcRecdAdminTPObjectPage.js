sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'startprocessnew',
            componentId: 'C_HCMProcRecdAdminTPObjectPage',
            contextPath: '/C_HCMProcRecdAdminTP'
        },
        CustomPageDefinitions
    );
});