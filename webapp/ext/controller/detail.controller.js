sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"lib/zprocessandforms/common/library/controller/DetailController"
], function (Controller, JSONModel, Filter, FilterOperator, MessageBox, History, DetailController) {
	"use strict";

	//  return Controller.extend("startprocessnew.ext.controller.detail", {
	return DetailController.extend("startprocessnew.ext.controller.detail", {

		onInit: function () {
			debugger;
			this.initV4();
			// var oRouter = this.getOwnerComponent().getAppComponent().getRouter();
			// oRouter.getRoute("C_HCMProcRecdAdminTPdetailPage").attachPatternMatched(this._onObjectMatched, this);
			
			// var oModel = this.getOwnerComponent().getAppComponent().getModel();
			// this.getView().setModel(oModel);
			// var sPath = '/' + this.getOwnerComponent().getAppComponent().getRouter().getHashChanger().getHash();
			// oModel.bAutoExpandSelect = false
			// var oThis = this;
			// this.oContext = oModel.bindContext(sPath);
			// this.oContext.changeParameters({ "$expand": '_HCMProcessFieldMetadata' });
			
			// const list = this.oContext.requestObject().then(function (items) {
				
			// 	var oProcessRecord = items;
			// 	var aFieldMetadata = oProcessRecord._HCMProcessFieldMetadata;

			// 	var oOPLModel = new JSONModel({
			// 		ProcessRecord: oProcessRecord,
			// 		aFieldMetadata: aFieldMetadata
			// 	});

			// 	this.getView().setModel(oOPLModel, "sectionsModel");


			// }.bind(this)).catch(function (err) {
			// 	console.log(err);
			// });

			//calling with bindlist
			// this.oList = oModel.bindList("/C_HCMProcRecdAdminTP", undefined, undefined,
			// [	new Filter("HCMProcessNameCode",FilterOperator.EQ, 'ZAN_HR_PA_XX_SPECIAL_PAYMENT_1' ),
			// 	new Filter("HCMProcessUUID", FilterOperator.EQ, '42010aee-2875-1eec-b48d-545034dbf5ec'),
			// 	new Filter("HCMProcessWorkItemID", FilterOperator.EQ, '0' )
			// ]);
			// this.oList.changeParameters({ "$expand": '_HCMProcessFieldMetadata' });
			// debugger;

			// const list = this.oList.requestContexts().then(function(items){
			// 	debugger;
			// 	var oProcessRecord = items[0].getObject();
			// }).catch(function (err) {
			//     console.log(err);
			// });

		},
		// _onObjectMatched: function (oEvent) {
		// 	var oModel = this.getOwnerComponent().getAppComponent().getModel();
		// 	this.getView().setModel(oModel, "detailView");
		// 	// var sPath = '/' + this.getOwnerComponent().getAppComponent().getRouter().getHashChanger().getHash();
		// 	var sPath = '/C_HCMProcRecdAdminTP' + oEvent.getParameter("arguments").C_HCMProcRecdAdminTPKey;
		// 	oModel.bAutoExpandSelect = false
		// 	var oThis = this;
		// 	this.oContext = oModel.bindContext(sPath);
		// 	this.oContext.changeParameters({ "$expand": '"_HCMProcessFieldMetadata", "_HCMProcessUserEvent", "_HCMProcFldValHelp", "_HCMProcessAttachment", "_HCMProcessLink"' });
			
		// 	const list = this.oContext.requestObject().then(function (items) {
				
		// 		var oProcessRecord = items;
		// 		var aFieldMetadata = oProcessRecord._HCMProcessFieldMetadata;

		// 		var oOPLModel = new JSONModel({
		// 			ProcessRecord: oProcessRecord,
		// 			aFieldMetadata: aFieldMetadata
		// 		});

		// 		this.getView().setModel(oOPLModel, "sectionsModel");


		// 	}.bind(this)).catch(function (err) {
		// 		console.log(err);
		// 	});
		//   },
		onPress: function (oEvent) {
			debugger;
			var oThis = this, oContextPost, promises = [];
			var oSectionsModel = this.getView().getModel("sectionsModel").getData();
			var ProcessRecord = oSectionsModel.ProcessRecord;
			var aFieldMetadata = oSectionsModel.aFieldMetadata;
			var oModel = this.getOwnerComponent().getModel();
			var sPath = this.oContext.getPath();

			// oContextPost.changeParameters({ "updateGroupId": "ActionPost" });

			aFieldMetadata.forEach(function(item){

				var promise = new Promise(function (resolve, reject){
					oContextPost = oModel.bindContext(
						sPath +
						"/com.sap.gateway.srvd.zui_admin_process.v0001.PostAction(...)"
					);
	
					oContextPost.setParameter("field_name", item.HCMProcessFieldName);
					oContextPost.setParameter(
						"form_scenario",
						item.HCMProcScenarioName
					);
					oContextPost.setParameter("process_id", ProcessRecord.HCMProcessNameCode);
					oContextPost.setParameter(
						"form_scenario_stage",
						item.HCMProcessStageName
					);
					oContextPost.setParameter(
						"form_scenario_version",
						"0"
					);
					oContextPost.setParameter("object_key", ProcessRecord.HCMProcessAffectedObject);
					oContextPost.invoke().then(function(oData, response){
						//debugger;
						resolve(oData);
					}).catch(function (err) {
						console.log(err);
					});
				});
				// Add the promise to the array
				promises.push(promise);
			});
			
			// Use Promise.all() to wait for all promises to resolve
			Promise.all(promises)
			.then(function (results) {
			  // All promises resolved successfully
			  
			  debugger;
			})
			.catch(function (error) {
			  // If any promise is rejected, handle the error here
			  console.log(err);
			});

		},

		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
		  
			if (sPreviousHash !== undefined) {
			  window.history.go(-1);
			} else {
			  var oRouter = this.getOwnerComponent().getAppComponent().getRouter();
			  oRouter.navTo("C_HCMProcRecdAdminTPList", {}, true);
			}
		  }
	});
});
