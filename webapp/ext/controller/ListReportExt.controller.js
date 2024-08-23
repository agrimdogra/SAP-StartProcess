sap.ui.define(['sap/ui/core/mvc/ControllerExtension',
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/library",
    "sap/m/List",
    "sap/m/StandardListItem",
    "sap/m/Text",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel",
    "sap/ui/comp/smarttable/SmartTable"
], function (ControllerExtension, MessageToast, Dialog, Button, mobileLibrary, List, 
    StandardListItem, Text, Filter, FilterOperator, Fragment, JSONModel, SmartTable) {
    'use strict';

    return ControllerExtension.extend('startprocessnew.ext.controller.ListReportExt', {
        metadata: {
            methods: {
                "onAddProcess": { "public": true, "final": true },
                "onListOnSelectionChange": { "public": true, "final": true },
                "onSearch": { "public": true, "final": true },
				"onStartProcess2": { "public": true, "final": true }
            }
        },
        // this section allows to extend lifecycle hooks or hooks provided by Fiori elements
        override: {
            /**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf test.expand.entity3.ext.controller.ExtListExpand
             */
            onInit: function () {
             // // you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
                //debugger;
                // var oModel = this.base.getAppComponent().getModel();//this.base.getExtensionAPI().getModel();
                // var oContext = oModel.bindContext("/C_HCMProcRecdAdminTP/com.sap.gateway.srvd.zui_admin_process.v0001.GetProcesses(...)");
                // oContext.invoke();
                // oContext.requestObject().then(function (items) {
                //     var oModelList = new sap.ui.model.json.JSONModel(items.value);
                //     this.base.getAppComponent().setModel(oModelList, "ProcessList");
                //     this.getView().setModel(oModelList, "ProcessList");
                // }.bind(this));
                //Fetch from process list custom entity
			    this.getProcessList();
            },
            routing: {
                onBeforeNavigation: async function (oContextInfo) {
                    console.log("navigated");
                    debugger;
                    var oLineContextData = oContextInfo.bindingContext,
                        // sKey = oLineContextData.getPath().split("(")[1].split(")")[0],
                        // sKey = oLineContextData.getPath().substring("/C_HCMProcRecdAdminTP(".length),
                        sKey = oLineContextData.getPath().substring("/C_HCMProcRecdAdminTP(".length, oLineContextData.getPath().length - 1),
                        oNav = this.base.getExtensionAPI().intentBasedNavigation,
                        oRouting = this.base.getExtensionAPI().routing;
                    oRouting.navigateToRoute("C_HCMProcRecdAdminTPdetailPage", {
                        "C_HCMProcRecdAdminTPKey": sKey
                    });
                }
            }
        },
        getProcessList: function(){
			// var oModel = this.base.getAppComponent().getModel();//this.base.getExtensionAPI().getModel();
				// var oContext = oModel.bindContext("/C_HCMProcRecdAdminTP/com.sap.gateway.srvd.zui_admin_process.v0001.GetProcesses(...)");
				// oContext.invoke();
				// oContext.requestObject().then(function (items) {
				// 	var oModelList = new sap.ui.model.json.JSONModel(items.value);
				// 	this.base.getAppComponent().setModel(oModelList, "ProcessList");
				// 	this.getView().setModel(oModelList, "ProcessList");
				// }.bind(this));
				var oModel = this.base.getAppComponent().getModel();
				var oBinding = oModel.bindList("/C_HCMProcessList(P_HCMPersonnelNumber='" + this.getSelectedPersonnelNumber() + "')/Set", null, [], [],
					{
						$$getKeepAliveContext: true,
					});
				const list = oBinding.requestContexts().then(function (items) {
					var aProcessList = [];
					for (var i = 0; i < items.length; i++) {
						aProcessList.push(items[i].getObject());
					}
					var oModelList = new sap.ui.model.json.JSONModel(aProcessList);
					this.base.getAppComponent().setModel(oModelList, "ProcessList");
					this.getView().setModel(oModelList, "ProcessList");
				}.bind(this));		
		},
		getSelectedPersonnelNumber: function(){
			//replace this code after CE enablement integration
			return 0;
		},
        onAddProcess: function (oEvent) {
            //debugger;
			// ______________________________________________________
			// ______________________________________________________
			//                  FRAGMENT DIALOG	
			// ______________________________________________________
			// ______________________________________________________
			var oThat = this;
			if (!this.oProcessListDialog) {
				// this.oProcessListDialog = 
				sap.ui.core.Fragment.load({
					name: "startprocessnew.ext.fragments.processList",
                    controller: oThat.base.extension.startprocessnew.ext.controller.ListReportExt
				}).then(function (oDialog) {

					oThat.getView().addDependent(oDialog);
					oDialog.open();
					oThat.oProcessListDialog = oDialog;
				}.bind(oThat));

			} else {
				this.oProcessListDialog.open();
			}
			// ______________________________________________________
			// ______________________________________________________
			//                   DINAMIC DIALOG		
			// ______________________________________________________
			// ______________________________________________________	
			// this.oProcessListDialog = new Dialog({
			// 	title: "Available Products",
			// 	content: 
			// 	// new List({

			// 	// 	items: {
			// 	// 		path: "ProcessList>/",
			// 	// 		template: new StandardListItem({
			// 	// 			title: "{ProcessList>HCMProcessDescription}",
			// 	// 			type: "Active"
			// 	// 		}),
			// 	// 		detailPress: this.onListOnSelectionChange
			// 	// 	},
			// 	// 	mode: "SingleSelectLeft",
			// 	// 	selectionChange: this.onListOnSelectionChange,
			// 	// 	select: this.onListOnSelectionChange
			// 	// }),
			// 	new SmartTable({entitySet: "C_HCMProcRecdAdminTP" }),
			// 	beginButton: new Button({
			// 		type: sap.m.ButtonType.Emphasized,
			// 		text: "OK",
			// 		press: function () {
			// 			this.oProcessListDialog.close();
			// 			this.onListOnSelectionChange(oEvent);
			// 		}.bind(this)
			// 	}),
			// 	endButton: new Button({
			// 		text: "Close",
			// 		press: function () {
			// 			this.oProcessListDialog.close();
			// 			this.onListOnSelectionChange(oEvent);
			// 		}.bind(this)
			// 	})
			// });
			// this.getView().addDependent(this.oProcessListDialog);
			// this.oProcessListDialog.open();
			// ______________________________________________________
			// ______________________________________________________
        },
        onProcessListSelection: function (oEvent) {

			// this.oSelectedProcess = oEvent.getSource().getParent().getContent()[0].getSelectedContexts()[0].getObject();
			// debugger;
			this.oSelectedProcess = oEvent.getSource().getSelectedItem().getBindingContext("ProcessList").getObject();
			this._openEmployeeSelectionDialog();
		},
        _openEmployeeSelectionDialog: function () {
			this.onProcessListDialogClose();
			var oThat = this;
			if (!this.oEmpSelctionDialog) {
				this.oEmpSelctionDialog = sap.ui.core.Fragment.load({
					name: "test.extend.startprocess.admin.ext.fragments.employeeList",
					controller: oThat.base.extension.test.extend.startprocess.admin.ext.controller.ExtListReport
				}).then(function (oDialog) {
					oThat.getView().addDependent(oDialog);
					oDialog.open();
					oThat.oEmpSelctionDialog = oDialog;
				}.bind(oThat));
			} else {
				this.oEmpSelctionDialog.open();
			}
		},
		onEmployeeSelection: function (oEvent) {
			// debugger;
		},
		onProcessListDialogClose: function () {
			this.oProcessListDialog.close();
			this.oProcessListDialog.destroy();
			this.oProcessListDialog = null;

		},
		onEmpDialogClose: function () {
			// debugger;
			this.oEmpSelctionDialog.close();
			this.oEmpSelctionDialog.destroy();
			this.oEmpSelctionDialog = null;
		},
        onSearchEmployee: function (oEvent) {
			var oTable = oEvent.getSource().getParent().getContent().find( function(item,index,array) { return item.sId === "idEmpListTbl"; });
			oTable.setBusy(true);
			var oModel = this.base.getAppComponent().getModel();
			var sSeachText = oEvent.getSource().getValue();
			if (sSeachText === "") {
				sSeachText = " ";
			}
			var oBinding = oModel.bindList("/C_HCMProcEmplListForAdmintr(p_adminpersonnelnumber='" +
				this.oSelectedProcess.HCMPersonnelNumber + "',p_HCMProcessNameCode='" +
				this.oSelectedProcess.HCMProcessNameCode + "')/Set", null, [], [],
				{
					// $$getKeepAliveContext: true,
					$search: '"' + sSeachText + '"'
					// p_HCMProcessNameCode: this.oSelectedProcess.HCMProcessNameCode,
					// p_adminpersonnelnumber: this.oSelectedProcess.HCMPersonnelNumber
				});
			const list = oBinding.requestContexts().then(function (items) {
				var aEmpList = [];
				for (var i = 0; i < items.length; i++) {
					aEmpList.push(items[i].getObject());
				}
				var oModelList = new sap.ui.model.json.JSONModel(aEmpList);
				this.base.getAppComponent().setModel(oModelList, "EmployeeList");
				this.getView().setModel(oModelList, "EmployeeList");
				oTable.setBusy(false);
				// }.bind(this) );
			}.bind(this));
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
            // oEvent.getSource().getParent().close()
            // this.oDefaultDialog.close();
            this.oDefaultDialog._oDialog.close();
        },
        onSearch: function (oEvent) {
            //debugger;
        	var sValue = oEvent.getParameter("query"),
				// sProcessType = this.getModel("ProcessList").getProperty("/processType"),
				oFilter, aActiveFilters = [],
				aFilters = [];
			oFilter = new Filter("HCMProcessDescription", sap.ui.model.FilterOperator.Contains, sValue);
			aActiveFilters.push(new Filter([oFilter], true));
            aFilters.push(new Filter(aActiveFilters, true));
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(aFilters);
        }
    });
});
