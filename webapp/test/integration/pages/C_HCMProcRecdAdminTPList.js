sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'startprocessnew',
            componentId: 'C_HCMProcRecdAdminTPList',
            contextPath: '/C_HCMProcRecdAdminTP'
        },
        CustomPageDefinitions
    );
});