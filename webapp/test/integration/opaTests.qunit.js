sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'startprocessnew/test/integration/FirstJourney',
		'startprocessnew/test/integration/pages/C_HCMProcRecdAdminTPList',
		'startprocessnew/test/integration/pages/C_HCMProcRecdAdminTPObjectPage',
		'startprocessnew/test/integration/pages/C_HCMProcFldMetadataAdminTPObjectPage'
    ],
    function(JourneyRunner, opaJourney, C_HCMProcRecdAdminTPList, C_HCMProcRecdAdminTPObjectPage, C_HCMProcFldMetadataAdminTPObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start test/flpSandbox.html?sap-ui-xx-viewCache=false#startprocessnew-tile in web folder
            launchUrl: sap.ui.require.toUrl('startprocessnew') + '/test/flpSandbox.html?sap-ui-xx-viewCache=false#startprocessnew-tile'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheC_HCMProcRecdAdminTPList: C_HCMProcRecdAdminTPList,
					onTheC_HCMProcRecdAdminTPObjectPage: C_HCMProcRecdAdminTPObjectPage,
					onTheC_HCMProcFldMetadataAdminTPObjectPage: C_HCMProcFldMetadataAdminTPObjectPage
                }
            },
            opaJourney.run
        );
    }
);