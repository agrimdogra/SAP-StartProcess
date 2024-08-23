sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
],
    function (Controller,Fragment,JSONModel) {
        "use strict";

        var that = {
            oExtensionAPI: {},
       
        // return Controller.extend('startprocessnew.ext.controller.processList',{

        //     onInit: function() {
        //         debugger;
        //     },

            onAddProcess: function (oEvent) {
                debugger;
                // ______________________________________________________
                // ______________________________________________________
                //                  FRAGMENT DIALOG 
                // ______________________________________________________
                // ______________________________________________________
                that.oExtensionAPI = this;
                var oThat = this;
                if (!this.oDefaultDialog) {
                    this.oDefaultDialog = sap.ui.core.Fragment.load({
                        name: "startprocessnew.ext.fragments.processList",
                        controller: oThat.extension.startprocessnew.ext.controller.ListReportExt
                    }).then(function (oDialog) {
    
                        // this.getView().addDependent(oDialog);
                        this._view.addDependent(oDialog);
                        debugger;
                        oDialog.open();
                    }.bind(oThat));
    
                } else {
                    this.oDefaultDialog.open();
                }
    
                // ______________________________________________________
                // ______________________________________________________
                //                   DINAMIC DIALOG     
                // ______________________________________________________
                // ______________________________________________________   
                // this.oDefaultDialog = new Dialog({
                //  title: "Available Products",
                //  content: new List({
                //      items: {
                //          path: "ProcessList>/",
                //          template: new StandardListItem({
                //              title: "{ProcessList>HCMProcessDescription}",
                //              type: "Active"
                //          }),
                //          detailPress: this.onListOnSelectionChange
                //      },
                //      mode: "SingleSelectLeft",
                //      selectionChange: this.onListOnSelectionChange,
                //      select: this.onListOnSelectionChange
                //  }),
                //  beginButton: new Button({
                //      type: sap.m.ButtonType.Emphasized,
                //      text: "OK",
                //      press: function () {
                //          this.oDefaultDialog.close();
                //          this.onListOnSelectionChange(oEvent);
                //      }.bind(this)
                //  }),
                //  endButton: new Button({
                //      text: "Close",
                //      press: function () {
                //          this.oDefaultDialog.close();
                //          this.onListOnSelectionChange(oEvent);
                //      }.bind(this)
                //  })
                // });
                // this.getView().addDependent(this.oDefaultDialog);
                // this.oDefaultDialog.open();
                // ______________________________________________________
                // ______________________________________________________
            },
            onListOnSelectionChange: function (oEvent) {
                debugger;
                // this.oDefaultDialog.close();
                // this.oDefaultDialog.destroy();
                // if(!this.oEmpSelctionDialog){
                //  this.oEmpSelctionDialog = this.getView().getController().loadFragment({
                //      name: "test.extend.startprocess.admin.ext.fragments.employeeList"
                //  }).then(this.oEmpSelctionDialog.open()); 
                // }else{
                //  this.oEmpSelctionDialog.open();
                // }
            },
            onDialogClose: function (oEvent) {
                debugger;
                this.oDefaultDialog.close();
            },
            onSearch: function (oEvent) {
                debugger;
            }
        // });

        };
        return that;
    }
);