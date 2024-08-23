sap.ui.define([
    "sap/ui/test/opaQunit"
], function (opaTest) {
    "use strict";

    var Journey = {
        run: function() {
            QUnit.module("First journey");

            opaTest("Start application", function (Given, When, Then) {
                Given.iStartMyApp();

                Then.onTheC_HCMProcRecdAdminTPList.iSeeThisPage();

            });


            opaTest("Navigate to ObjectPage", function (Given, When, Then) {
                // Note: this test will fail if the ListReport page doesn't show any data
                
                When.onTheC_HCMProcRecdAdminTPList.onFilterBar().iExecuteSearch();
                
                Then.onTheC_HCMProcRecdAdminTPList.onTable().iCheckRows();

                When.onTheC_HCMProcRecdAdminTPList.onTable().iPressRow(0);
                Then.onTheC_HCMProcRecdAdminTPObjectPage.iSeeThisPage();

            });

            opaTest("Teardown", function (Given, When, Then) { 
                // Cleanup
                Given.iTearDownMyApp();
            });
        }
    }

    return Journey;
});