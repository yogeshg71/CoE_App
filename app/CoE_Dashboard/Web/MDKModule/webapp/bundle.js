(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/CoE_Dashboard/i18n/i18n.properties":
/*!**************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/i18n/i18n.properties ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/AppUpdateFailure.js":
/*!*******************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/AppUpdateFailure.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/CoE_Dashboard/Actions/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/AppUpdateSuccess.js":
/*!*******************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/AppUpdateSuccess.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/CoE_Dashboard/Actions/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/CoE_Dashboard/Actions/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Certifications/Certifications_Cancel.js":
/*!***************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Certifications/Certifications_Cancel.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Certifications')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Certifications'
                },
                'OnSuccess': '/CoE_Dashboard/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/CloseModalPage_Cancel.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Certifications/Certifications_CreateEntity.js":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Certifications/Certifications_CreateEntity.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Certifications')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/Certifications/Certifications_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/CoE_Dashboard/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Certifications',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Certifications/Certifications_CreateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Certifications/Certifications_DeleteConfirmation.js":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Certifications/Certifications_DeleteConfirmation.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/CoE_Dashboard/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/CoE_Dashboard/Actions/Certifications/Certifications_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Certifications/Certifications_UpdateEntity.js":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Certifications/Certifications_UpdateEntity.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Certifications')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/Certifications/Certifications_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/CoE_Dashboard/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Certifications'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Certifications/Certifications_UpdateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Certifications/NavToCertifications_Edit.js":
/*!******************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Certifications/NavToCertifications_Edit.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Certifications')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Certifications'
                },
                'OnSuccess': '/CoE_Dashboard/Actions/Certifications/NavToCertifications_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Certifications/NavToCertifications_Edit.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Employees/Employees_Cancel.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Employees/Employees_Cancel.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Employees')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Employees'
                },
                'OnSuccess': '/CoE_Dashboard/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/CloseModalPage_Cancel.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Employees/Employees_CreateCertifications.js":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Employees/Employees_CreateCertifications.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateRelatedEntity)
/* harmony export */ });
function CreateRelatedEntity(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Employees')) {
        let readLink = clientAPI.binding['@odata.readLink'];
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/Employees/Employees_CreateCertifications.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/CoE_Dashboard/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Employees',
                        'ReadLink': readLink
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Employees/Employees_CreateCertifications.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Employees/Employees_CreateEntity.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Employees/Employees_CreateEntity.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Employees')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/Employees/Employees_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/CoE_Dashboard/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Employees',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Employees/Employees_CreateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Employees/Employees_CreateSkills.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Employees/Employees_CreateSkills.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateRelatedEntity)
/* harmony export */ });
function CreateRelatedEntity(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Employees')) {
        let readLink = clientAPI.binding['@odata.readLink'];
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/Employees/Employees_CreateSkills.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/CoE_Dashboard/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Employees',
                        'ReadLink': readLink
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Employees/Employees_CreateSkills.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Employees/Employees_CreateUtilizations.js":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Employees/Employees_CreateUtilizations.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateRelatedEntity)
/* harmony export */ });
function CreateRelatedEntity(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Employees')) {
        let readLink = clientAPI.binding['@odata.readLink'];
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/Employees/Employees_CreateUtilizations.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/CoE_Dashboard/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Employees',
                        'ReadLink': readLink
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Employees/Employees_CreateUtilizations.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Employees/Employees_DeleteConfirmation.js":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Employees/Employees_DeleteConfirmation.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/CoE_Dashboard/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/CoE_Dashboard/Actions/Employees/Employees_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Employees/Employees_UpdateEntity.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Employees/Employees_UpdateEntity.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Employees')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/Employees/Employees_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/CoE_Dashboard/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Employees'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Employees/Employees_UpdateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Employees/NavToEmployees_CreateCertifications.js":
/*!************************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Employees/NavToEmployees_CreateCertifications.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToCreate)
/* harmony export */ });
function NavToCreate(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Employees')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Employees'
                },
                'OnSuccess': '/CoE_Dashboard/Actions/Employees/NavToEmployees_CreateCertifications.action'
            }
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Employees/NavToEmployees_CreateCertifications.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Employees/NavToEmployees_CreateSkills.js":
/*!****************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Employees/NavToEmployees_CreateSkills.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToCreate)
/* harmony export */ });
function NavToCreate(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Employees')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Employees'
                },
                'OnSuccess': '/CoE_Dashboard/Actions/Employees/NavToEmployees_CreateSkills.action'
            }
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Employees/NavToEmployees_CreateSkills.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Employees/NavToEmployees_CreateUtilizations.js":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Employees/NavToEmployees_CreateUtilizations.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToCreate)
/* harmony export */ });
function NavToCreate(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Employees')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Employees'
                },
                'OnSuccess': '/CoE_Dashboard/Actions/Employees/NavToEmployees_CreateUtilizations.action'
            }
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Employees/NavToEmployees_CreateUtilizations.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Employees/NavToEmployees_Edit.js":
/*!********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Employees/NavToEmployees_Edit.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Employees')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Employees'
                },
                'OnSuccess': '/CoE_Dashboard/Actions/Employees/NavToEmployees_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Employees/NavToEmployees_Edit.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Modules/Modules_Cancel.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Modules/Modules_Cancel.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Modules')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Modules'
                },
                'OnSuccess': '/CoE_Dashboard/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/CloseModalPage_Cancel.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Modules/Modules_CreateEmployees.js":
/*!**********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Modules/Modules_CreateEmployees.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateRelatedEntity)
/* harmony export */ });
function CreateRelatedEntity(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Modules')) {
        let readLink = clientAPI.binding['@odata.readLink'];
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/Modules/Modules_CreateEmployees.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/CoE_Dashboard/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Modules',
                        'ReadLink': readLink
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Modules/Modules_CreateEmployees.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Modules/Modules_CreateEntity.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Modules/Modules_CreateEntity.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Modules')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/Modules/Modules_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/CoE_Dashboard/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Modules',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Modules/Modules_CreateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Modules/Modules_CreateProjects.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Modules/Modules_CreateProjects.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateRelatedEntity)
/* harmony export */ });
function CreateRelatedEntity(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Modules')) {
        let readLink = clientAPI.binding['@odata.readLink'];
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/Modules/Modules_CreateProjects.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/CoE_Dashboard/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Modules',
                        'ReadLink': readLink
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Modules/Modules_CreateProjects.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Modules/Modules_CreateSkills.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Modules/Modules_CreateSkills.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateRelatedEntity)
/* harmony export */ });
function CreateRelatedEntity(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Modules')) {
        let readLink = clientAPI.binding['@odata.readLink'];
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/Modules/Modules_CreateSkills.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/CoE_Dashboard/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Modules',
                        'ReadLink': readLink
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Modules/Modules_CreateSkills.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Modules/Modules_DeleteConfirmation.js":
/*!*************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Modules/Modules_DeleteConfirmation.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/CoE_Dashboard/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/CoE_Dashboard/Actions/Modules/Modules_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Modules/Modules_UpdateEntity.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Modules/Modules_UpdateEntity.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Modules')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/Modules/Modules_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/CoE_Dashboard/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Modules'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Modules/Modules_UpdateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Modules/NavToModules_CreateEmployees.js":
/*!***************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Modules/NavToModules_CreateEmployees.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToCreate)
/* harmony export */ });
function NavToCreate(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Modules')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Modules'
                },
                'OnSuccess': '/CoE_Dashboard/Actions/Modules/NavToModules_CreateEmployees.action'
            }
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Modules/NavToModules_CreateEmployees.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Modules/NavToModules_CreateProjects.js":
/*!**************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Modules/NavToModules_CreateProjects.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToCreate)
/* harmony export */ });
function NavToCreate(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Modules')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Modules'
                },
                'OnSuccess': '/CoE_Dashboard/Actions/Modules/NavToModules_CreateProjects.action'
            }
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Modules/NavToModules_CreateProjects.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Modules/NavToModules_CreateSkills.js":
/*!************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Modules/NavToModules_CreateSkills.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToCreate)
/* harmony export */ });
function NavToCreate(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Modules')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Modules'
                },
                'OnSuccess': '/CoE_Dashboard/Actions/Modules/NavToModules_CreateSkills.action'
            }
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Modules/NavToModules_CreateSkills.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Modules/NavToModules_Edit.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Modules/NavToModules_Edit.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Modules')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Modules'
                },
                'OnSuccess': '/CoE_Dashboard/Actions/Modules/NavToModules_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Modules/NavToModules_Edit.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/OnWillUpdate.js":
/*!***************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/OnWillUpdate.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/CoE_Dashboard/Actions/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return Promise.resolve();
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Projects/NavToProjects_CreateEmployees.js":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Projects/NavToProjects_CreateEmployees.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToCreate)
/* harmony export */ });
function NavToCreate(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Projects')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Projects'
                },
                'OnSuccess': '/CoE_Dashboard/Actions/Projects/NavToProjects_CreateEmployees.action'
            }
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Projects/NavToProjects_CreateEmployees.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Projects/NavToProjects_CreateUtilizations.js":
/*!********************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Projects/NavToProjects_CreateUtilizations.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToCreate)
/* harmony export */ });
function NavToCreate(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Projects')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Projects'
                },
                'OnSuccess': '/CoE_Dashboard/Actions/Projects/NavToProjects_CreateUtilizations.action'
            }
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Projects/NavToProjects_CreateUtilizations.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Projects/NavToProjects_Edit.js":
/*!******************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Projects/NavToProjects_Edit.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Projects')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Projects'
                },
                'OnSuccess': '/CoE_Dashboard/Actions/Projects/NavToProjects_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Projects/NavToProjects_Edit.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Projects/Projects_Cancel.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Projects/Projects_Cancel.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Projects')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Projects'
                },
                'OnSuccess': '/CoE_Dashboard/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/CloseModalPage_Cancel.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Projects/Projects_CreateEmployees.js":
/*!************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Projects/Projects_CreateEmployees.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateRelatedEntity)
/* harmony export */ });
function CreateRelatedEntity(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Projects')) {
        let readLink = clientAPI.binding['@odata.readLink'];
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/Projects/Projects_CreateEmployees.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/CoE_Dashboard/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Projects',
                        'ReadLink': readLink
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Projects/Projects_CreateEmployees.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Projects/Projects_CreateEntity.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Projects/Projects_CreateEntity.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Projects')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/Projects/Projects_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/CoE_Dashboard/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Projects',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Projects/Projects_CreateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Projects/Projects_CreateUtilizations.js":
/*!***************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Projects/Projects_CreateUtilizations.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateRelatedEntity)
/* harmony export */ });
function CreateRelatedEntity(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Projects')) {
        let readLink = clientAPI.binding['@odata.readLink'];
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/Projects/Projects_CreateUtilizations.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/CoE_Dashboard/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Projects',
                        'ReadLink': readLink
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Projects/Projects_CreateUtilizations.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Projects/Projects_DeleteConfirmation.js":
/*!***************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Projects/Projects_DeleteConfirmation.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/CoE_Dashboard/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/CoE_Dashboard/Actions/Projects/Projects_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Projects/Projects_UpdateEntity.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Projects/Projects_UpdateEntity.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Projects')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/Projects/Projects_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/CoE_Dashboard/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Projects'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Projects/Projects_UpdateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/ResetAppSettingsAndLogout.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/ResetAppSettingsAndLogout.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
function ResetAppSettingsAndLogout(context) {
    let logger = context.getLogger();
    let platform = context.nativescript.platformModule;
    let appSettings = context.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = context.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return context.getPageProxy().executeAction('/CoE_Dashboard/Actions/Logout.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Skills/NavToSkills_Edit.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Skills/NavToSkills_Edit.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Skills')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Skills'
                },
                'OnSuccess': '/CoE_Dashboard/Actions/Skills/NavToSkills_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Skills/NavToSkills_Edit.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Skills/Skills_Cancel.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Skills/Skills_Cancel.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Skills')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Skills'
                },
                'OnSuccess': '/CoE_Dashboard/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/CloseModalPage_Cancel.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Skills/Skills_CreateEntity.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Skills/Skills_CreateEntity.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Skills')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/Skills/Skills_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/CoE_Dashboard/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Skills',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Skills/Skills_CreateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Skills/Skills_DeleteConfirmation.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Skills/Skills_DeleteConfirmation.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/CoE_Dashboard/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/CoE_Dashboard/Actions/Skills/Skills_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Skills/Skills_UpdateEntity.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Skills/Skills_UpdateEntity.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Skills')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/Skills/Skills_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/CoE_Dashboard/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Skills'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Skills/Skills_UpdateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Utilizations/NavToUtilizations_Edit.js":
/*!**************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Utilizations/NavToUtilizations_Edit.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Utilizations')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Utilizations'
                },
                'OnSuccess': '/CoE_Dashboard/Actions/Utilizations/NavToUtilizations_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Utilizations/NavToUtilizations_Edit.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Utilizations/Utilizations_Cancel.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Utilizations/Utilizations_Cancel.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Utilizations')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Utilizations'
                },
                'OnSuccess': '/CoE_Dashboard/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/CloseModalPage_Cancel.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Utilizations/Utilizations_CreateEntity.js":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Utilizations/Utilizations_CreateEntity.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Utilizations')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/Utilizations/Utilizations_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/CoE_Dashboard/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Utilizations',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Utilizations/Utilizations_CreateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Utilizations/Utilizations_DeleteConfirmation.js":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Utilizations/Utilizations_DeleteConfirmation.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/CoE_Dashboard/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/CoE_Dashboard/Actions/Utilizations/Utilizations_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Rules/Utilizations/Utilizations_UpdateEntity.js":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Rules/Utilizations/Utilizations_UpdateEntity.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/CoE_Dashboard/Services/service1.service').isDraftEnabled('Utilizations')) {
        return clientAPI.executeAction({
            'Name': '/CoE_Dashboard/Actions/Utilizations/Utilizations_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/CoE_Dashboard/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Utilizations'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/CoE_Dashboard/Actions/Utilizations/Utilizations_UpdateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let coe_dashboard_actions_appupdate_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/AppUpdate.action */ "./build.definitions/CoE_Dashboard/Actions/AppUpdate.action")
let coe_dashboard_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/AppUpdateFailureMessage.action */ "./build.definitions/CoE_Dashboard/Actions/AppUpdateFailureMessage.action")
let coe_dashboard_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/AppUpdateProgressBanner.action */ "./build.definitions/CoE_Dashboard/Actions/AppUpdateProgressBanner.action")
let coe_dashboard_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/CoE_Dashboard/Actions/AppUpdateSuccessMessage.action")
let coe_dashboard_actions_certifications_certifications_createentity_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Certifications/Certifications_CreateEntity.action */ "./build.definitions/CoE_Dashboard/Actions/Certifications/Certifications_CreateEntity.action")
let coe_dashboard_actions_certifications_certifications_deleteentity_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Certifications/Certifications_DeleteEntity.action */ "./build.definitions/CoE_Dashboard/Actions/Certifications/Certifications_DeleteEntity.action")
let coe_dashboard_actions_certifications_certifications_updateentity_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Certifications/Certifications_UpdateEntity.action */ "./build.definitions/CoE_Dashboard/Actions/Certifications/Certifications_UpdateEntity.action")
let coe_dashboard_actions_certifications_navtocertifications_create_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Certifications/NavToCertifications_Create.action */ "./build.definitions/CoE_Dashboard/Actions/Certifications/NavToCertifications_Create.action")
let coe_dashboard_actions_certifications_navtocertifications_detail_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Certifications/NavToCertifications_Detail.action */ "./build.definitions/CoE_Dashboard/Actions/Certifications/NavToCertifications_Detail.action")
let coe_dashboard_actions_certifications_navtocertifications_edit_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Certifications/NavToCertifications_Edit.action */ "./build.definitions/CoE_Dashboard/Actions/Certifications/NavToCertifications_Edit.action")
let coe_dashboard_actions_certifications_navtocertifications_list_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Certifications/NavToCertifications_List.action */ "./build.definitions/CoE_Dashboard/Actions/Certifications/NavToCertifications_List.action")
let coe_dashboard_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/CloseModalPage_Cancel.action */ "./build.definitions/CoE_Dashboard/Actions/CloseModalPage_Cancel.action")
let coe_dashboard_actions_closemodalpage_complete_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/CloseModalPage_Complete.action */ "./build.definitions/CoE_Dashboard/Actions/CloseModalPage_Complete.action")
let coe_dashboard_actions_closepage_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/ClosePage.action */ "./build.definitions/CoE_Dashboard/Actions/ClosePage.action")
let coe_dashboard_actions_createentityfailuremessage_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/CreateEntityFailureMessage.action */ "./build.definitions/CoE_Dashboard/Actions/CreateEntityFailureMessage.action")
let coe_dashboard_actions_createentitysuccessmessage_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/CreateEntitySuccessMessage.action */ "./build.definitions/CoE_Dashboard/Actions/CreateEntitySuccessMessage.action")
let coe_dashboard_actions_deleteconfirmation_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/DeleteConfirmation.action */ "./build.definitions/CoE_Dashboard/Actions/DeleteConfirmation.action")
let coe_dashboard_actions_deleteentityfailuremessage_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/DeleteEntityFailureMessage.action */ "./build.definitions/CoE_Dashboard/Actions/DeleteEntityFailureMessage.action")
let coe_dashboard_actions_deleteentitysuccessmessage_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/DeleteEntitySuccessMessage.action */ "./build.definitions/CoE_Dashboard/Actions/DeleteEntitySuccessMessage.action")
let coe_dashboard_actions_draftdiscardentity_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/DraftDiscardEntity.action */ "./build.definitions/CoE_Dashboard/Actions/DraftDiscardEntity.action")
let coe_dashboard_actions_drafteditentity_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/DraftEditEntity.action */ "./build.definitions/CoE_Dashboard/Actions/DraftEditEntity.action")
let coe_dashboard_actions_draftsaveentity_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/DraftSaveEntity.action */ "./build.definitions/CoE_Dashboard/Actions/DraftSaveEntity.action")
let coe_dashboard_actions_employees_employees_createcertifications_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Employees/Employees_CreateCertifications.action */ "./build.definitions/CoE_Dashboard/Actions/Employees/Employees_CreateCertifications.action")
let coe_dashboard_actions_employees_employees_createentity_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Employees/Employees_CreateEntity.action */ "./build.definitions/CoE_Dashboard/Actions/Employees/Employees_CreateEntity.action")
let coe_dashboard_actions_employees_employees_createskills_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Employees/Employees_CreateSkills.action */ "./build.definitions/CoE_Dashboard/Actions/Employees/Employees_CreateSkills.action")
let coe_dashboard_actions_employees_employees_createutilizations_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Employees/Employees_CreateUtilizations.action */ "./build.definitions/CoE_Dashboard/Actions/Employees/Employees_CreateUtilizations.action")
let coe_dashboard_actions_employees_employees_deleteentity_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Employees/Employees_DeleteEntity.action */ "./build.definitions/CoE_Dashboard/Actions/Employees/Employees_DeleteEntity.action")
let coe_dashboard_actions_employees_employees_detailpopover_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Employees/Employees_DetailPopover.action */ "./build.definitions/CoE_Dashboard/Actions/Employees/Employees_DetailPopover.action")
let coe_dashboard_actions_employees_employees_updateentity_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Employees/Employees_UpdateEntity.action */ "./build.definitions/CoE_Dashboard/Actions/Employees/Employees_UpdateEntity.action")
let coe_dashboard_actions_employees_navtoemployees_create_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Employees/NavToEmployees_Create.action */ "./build.definitions/CoE_Dashboard/Actions/Employees/NavToEmployees_Create.action")
let coe_dashboard_actions_employees_navtoemployees_createcertifications_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Employees/NavToEmployees_CreateCertifications.action */ "./build.definitions/CoE_Dashboard/Actions/Employees/NavToEmployees_CreateCertifications.action")
let coe_dashboard_actions_employees_navtoemployees_createskills_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Employees/NavToEmployees_CreateSkills.action */ "./build.definitions/CoE_Dashboard/Actions/Employees/NavToEmployees_CreateSkills.action")
let coe_dashboard_actions_employees_navtoemployees_createutilizations_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Employees/NavToEmployees_CreateUtilizations.action */ "./build.definitions/CoE_Dashboard/Actions/Employees/NavToEmployees_CreateUtilizations.action")
let coe_dashboard_actions_employees_navtoemployees_detail_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Employees/NavToEmployees_Detail.action */ "./build.definitions/CoE_Dashboard/Actions/Employees/NavToEmployees_Detail.action")
let coe_dashboard_actions_employees_navtoemployees_edit_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Employees/NavToEmployees_Edit.action */ "./build.definitions/CoE_Dashboard/Actions/Employees/NavToEmployees_Edit.action")
let coe_dashboard_actions_employees_navtoemployees_list_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Employees/NavToEmployees_List.action */ "./build.definitions/CoE_Dashboard/Actions/Employees/NavToEmployees_List.action")
let coe_dashboard_actions_logout_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Logout.action */ "./build.definitions/CoE_Dashboard/Actions/Logout.action")
let coe_dashboard_actions_logoutmessage_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/LogoutMessage.action */ "./build.definitions/CoE_Dashboard/Actions/LogoutMessage.action")
let coe_dashboard_actions_modules_modules_createemployees_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Modules/Modules_CreateEmployees.action */ "./build.definitions/CoE_Dashboard/Actions/Modules/Modules_CreateEmployees.action")
let coe_dashboard_actions_modules_modules_createentity_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Modules/Modules_CreateEntity.action */ "./build.definitions/CoE_Dashboard/Actions/Modules/Modules_CreateEntity.action")
let coe_dashboard_actions_modules_modules_createprojects_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Modules/Modules_CreateProjects.action */ "./build.definitions/CoE_Dashboard/Actions/Modules/Modules_CreateProjects.action")
let coe_dashboard_actions_modules_modules_createskills_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Modules/Modules_CreateSkills.action */ "./build.definitions/CoE_Dashboard/Actions/Modules/Modules_CreateSkills.action")
let coe_dashboard_actions_modules_modules_deleteentity_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Modules/Modules_DeleteEntity.action */ "./build.definitions/CoE_Dashboard/Actions/Modules/Modules_DeleteEntity.action")
let coe_dashboard_actions_modules_modules_detailpopover_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Modules/Modules_DetailPopover.action */ "./build.definitions/CoE_Dashboard/Actions/Modules/Modules_DetailPopover.action")
let coe_dashboard_actions_modules_modules_updateentity_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Modules/Modules_UpdateEntity.action */ "./build.definitions/CoE_Dashboard/Actions/Modules/Modules_UpdateEntity.action")
let coe_dashboard_actions_modules_navtomodules_create_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Modules/NavToModules_Create.action */ "./build.definitions/CoE_Dashboard/Actions/Modules/NavToModules_Create.action")
let coe_dashboard_actions_modules_navtomodules_createemployees_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Modules/NavToModules_CreateEmployees.action */ "./build.definitions/CoE_Dashboard/Actions/Modules/NavToModules_CreateEmployees.action")
let coe_dashboard_actions_modules_navtomodules_createprojects_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Modules/NavToModules_CreateProjects.action */ "./build.definitions/CoE_Dashboard/Actions/Modules/NavToModules_CreateProjects.action")
let coe_dashboard_actions_modules_navtomodules_createskills_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Modules/NavToModules_CreateSkills.action */ "./build.definitions/CoE_Dashboard/Actions/Modules/NavToModules_CreateSkills.action")
let coe_dashboard_actions_modules_navtomodules_detail_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Modules/NavToModules_Detail.action */ "./build.definitions/CoE_Dashboard/Actions/Modules/NavToModules_Detail.action")
let coe_dashboard_actions_modules_navtomodules_edit_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Modules/NavToModules_Edit.action */ "./build.definitions/CoE_Dashboard/Actions/Modules/NavToModules_Edit.action")
let coe_dashboard_actions_modules_navtomodules_list_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Modules/NavToModules_List.action */ "./build.definitions/CoE_Dashboard/Actions/Modules/NavToModules_List.action")
let coe_dashboard_actions_onwillupdate_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/OnWillUpdate.action */ "./build.definitions/CoE_Dashboard/Actions/OnWillUpdate.action")
let coe_dashboard_actions_projects_navtoprojects_create_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Projects/NavToProjects_Create.action */ "./build.definitions/CoE_Dashboard/Actions/Projects/NavToProjects_Create.action")
let coe_dashboard_actions_projects_navtoprojects_createemployees_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Projects/NavToProjects_CreateEmployees.action */ "./build.definitions/CoE_Dashboard/Actions/Projects/NavToProjects_CreateEmployees.action")
let coe_dashboard_actions_projects_navtoprojects_createutilizations_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Projects/NavToProjects_CreateUtilizations.action */ "./build.definitions/CoE_Dashboard/Actions/Projects/NavToProjects_CreateUtilizations.action")
let coe_dashboard_actions_projects_navtoprojects_detail_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Projects/NavToProjects_Detail.action */ "./build.definitions/CoE_Dashboard/Actions/Projects/NavToProjects_Detail.action")
let coe_dashboard_actions_projects_navtoprojects_edit_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Projects/NavToProjects_Edit.action */ "./build.definitions/CoE_Dashboard/Actions/Projects/NavToProjects_Edit.action")
let coe_dashboard_actions_projects_navtoprojects_list_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Projects/NavToProjects_List.action */ "./build.definitions/CoE_Dashboard/Actions/Projects/NavToProjects_List.action")
let coe_dashboard_actions_projects_projects_createemployees_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Projects/Projects_CreateEmployees.action */ "./build.definitions/CoE_Dashboard/Actions/Projects/Projects_CreateEmployees.action")
let coe_dashboard_actions_projects_projects_createentity_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Projects/Projects_CreateEntity.action */ "./build.definitions/CoE_Dashboard/Actions/Projects/Projects_CreateEntity.action")
let coe_dashboard_actions_projects_projects_createutilizations_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Projects/Projects_CreateUtilizations.action */ "./build.definitions/CoE_Dashboard/Actions/Projects/Projects_CreateUtilizations.action")
let coe_dashboard_actions_projects_projects_deleteentity_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Projects/Projects_DeleteEntity.action */ "./build.definitions/CoE_Dashboard/Actions/Projects/Projects_DeleteEntity.action")
let coe_dashboard_actions_projects_projects_detailpopover_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Projects/Projects_DetailPopover.action */ "./build.definitions/CoE_Dashboard/Actions/Projects/Projects_DetailPopover.action")
let coe_dashboard_actions_projects_projects_updateentity_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Projects/Projects_UpdateEntity.action */ "./build.definitions/CoE_Dashboard/Actions/Projects/Projects_UpdateEntity.action")
let coe_dashboard_actions_service_initializeonline_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Service/InitializeOnline.action */ "./build.definitions/CoE_Dashboard/Actions/Service/InitializeOnline.action")
let coe_dashboard_actions_service_initializeonlinefailuremessage_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Service/InitializeOnlineFailureMessage.action */ "./build.definitions/CoE_Dashboard/Actions/Service/InitializeOnlineFailureMessage.action")
let coe_dashboard_actions_service_initializeonlinesuccessmessage_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Service/InitializeOnlineSuccessMessage.action */ "./build.definitions/CoE_Dashboard/Actions/Service/InitializeOnlineSuccessMessage.action")
let coe_dashboard_actions_skills_navtoskills_create_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Skills/NavToSkills_Create.action */ "./build.definitions/CoE_Dashboard/Actions/Skills/NavToSkills_Create.action")
let coe_dashboard_actions_skills_navtoskills_detail_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Skills/NavToSkills_Detail.action */ "./build.definitions/CoE_Dashboard/Actions/Skills/NavToSkills_Detail.action")
let coe_dashboard_actions_skills_navtoskills_edit_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Skills/NavToSkills_Edit.action */ "./build.definitions/CoE_Dashboard/Actions/Skills/NavToSkills_Edit.action")
let coe_dashboard_actions_skills_navtoskills_list_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Skills/NavToSkills_List.action */ "./build.definitions/CoE_Dashboard/Actions/Skills/NavToSkills_List.action")
let coe_dashboard_actions_skills_skills_createentity_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Skills/Skills_CreateEntity.action */ "./build.definitions/CoE_Dashboard/Actions/Skills/Skills_CreateEntity.action")
let coe_dashboard_actions_skills_skills_deleteentity_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Skills/Skills_DeleteEntity.action */ "./build.definitions/CoE_Dashboard/Actions/Skills/Skills_DeleteEntity.action")
let coe_dashboard_actions_skills_skills_updateentity_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Skills/Skills_UpdateEntity.action */ "./build.definitions/CoE_Dashboard/Actions/Skills/Skills_UpdateEntity.action")
let coe_dashboard_actions_updateentityfailuremessage_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/UpdateEntityFailureMessage.action */ "./build.definitions/CoE_Dashboard/Actions/UpdateEntityFailureMessage.action")
let coe_dashboard_actions_updateentitysuccessmessage_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/UpdateEntitySuccessMessage.action */ "./build.definitions/CoE_Dashboard/Actions/UpdateEntitySuccessMessage.action")
let coe_dashboard_actions_utilizations_navtoutilizations_create_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Utilizations/NavToUtilizations_Create.action */ "./build.definitions/CoE_Dashboard/Actions/Utilizations/NavToUtilizations_Create.action")
let coe_dashboard_actions_utilizations_navtoutilizations_detail_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Utilizations/NavToUtilizations_Detail.action */ "./build.definitions/CoE_Dashboard/Actions/Utilizations/NavToUtilizations_Detail.action")
let coe_dashboard_actions_utilizations_navtoutilizations_edit_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Utilizations/NavToUtilizations_Edit.action */ "./build.definitions/CoE_Dashboard/Actions/Utilizations/NavToUtilizations_Edit.action")
let coe_dashboard_actions_utilizations_navtoutilizations_list_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Utilizations/NavToUtilizations_List.action */ "./build.definitions/CoE_Dashboard/Actions/Utilizations/NavToUtilizations_List.action")
let coe_dashboard_actions_utilizations_utilizations_createentity_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Utilizations/Utilizations_CreateEntity.action */ "./build.definitions/CoE_Dashboard/Actions/Utilizations/Utilizations_CreateEntity.action")
let coe_dashboard_actions_utilizations_utilizations_deleteentity_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Utilizations/Utilizations_DeleteEntity.action */ "./build.definitions/CoE_Dashboard/Actions/Utilizations/Utilizations_DeleteEntity.action")
let coe_dashboard_actions_utilizations_utilizations_updateentity_action = __webpack_require__(/*! ./CoE_Dashboard/Actions/Utilizations/Utilizations_UpdateEntity.action */ "./build.definitions/CoE_Dashboard/Actions/Utilizations/Utilizations_UpdateEntity.action")
let coe_dashboard_globals_appdefinition_version_global = __webpack_require__(/*! ./CoE_Dashboard/Globals/AppDefinition_Version.global */ "./build.definitions/CoE_Dashboard/Globals/AppDefinition_Version.global")
let coe_dashboard_i18n_i18n_properties = __webpack_require__(/*! ./CoE_Dashboard/i18n/i18n.properties */ "./build.definitions/CoE_Dashboard/i18n/i18n.properties")
let coe_dashboard_jsconfig_json = __webpack_require__(/*! ./CoE_Dashboard/jsconfig.json */ "./build.definitions/CoE_Dashboard/jsconfig.json")
let coe_dashboard_pages_certifications_certifications_create_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Certifications/Certifications_Create.page */ "./build.definitions/CoE_Dashboard/Pages/Certifications/Certifications_Create.page")
let coe_dashboard_pages_certifications_certifications_detail_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Certifications/Certifications_Detail.page */ "./build.definitions/CoE_Dashboard/Pages/Certifications/Certifications_Detail.page")
let coe_dashboard_pages_certifications_certifications_edit_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Certifications/Certifications_Edit.page */ "./build.definitions/CoE_Dashboard/Pages/Certifications/Certifications_Edit.page")
let coe_dashboard_pages_certifications_certifications_list_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Certifications/Certifications_List.page */ "./build.definitions/CoE_Dashboard/Pages/Certifications/Certifications_List.page")
let coe_dashboard_pages_employees_employees_create_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Employees/Employees_Create.page */ "./build.definitions/CoE_Dashboard/Pages/Employees/Employees_Create.page")
let coe_dashboard_pages_employees_employees_createcertifications_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Employees/Employees_CreateCertifications.page */ "./build.definitions/CoE_Dashboard/Pages/Employees/Employees_CreateCertifications.page")
let coe_dashboard_pages_employees_employees_createskills_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Employees/Employees_CreateSkills.page */ "./build.definitions/CoE_Dashboard/Pages/Employees/Employees_CreateSkills.page")
let coe_dashboard_pages_employees_employees_createutilizations_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Employees/Employees_CreateUtilizations.page */ "./build.definitions/CoE_Dashboard/Pages/Employees/Employees_CreateUtilizations.page")
let coe_dashboard_pages_employees_employees_detail_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Employees/Employees_Detail.page */ "./build.definitions/CoE_Dashboard/Pages/Employees/Employees_Detail.page")
let coe_dashboard_pages_employees_employees_edit_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Employees/Employees_Edit.page */ "./build.definitions/CoE_Dashboard/Pages/Employees/Employees_Edit.page")
let coe_dashboard_pages_employees_employees_list_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Employees/Employees_List.page */ "./build.definitions/CoE_Dashboard/Pages/Employees/Employees_List.page")
let coe_dashboard_pages_main_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Main.page */ "./build.definitions/CoE_Dashboard/Pages/Main.page")
let coe_dashboard_pages_modules_modules_create_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Modules/Modules_Create.page */ "./build.definitions/CoE_Dashboard/Pages/Modules/Modules_Create.page")
let coe_dashboard_pages_modules_modules_createemployees_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Modules/Modules_CreateEmployees.page */ "./build.definitions/CoE_Dashboard/Pages/Modules/Modules_CreateEmployees.page")
let coe_dashboard_pages_modules_modules_createprojects_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Modules/Modules_CreateProjects.page */ "./build.definitions/CoE_Dashboard/Pages/Modules/Modules_CreateProjects.page")
let coe_dashboard_pages_modules_modules_createskills_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Modules/Modules_CreateSkills.page */ "./build.definitions/CoE_Dashboard/Pages/Modules/Modules_CreateSkills.page")
let coe_dashboard_pages_modules_modules_detail_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Modules/Modules_Detail.page */ "./build.definitions/CoE_Dashboard/Pages/Modules/Modules_Detail.page")
let coe_dashboard_pages_modules_modules_edit_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Modules/Modules_Edit.page */ "./build.definitions/CoE_Dashboard/Pages/Modules/Modules_Edit.page")
let coe_dashboard_pages_modules_modules_list_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Modules/Modules_List.page */ "./build.definitions/CoE_Dashboard/Pages/Modules/Modules_List.page")
let coe_dashboard_pages_projects_projects_create_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Projects/Projects_Create.page */ "./build.definitions/CoE_Dashboard/Pages/Projects/Projects_Create.page")
let coe_dashboard_pages_projects_projects_createemployees_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Projects/Projects_CreateEmployees.page */ "./build.definitions/CoE_Dashboard/Pages/Projects/Projects_CreateEmployees.page")
let coe_dashboard_pages_projects_projects_createutilizations_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Projects/Projects_CreateUtilizations.page */ "./build.definitions/CoE_Dashboard/Pages/Projects/Projects_CreateUtilizations.page")
let coe_dashboard_pages_projects_projects_detail_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Projects/Projects_Detail.page */ "./build.definitions/CoE_Dashboard/Pages/Projects/Projects_Detail.page")
let coe_dashboard_pages_projects_projects_edit_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Projects/Projects_Edit.page */ "./build.definitions/CoE_Dashboard/Pages/Projects/Projects_Edit.page")
let coe_dashboard_pages_projects_projects_list_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Projects/Projects_List.page */ "./build.definitions/CoE_Dashboard/Pages/Projects/Projects_List.page")
let coe_dashboard_pages_skills_skills_create_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Skills/Skills_Create.page */ "./build.definitions/CoE_Dashboard/Pages/Skills/Skills_Create.page")
let coe_dashboard_pages_skills_skills_detail_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Skills/Skills_Detail.page */ "./build.definitions/CoE_Dashboard/Pages/Skills/Skills_Detail.page")
let coe_dashboard_pages_skills_skills_edit_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Skills/Skills_Edit.page */ "./build.definitions/CoE_Dashboard/Pages/Skills/Skills_Edit.page")
let coe_dashboard_pages_skills_skills_list_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Skills/Skills_List.page */ "./build.definitions/CoE_Dashboard/Pages/Skills/Skills_List.page")
let coe_dashboard_pages_utilizations_utilizations_create_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Utilizations/Utilizations_Create.page */ "./build.definitions/CoE_Dashboard/Pages/Utilizations/Utilizations_Create.page")
let coe_dashboard_pages_utilizations_utilizations_detail_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Utilizations/Utilizations_Detail.page */ "./build.definitions/CoE_Dashboard/Pages/Utilizations/Utilizations_Detail.page")
let coe_dashboard_pages_utilizations_utilizations_edit_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Utilizations/Utilizations_Edit.page */ "./build.definitions/CoE_Dashboard/Pages/Utilizations/Utilizations_Edit.page")
let coe_dashboard_pages_utilizations_utilizations_list_page = __webpack_require__(/*! ./CoE_Dashboard/Pages/Utilizations/Utilizations_List.page */ "./build.definitions/CoE_Dashboard/Pages/Utilizations/Utilizations_List.page")
let coe_dashboard_rules_appupdatefailure_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/AppUpdateFailure.js */ "./build.definitions/CoE_Dashboard/Rules/AppUpdateFailure.js")
let coe_dashboard_rules_appupdatesuccess_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/AppUpdateSuccess.js */ "./build.definitions/CoE_Dashboard/Rules/AppUpdateSuccess.js")
let coe_dashboard_rules_certifications_certifications_cancel_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Certifications/Certifications_Cancel.js */ "./build.definitions/CoE_Dashboard/Rules/Certifications/Certifications_Cancel.js")
let coe_dashboard_rules_certifications_certifications_createentity_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Certifications/Certifications_CreateEntity.js */ "./build.definitions/CoE_Dashboard/Rules/Certifications/Certifications_CreateEntity.js")
let coe_dashboard_rules_certifications_certifications_deleteconfirmation_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Certifications/Certifications_DeleteConfirmation.js */ "./build.definitions/CoE_Dashboard/Rules/Certifications/Certifications_DeleteConfirmation.js")
let coe_dashboard_rules_certifications_certifications_updateentity_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Certifications/Certifications_UpdateEntity.js */ "./build.definitions/CoE_Dashboard/Rules/Certifications/Certifications_UpdateEntity.js")
let coe_dashboard_rules_certifications_navtocertifications_edit_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Certifications/NavToCertifications_Edit.js */ "./build.definitions/CoE_Dashboard/Rules/Certifications/NavToCertifications_Edit.js")
let coe_dashboard_rules_employees_employees_cancel_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Employees/Employees_Cancel.js */ "./build.definitions/CoE_Dashboard/Rules/Employees/Employees_Cancel.js")
let coe_dashboard_rules_employees_employees_createcertifications_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Employees/Employees_CreateCertifications.js */ "./build.definitions/CoE_Dashboard/Rules/Employees/Employees_CreateCertifications.js")
let coe_dashboard_rules_employees_employees_createentity_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Employees/Employees_CreateEntity.js */ "./build.definitions/CoE_Dashboard/Rules/Employees/Employees_CreateEntity.js")
let coe_dashboard_rules_employees_employees_createskills_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Employees/Employees_CreateSkills.js */ "./build.definitions/CoE_Dashboard/Rules/Employees/Employees_CreateSkills.js")
let coe_dashboard_rules_employees_employees_createutilizations_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Employees/Employees_CreateUtilizations.js */ "./build.definitions/CoE_Dashboard/Rules/Employees/Employees_CreateUtilizations.js")
let coe_dashboard_rules_employees_employees_deleteconfirmation_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Employees/Employees_DeleteConfirmation.js */ "./build.definitions/CoE_Dashboard/Rules/Employees/Employees_DeleteConfirmation.js")
let coe_dashboard_rules_employees_employees_updateentity_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Employees/Employees_UpdateEntity.js */ "./build.definitions/CoE_Dashboard/Rules/Employees/Employees_UpdateEntity.js")
let coe_dashboard_rules_employees_navtoemployees_createcertifications_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Employees/NavToEmployees_CreateCertifications.js */ "./build.definitions/CoE_Dashboard/Rules/Employees/NavToEmployees_CreateCertifications.js")
let coe_dashboard_rules_employees_navtoemployees_createskills_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Employees/NavToEmployees_CreateSkills.js */ "./build.definitions/CoE_Dashboard/Rules/Employees/NavToEmployees_CreateSkills.js")
let coe_dashboard_rules_employees_navtoemployees_createutilizations_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Employees/NavToEmployees_CreateUtilizations.js */ "./build.definitions/CoE_Dashboard/Rules/Employees/NavToEmployees_CreateUtilizations.js")
let coe_dashboard_rules_employees_navtoemployees_edit_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Employees/NavToEmployees_Edit.js */ "./build.definitions/CoE_Dashboard/Rules/Employees/NavToEmployees_Edit.js")
let coe_dashboard_rules_modules_modules_cancel_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Modules/Modules_Cancel.js */ "./build.definitions/CoE_Dashboard/Rules/Modules/Modules_Cancel.js")
let coe_dashboard_rules_modules_modules_createemployees_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Modules/Modules_CreateEmployees.js */ "./build.definitions/CoE_Dashboard/Rules/Modules/Modules_CreateEmployees.js")
let coe_dashboard_rules_modules_modules_createentity_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Modules/Modules_CreateEntity.js */ "./build.definitions/CoE_Dashboard/Rules/Modules/Modules_CreateEntity.js")
let coe_dashboard_rules_modules_modules_createprojects_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Modules/Modules_CreateProjects.js */ "./build.definitions/CoE_Dashboard/Rules/Modules/Modules_CreateProjects.js")
let coe_dashboard_rules_modules_modules_createskills_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Modules/Modules_CreateSkills.js */ "./build.definitions/CoE_Dashboard/Rules/Modules/Modules_CreateSkills.js")
let coe_dashboard_rules_modules_modules_deleteconfirmation_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Modules/Modules_DeleteConfirmation.js */ "./build.definitions/CoE_Dashboard/Rules/Modules/Modules_DeleteConfirmation.js")
let coe_dashboard_rules_modules_modules_updateentity_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Modules/Modules_UpdateEntity.js */ "./build.definitions/CoE_Dashboard/Rules/Modules/Modules_UpdateEntity.js")
let coe_dashboard_rules_modules_navtomodules_createemployees_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Modules/NavToModules_CreateEmployees.js */ "./build.definitions/CoE_Dashboard/Rules/Modules/NavToModules_CreateEmployees.js")
let coe_dashboard_rules_modules_navtomodules_createprojects_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Modules/NavToModules_CreateProjects.js */ "./build.definitions/CoE_Dashboard/Rules/Modules/NavToModules_CreateProjects.js")
let coe_dashboard_rules_modules_navtomodules_createskills_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Modules/NavToModules_CreateSkills.js */ "./build.definitions/CoE_Dashboard/Rules/Modules/NavToModules_CreateSkills.js")
let coe_dashboard_rules_modules_navtomodules_edit_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Modules/NavToModules_Edit.js */ "./build.definitions/CoE_Dashboard/Rules/Modules/NavToModules_Edit.js")
let coe_dashboard_rules_onwillupdate_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/OnWillUpdate.js */ "./build.definitions/CoE_Dashboard/Rules/OnWillUpdate.js")
let coe_dashboard_rules_projects_navtoprojects_createemployees_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Projects/NavToProjects_CreateEmployees.js */ "./build.definitions/CoE_Dashboard/Rules/Projects/NavToProjects_CreateEmployees.js")
let coe_dashboard_rules_projects_navtoprojects_createutilizations_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Projects/NavToProjects_CreateUtilizations.js */ "./build.definitions/CoE_Dashboard/Rules/Projects/NavToProjects_CreateUtilizations.js")
let coe_dashboard_rules_projects_navtoprojects_edit_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Projects/NavToProjects_Edit.js */ "./build.definitions/CoE_Dashboard/Rules/Projects/NavToProjects_Edit.js")
let coe_dashboard_rules_projects_projects_cancel_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Projects/Projects_Cancel.js */ "./build.definitions/CoE_Dashboard/Rules/Projects/Projects_Cancel.js")
let coe_dashboard_rules_projects_projects_createemployees_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Projects/Projects_CreateEmployees.js */ "./build.definitions/CoE_Dashboard/Rules/Projects/Projects_CreateEmployees.js")
let coe_dashboard_rules_projects_projects_createentity_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Projects/Projects_CreateEntity.js */ "./build.definitions/CoE_Dashboard/Rules/Projects/Projects_CreateEntity.js")
let coe_dashboard_rules_projects_projects_createutilizations_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Projects/Projects_CreateUtilizations.js */ "./build.definitions/CoE_Dashboard/Rules/Projects/Projects_CreateUtilizations.js")
let coe_dashboard_rules_projects_projects_deleteconfirmation_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Projects/Projects_DeleteConfirmation.js */ "./build.definitions/CoE_Dashboard/Rules/Projects/Projects_DeleteConfirmation.js")
let coe_dashboard_rules_projects_projects_updateentity_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Projects/Projects_UpdateEntity.js */ "./build.definitions/CoE_Dashboard/Rules/Projects/Projects_UpdateEntity.js")
let coe_dashboard_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/CoE_Dashboard/Rules/ResetAppSettingsAndLogout.js")
let coe_dashboard_rules_skills_navtoskills_edit_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Skills/NavToSkills_Edit.js */ "./build.definitions/CoE_Dashboard/Rules/Skills/NavToSkills_Edit.js")
let coe_dashboard_rules_skills_skills_cancel_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Skills/Skills_Cancel.js */ "./build.definitions/CoE_Dashboard/Rules/Skills/Skills_Cancel.js")
let coe_dashboard_rules_skills_skills_createentity_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Skills/Skills_CreateEntity.js */ "./build.definitions/CoE_Dashboard/Rules/Skills/Skills_CreateEntity.js")
let coe_dashboard_rules_skills_skills_deleteconfirmation_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Skills/Skills_DeleteConfirmation.js */ "./build.definitions/CoE_Dashboard/Rules/Skills/Skills_DeleteConfirmation.js")
let coe_dashboard_rules_skills_skills_updateentity_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Skills/Skills_UpdateEntity.js */ "./build.definitions/CoE_Dashboard/Rules/Skills/Skills_UpdateEntity.js")
let coe_dashboard_rules_utilizations_navtoutilizations_edit_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Utilizations/NavToUtilizations_Edit.js */ "./build.definitions/CoE_Dashboard/Rules/Utilizations/NavToUtilizations_Edit.js")
let coe_dashboard_rules_utilizations_utilizations_cancel_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Utilizations/Utilizations_Cancel.js */ "./build.definitions/CoE_Dashboard/Rules/Utilizations/Utilizations_Cancel.js")
let coe_dashboard_rules_utilizations_utilizations_createentity_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Utilizations/Utilizations_CreateEntity.js */ "./build.definitions/CoE_Dashboard/Rules/Utilizations/Utilizations_CreateEntity.js")
let coe_dashboard_rules_utilizations_utilizations_deleteconfirmation_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Utilizations/Utilizations_DeleteConfirmation.js */ "./build.definitions/CoE_Dashboard/Rules/Utilizations/Utilizations_DeleteConfirmation.js")
let coe_dashboard_rules_utilizations_utilizations_updateentity_js = __webpack_require__(/*! ./CoE_Dashboard/Rules/Utilizations/Utilizations_UpdateEntity.js */ "./build.definitions/CoE_Dashboard/Rules/Utilizations/Utilizations_UpdateEntity.js")
let coe_dashboard_services_service1_service = __webpack_require__(/*! ./CoE_Dashboard/Services/service1.service */ "./build.definitions/CoE_Dashboard/Services/service1.service")
let coe_dashboard_styles_styles_css = __webpack_require__(/*! ./CoE_Dashboard/Styles/Styles.css */ "./build.definitions/CoE_Dashboard/Styles/Styles.css")
let coe_dashboard_styles_styles_json = __webpack_require__(/*! ./CoE_Dashboard/Styles/Styles.json */ "./build.definitions/CoE_Dashboard/Styles/Styles.json")
let coe_dashboard_styles_styles_less = __webpack_require__(/*! ./CoE_Dashboard/Styles/Styles.less */ "./build.definitions/CoE_Dashboard/Styles/Styles.less")
let coe_dashboard_styles_styles_nss = __webpack_require__(/*! ./CoE_Dashboard/Styles/Styles.nss */ "./build.definitions/CoE_Dashboard/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	coe_dashboard_actions_appupdate_action : coe_dashboard_actions_appupdate_action,
	coe_dashboard_actions_appupdatefailuremessage_action : coe_dashboard_actions_appupdatefailuremessage_action,
	coe_dashboard_actions_appupdateprogressbanner_action : coe_dashboard_actions_appupdateprogressbanner_action,
	coe_dashboard_actions_appupdatesuccessmessage_action : coe_dashboard_actions_appupdatesuccessmessage_action,
	coe_dashboard_actions_certifications_certifications_createentity_action : coe_dashboard_actions_certifications_certifications_createentity_action,
	coe_dashboard_actions_certifications_certifications_deleteentity_action : coe_dashboard_actions_certifications_certifications_deleteentity_action,
	coe_dashboard_actions_certifications_certifications_updateentity_action : coe_dashboard_actions_certifications_certifications_updateentity_action,
	coe_dashboard_actions_certifications_navtocertifications_create_action : coe_dashboard_actions_certifications_navtocertifications_create_action,
	coe_dashboard_actions_certifications_navtocertifications_detail_action : coe_dashboard_actions_certifications_navtocertifications_detail_action,
	coe_dashboard_actions_certifications_navtocertifications_edit_action : coe_dashboard_actions_certifications_navtocertifications_edit_action,
	coe_dashboard_actions_certifications_navtocertifications_list_action : coe_dashboard_actions_certifications_navtocertifications_list_action,
	coe_dashboard_actions_closemodalpage_cancel_action : coe_dashboard_actions_closemodalpage_cancel_action,
	coe_dashboard_actions_closemodalpage_complete_action : coe_dashboard_actions_closemodalpage_complete_action,
	coe_dashboard_actions_closepage_action : coe_dashboard_actions_closepage_action,
	coe_dashboard_actions_createentityfailuremessage_action : coe_dashboard_actions_createentityfailuremessage_action,
	coe_dashboard_actions_createentitysuccessmessage_action : coe_dashboard_actions_createentitysuccessmessage_action,
	coe_dashboard_actions_deleteconfirmation_action : coe_dashboard_actions_deleteconfirmation_action,
	coe_dashboard_actions_deleteentityfailuremessage_action : coe_dashboard_actions_deleteentityfailuremessage_action,
	coe_dashboard_actions_deleteentitysuccessmessage_action : coe_dashboard_actions_deleteentitysuccessmessage_action,
	coe_dashboard_actions_draftdiscardentity_action : coe_dashboard_actions_draftdiscardentity_action,
	coe_dashboard_actions_drafteditentity_action : coe_dashboard_actions_drafteditentity_action,
	coe_dashboard_actions_draftsaveentity_action : coe_dashboard_actions_draftsaveentity_action,
	coe_dashboard_actions_employees_employees_createcertifications_action : coe_dashboard_actions_employees_employees_createcertifications_action,
	coe_dashboard_actions_employees_employees_createentity_action : coe_dashboard_actions_employees_employees_createentity_action,
	coe_dashboard_actions_employees_employees_createskills_action : coe_dashboard_actions_employees_employees_createskills_action,
	coe_dashboard_actions_employees_employees_createutilizations_action : coe_dashboard_actions_employees_employees_createutilizations_action,
	coe_dashboard_actions_employees_employees_deleteentity_action : coe_dashboard_actions_employees_employees_deleteentity_action,
	coe_dashboard_actions_employees_employees_detailpopover_action : coe_dashboard_actions_employees_employees_detailpopover_action,
	coe_dashboard_actions_employees_employees_updateentity_action : coe_dashboard_actions_employees_employees_updateentity_action,
	coe_dashboard_actions_employees_navtoemployees_create_action : coe_dashboard_actions_employees_navtoemployees_create_action,
	coe_dashboard_actions_employees_navtoemployees_createcertifications_action : coe_dashboard_actions_employees_navtoemployees_createcertifications_action,
	coe_dashboard_actions_employees_navtoemployees_createskills_action : coe_dashboard_actions_employees_navtoemployees_createskills_action,
	coe_dashboard_actions_employees_navtoemployees_createutilizations_action : coe_dashboard_actions_employees_navtoemployees_createutilizations_action,
	coe_dashboard_actions_employees_navtoemployees_detail_action : coe_dashboard_actions_employees_navtoemployees_detail_action,
	coe_dashboard_actions_employees_navtoemployees_edit_action : coe_dashboard_actions_employees_navtoemployees_edit_action,
	coe_dashboard_actions_employees_navtoemployees_list_action : coe_dashboard_actions_employees_navtoemployees_list_action,
	coe_dashboard_actions_logout_action : coe_dashboard_actions_logout_action,
	coe_dashboard_actions_logoutmessage_action : coe_dashboard_actions_logoutmessage_action,
	coe_dashboard_actions_modules_modules_createemployees_action : coe_dashboard_actions_modules_modules_createemployees_action,
	coe_dashboard_actions_modules_modules_createentity_action : coe_dashboard_actions_modules_modules_createentity_action,
	coe_dashboard_actions_modules_modules_createprojects_action : coe_dashboard_actions_modules_modules_createprojects_action,
	coe_dashboard_actions_modules_modules_createskills_action : coe_dashboard_actions_modules_modules_createskills_action,
	coe_dashboard_actions_modules_modules_deleteentity_action : coe_dashboard_actions_modules_modules_deleteentity_action,
	coe_dashboard_actions_modules_modules_detailpopover_action : coe_dashboard_actions_modules_modules_detailpopover_action,
	coe_dashboard_actions_modules_modules_updateentity_action : coe_dashboard_actions_modules_modules_updateentity_action,
	coe_dashboard_actions_modules_navtomodules_create_action : coe_dashboard_actions_modules_navtomodules_create_action,
	coe_dashboard_actions_modules_navtomodules_createemployees_action : coe_dashboard_actions_modules_navtomodules_createemployees_action,
	coe_dashboard_actions_modules_navtomodules_createprojects_action : coe_dashboard_actions_modules_navtomodules_createprojects_action,
	coe_dashboard_actions_modules_navtomodules_createskills_action : coe_dashboard_actions_modules_navtomodules_createskills_action,
	coe_dashboard_actions_modules_navtomodules_detail_action : coe_dashboard_actions_modules_navtomodules_detail_action,
	coe_dashboard_actions_modules_navtomodules_edit_action : coe_dashboard_actions_modules_navtomodules_edit_action,
	coe_dashboard_actions_modules_navtomodules_list_action : coe_dashboard_actions_modules_navtomodules_list_action,
	coe_dashboard_actions_onwillupdate_action : coe_dashboard_actions_onwillupdate_action,
	coe_dashboard_actions_projects_navtoprojects_create_action : coe_dashboard_actions_projects_navtoprojects_create_action,
	coe_dashboard_actions_projects_navtoprojects_createemployees_action : coe_dashboard_actions_projects_navtoprojects_createemployees_action,
	coe_dashboard_actions_projects_navtoprojects_createutilizations_action : coe_dashboard_actions_projects_navtoprojects_createutilizations_action,
	coe_dashboard_actions_projects_navtoprojects_detail_action : coe_dashboard_actions_projects_navtoprojects_detail_action,
	coe_dashboard_actions_projects_navtoprojects_edit_action : coe_dashboard_actions_projects_navtoprojects_edit_action,
	coe_dashboard_actions_projects_navtoprojects_list_action : coe_dashboard_actions_projects_navtoprojects_list_action,
	coe_dashboard_actions_projects_projects_createemployees_action : coe_dashboard_actions_projects_projects_createemployees_action,
	coe_dashboard_actions_projects_projects_createentity_action : coe_dashboard_actions_projects_projects_createentity_action,
	coe_dashboard_actions_projects_projects_createutilizations_action : coe_dashboard_actions_projects_projects_createutilizations_action,
	coe_dashboard_actions_projects_projects_deleteentity_action : coe_dashboard_actions_projects_projects_deleteentity_action,
	coe_dashboard_actions_projects_projects_detailpopover_action : coe_dashboard_actions_projects_projects_detailpopover_action,
	coe_dashboard_actions_projects_projects_updateentity_action : coe_dashboard_actions_projects_projects_updateentity_action,
	coe_dashboard_actions_service_initializeonline_action : coe_dashboard_actions_service_initializeonline_action,
	coe_dashboard_actions_service_initializeonlinefailuremessage_action : coe_dashboard_actions_service_initializeonlinefailuremessage_action,
	coe_dashboard_actions_service_initializeonlinesuccessmessage_action : coe_dashboard_actions_service_initializeonlinesuccessmessage_action,
	coe_dashboard_actions_skills_navtoskills_create_action : coe_dashboard_actions_skills_navtoskills_create_action,
	coe_dashboard_actions_skills_navtoskills_detail_action : coe_dashboard_actions_skills_navtoskills_detail_action,
	coe_dashboard_actions_skills_navtoskills_edit_action : coe_dashboard_actions_skills_navtoskills_edit_action,
	coe_dashboard_actions_skills_navtoskills_list_action : coe_dashboard_actions_skills_navtoskills_list_action,
	coe_dashboard_actions_skills_skills_createentity_action : coe_dashboard_actions_skills_skills_createentity_action,
	coe_dashboard_actions_skills_skills_deleteentity_action : coe_dashboard_actions_skills_skills_deleteentity_action,
	coe_dashboard_actions_skills_skills_updateentity_action : coe_dashboard_actions_skills_skills_updateentity_action,
	coe_dashboard_actions_updateentityfailuremessage_action : coe_dashboard_actions_updateentityfailuremessage_action,
	coe_dashboard_actions_updateentitysuccessmessage_action : coe_dashboard_actions_updateentitysuccessmessage_action,
	coe_dashboard_actions_utilizations_navtoutilizations_create_action : coe_dashboard_actions_utilizations_navtoutilizations_create_action,
	coe_dashboard_actions_utilizations_navtoutilizations_detail_action : coe_dashboard_actions_utilizations_navtoutilizations_detail_action,
	coe_dashboard_actions_utilizations_navtoutilizations_edit_action : coe_dashboard_actions_utilizations_navtoutilizations_edit_action,
	coe_dashboard_actions_utilizations_navtoutilizations_list_action : coe_dashboard_actions_utilizations_navtoutilizations_list_action,
	coe_dashboard_actions_utilizations_utilizations_createentity_action : coe_dashboard_actions_utilizations_utilizations_createentity_action,
	coe_dashboard_actions_utilizations_utilizations_deleteentity_action : coe_dashboard_actions_utilizations_utilizations_deleteentity_action,
	coe_dashboard_actions_utilizations_utilizations_updateentity_action : coe_dashboard_actions_utilizations_utilizations_updateentity_action,
	coe_dashboard_globals_appdefinition_version_global : coe_dashboard_globals_appdefinition_version_global,
	coe_dashboard_i18n_i18n_properties : coe_dashboard_i18n_i18n_properties,
	coe_dashboard_jsconfig_json : coe_dashboard_jsconfig_json,
	coe_dashboard_pages_certifications_certifications_create_page : coe_dashboard_pages_certifications_certifications_create_page,
	coe_dashboard_pages_certifications_certifications_detail_page : coe_dashboard_pages_certifications_certifications_detail_page,
	coe_dashboard_pages_certifications_certifications_edit_page : coe_dashboard_pages_certifications_certifications_edit_page,
	coe_dashboard_pages_certifications_certifications_list_page : coe_dashboard_pages_certifications_certifications_list_page,
	coe_dashboard_pages_employees_employees_create_page : coe_dashboard_pages_employees_employees_create_page,
	coe_dashboard_pages_employees_employees_createcertifications_page : coe_dashboard_pages_employees_employees_createcertifications_page,
	coe_dashboard_pages_employees_employees_createskills_page : coe_dashboard_pages_employees_employees_createskills_page,
	coe_dashboard_pages_employees_employees_createutilizations_page : coe_dashboard_pages_employees_employees_createutilizations_page,
	coe_dashboard_pages_employees_employees_detail_page : coe_dashboard_pages_employees_employees_detail_page,
	coe_dashboard_pages_employees_employees_edit_page : coe_dashboard_pages_employees_employees_edit_page,
	coe_dashboard_pages_employees_employees_list_page : coe_dashboard_pages_employees_employees_list_page,
	coe_dashboard_pages_main_page : coe_dashboard_pages_main_page,
	coe_dashboard_pages_modules_modules_create_page : coe_dashboard_pages_modules_modules_create_page,
	coe_dashboard_pages_modules_modules_createemployees_page : coe_dashboard_pages_modules_modules_createemployees_page,
	coe_dashboard_pages_modules_modules_createprojects_page : coe_dashboard_pages_modules_modules_createprojects_page,
	coe_dashboard_pages_modules_modules_createskills_page : coe_dashboard_pages_modules_modules_createskills_page,
	coe_dashboard_pages_modules_modules_detail_page : coe_dashboard_pages_modules_modules_detail_page,
	coe_dashboard_pages_modules_modules_edit_page : coe_dashboard_pages_modules_modules_edit_page,
	coe_dashboard_pages_modules_modules_list_page : coe_dashboard_pages_modules_modules_list_page,
	coe_dashboard_pages_projects_projects_create_page : coe_dashboard_pages_projects_projects_create_page,
	coe_dashboard_pages_projects_projects_createemployees_page : coe_dashboard_pages_projects_projects_createemployees_page,
	coe_dashboard_pages_projects_projects_createutilizations_page : coe_dashboard_pages_projects_projects_createutilizations_page,
	coe_dashboard_pages_projects_projects_detail_page : coe_dashboard_pages_projects_projects_detail_page,
	coe_dashboard_pages_projects_projects_edit_page : coe_dashboard_pages_projects_projects_edit_page,
	coe_dashboard_pages_projects_projects_list_page : coe_dashboard_pages_projects_projects_list_page,
	coe_dashboard_pages_skills_skills_create_page : coe_dashboard_pages_skills_skills_create_page,
	coe_dashboard_pages_skills_skills_detail_page : coe_dashboard_pages_skills_skills_detail_page,
	coe_dashboard_pages_skills_skills_edit_page : coe_dashboard_pages_skills_skills_edit_page,
	coe_dashboard_pages_skills_skills_list_page : coe_dashboard_pages_skills_skills_list_page,
	coe_dashboard_pages_utilizations_utilizations_create_page : coe_dashboard_pages_utilizations_utilizations_create_page,
	coe_dashboard_pages_utilizations_utilizations_detail_page : coe_dashboard_pages_utilizations_utilizations_detail_page,
	coe_dashboard_pages_utilizations_utilizations_edit_page : coe_dashboard_pages_utilizations_utilizations_edit_page,
	coe_dashboard_pages_utilizations_utilizations_list_page : coe_dashboard_pages_utilizations_utilizations_list_page,
	coe_dashboard_rules_appupdatefailure_js : coe_dashboard_rules_appupdatefailure_js,
	coe_dashboard_rules_appupdatesuccess_js : coe_dashboard_rules_appupdatesuccess_js,
	coe_dashboard_rules_certifications_certifications_cancel_js : coe_dashboard_rules_certifications_certifications_cancel_js,
	coe_dashboard_rules_certifications_certifications_createentity_js : coe_dashboard_rules_certifications_certifications_createentity_js,
	coe_dashboard_rules_certifications_certifications_deleteconfirmation_js : coe_dashboard_rules_certifications_certifications_deleteconfirmation_js,
	coe_dashboard_rules_certifications_certifications_updateentity_js : coe_dashboard_rules_certifications_certifications_updateentity_js,
	coe_dashboard_rules_certifications_navtocertifications_edit_js : coe_dashboard_rules_certifications_navtocertifications_edit_js,
	coe_dashboard_rules_employees_employees_cancel_js : coe_dashboard_rules_employees_employees_cancel_js,
	coe_dashboard_rules_employees_employees_createcertifications_js : coe_dashboard_rules_employees_employees_createcertifications_js,
	coe_dashboard_rules_employees_employees_createentity_js : coe_dashboard_rules_employees_employees_createentity_js,
	coe_dashboard_rules_employees_employees_createskills_js : coe_dashboard_rules_employees_employees_createskills_js,
	coe_dashboard_rules_employees_employees_createutilizations_js : coe_dashboard_rules_employees_employees_createutilizations_js,
	coe_dashboard_rules_employees_employees_deleteconfirmation_js : coe_dashboard_rules_employees_employees_deleteconfirmation_js,
	coe_dashboard_rules_employees_employees_updateentity_js : coe_dashboard_rules_employees_employees_updateentity_js,
	coe_dashboard_rules_employees_navtoemployees_createcertifications_js : coe_dashboard_rules_employees_navtoemployees_createcertifications_js,
	coe_dashboard_rules_employees_navtoemployees_createskills_js : coe_dashboard_rules_employees_navtoemployees_createskills_js,
	coe_dashboard_rules_employees_navtoemployees_createutilizations_js : coe_dashboard_rules_employees_navtoemployees_createutilizations_js,
	coe_dashboard_rules_employees_navtoemployees_edit_js : coe_dashboard_rules_employees_navtoemployees_edit_js,
	coe_dashboard_rules_modules_modules_cancel_js : coe_dashboard_rules_modules_modules_cancel_js,
	coe_dashboard_rules_modules_modules_createemployees_js : coe_dashboard_rules_modules_modules_createemployees_js,
	coe_dashboard_rules_modules_modules_createentity_js : coe_dashboard_rules_modules_modules_createentity_js,
	coe_dashboard_rules_modules_modules_createprojects_js : coe_dashboard_rules_modules_modules_createprojects_js,
	coe_dashboard_rules_modules_modules_createskills_js : coe_dashboard_rules_modules_modules_createskills_js,
	coe_dashboard_rules_modules_modules_deleteconfirmation_js : coe_dashboard_rules_modules_modules_deleteconfirmation_js,
	coe_dashboard_rules_modules_modules_updateentity_js : coe_dashboard_rules_modules_modules_updateentity_js,
	coe_dashboard_rules_modules_navtomodules_createemployees_js : coe_dashboard_rules_modules_navtomodules_createemployees_js,
	coe_dashboard_rules_modules_navtomodules_createprojects_js : coe_dashboard_rules_modules_navtomodules_createprojects_js,
	coe_dashboard_rules_modules_navtomodules_createskills_js : coe_dashboard_rules_modules_navtomodules_createskills_js,
	coe_dashboard_rules_modules_navtomodules_edit_js : coe_dashboard_rules_modules_navtomodules_edit_js,
	coe_dashboard_rules_onwillupdate_js : coe_dashboard_rules_onwillupdate_js,
	coe_dashboard_rules_projects_navtoprojects_createemployees_js : coe_dashboard_rules_projects_navtoprojects_createemployees_js,
	coe_dashboard_rules_projects_navtoprojects_createutilizations_js : coe_dashboard_rules_projects_navtoprojects_createutilizations_js,
	coe_dashboard_rules_projects_navtoprojects_edit_js : coe_dashboard_rules_projects_navtoprojects_edit_js,
	coe_dashboard_rules_projects_projects_cancel_js : coe_dashboard_rules_projects_projects_cancel_js,
	coe_dashboard_rules_projects_projects_createemployees_js : coe_dashboard_rules_projects_projects_createemployees_js,
	coe_dashboard_rules_projects_projects_createentity_js : coe_dashboard_rules_projects_projects_createentity_js,
	coe_dashboard_rules_projects_projects_createutilizations_js : coe_dashboard_rules_projects_projects_createutilizations_js,
	coe_dashboard_rules_projects_projects_deleteconfirmation_js : coe_dashboard_rules_projects_projects_deleteconfirmation_js,
	coe_dashboard_rules_projects_projects_updateentity_js : coe_dashboard_rules_projects_projects_updateentity_js,
	coe_dashboard_rules_resetappsettingsandlogout_js : coe_dashboard_rules_resetappsettingsandlogout_js,
	coe_dashboard_rules_skills_navtoskills_edit_js : coe_dashboard_rules_skills_navtoskills_edit_js,
	coe_dashboard_rules_skills_skills_cancel_js : coe_dashboard_rules_skills_skills_cancel_js,
	coe_dashboard_rules_skills_skills_createentity_js : coe_dashboard_rules_skills_skills_createentity_js,
	coe_dashboard_rules_skills_skills_deleteconfirmation_js : coe_dashboard_rules_skills_skills_deleteconfirmation_js,
	coe_dashboard_rules_skills_skills_updateentity_js : coe_dashboard_rules_skills_skills_updateentity_js,
	coe_dashboard_rules_utilizations_navtoutilizations_edit_js : coe_dashboard_rules_utilizations_navtoutilizations_edit_js,
	coe_dashboard_rules_utilizations_utilizations_cancel_js : coe_dashboard_rules_utilizations_utilizations_cancel_js,
	coe_dashboard_rules_utilizations_utilizations_createentity_js : coe_dashboard_rules_utilizations_utilizations_createentity_js,
	coe_dashboard_rules_utilizations_utilizations_deleteconfirmation_js : coe_dashboard_rules_utilizations_utilizations_deleteconfirmation_js,
	coe_dashboard_rules_utilizations_utilizations_updateentity_js : coe_dashboard_rules_utilizations_utilizations_updateentity_js,
	coe_dashboard_services_service1_service : coe_dashboard_services_service1_service,
	coe_dashboard_styles_styles_css : coe_dashboard_styles_styles_css,
	coe_dashboard_styles_styles_json : coe_dashboard_styles_styles_json,
	coe_dashboard_styles_styles_less : coe_dashboard_styles_styles_less,
	coe_dashboard_styles_styles_nss : coe_dashboard_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Styles/Styles.css":
/*!***********************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Styles/Styles.css ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
div.MDKPage

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/
`, "",{"version":3,"sources":["webpack://./build.definitions/CoE_Dashboard/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Styles/Styles.less":
/*!************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Styles/Styles.less ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/`, "",{"version":3,"sources":["webpack://./build.definitions/CoE_Dashboard/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Styles/Styles.nss":
/*!***********************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Styles/Styles.nss ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/sourceMaps.js":
/*!*********************************************************!*\
  !*** ../../../../css-loader/dist/runtime/sourceMaps.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Certifications/Certifications_Create.page":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Certifications/Certifications_Create.page ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/CoE_Dashboard/Rules/Certifications/Certifications_CreateEntity.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Certifications Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","_Name":"ID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CCode","_Name":"CCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Description","_Name":"Description","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"module_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"module_ID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"employee_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Employees","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"employee_ID","_Type":"Control.Type.FormCell.ListPicker"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Certifications_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Certifications/Certifications_Detail.page":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Certifications/Certifications_Detail.page ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Certifications Detail","DesignTimeTarget":{"Service":"/CoE_Dashboard/Services/service1.service","EntitySet":"Certifications","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Rules/Certifications/NavToCertifications_Edit.js","Position":"Right","SystemItem":"Edit"},{"OnPress":"/CoE_Dashboard/Rules/Certifications/Certifications_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ID}","Subhead":"{CCode}","BodyText":"","Footnote":"{module_ID}","Description":"{Description}","StatusText":"{employee_ID}","StatusImage":"","SubstatusImage":"","SubstatusText":""},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"ID","Value":"{ID}"},{"KeyName":"CCode","Value":"{CCode}"},{"KeyName":"Description","Value":"{Description}"},{"KeyName":"module_ID","Value":"{module_ID}"},{"KeyName":"employee_ID","Value":"{employee_ID}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Certifications_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Certifications/Certifications_Edit.page":
/*!***************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Certifications/Certifications_Edit.page ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Certifications Detail","DesignTimeTarget":{"Service":"/CoE_Dashboard/Services/service1.service","EntitySet":"Certifications","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/CoE_Dashboard/Rules/Certifications/Certifications_Cancel.js"},{"Position":"Right","SystemItem":"Save","OnPress":"/CoE_Dashboard/Rules/Certifications/Certifications_UpdateEntity.js"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","_Name":"ID","Value":"{ID}","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"CCode","_Name":"CCode","Value":"{CCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Description","_Name":"Description","Value":"{Description}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"module_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service"}},"Value":"{module_ID}","_Name":"module_ID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"employee_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Employees","Service":"/CoE_Dashboard/Services/service1.service"}},"Value":"{employee_ID}","_Name":"employee_ID","_Type":"Control.Type.FormCell.ListPicker"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Certifications_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Certifications/Certifications_List.page":
/*!***************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Certifications/Certifications_List.page ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Certifications","ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Actions/Certifications/NavToCertifications_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{Description}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/CoE_Dashboard/Actions/Certifications/NavToCertifications_Detail.action","StatusImage":"","Title":"{ID}","Footnote":"{module_ID}","PreserveIconStackSpacing":false,"StatusText":"{employee_ID}","Subhead":"{CCode}","SubstatusText":""},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Certifications","Service":"/CoE_Dashboard/Services/service1.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Certifications_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Employees/Employees_Create.page":
/*!*******************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Employees/Employees_Create.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/CoE_Dashboard/Rules/Employees/Employees_CreateEntity.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Employees Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","KeyboardType":"Number","_Name":"ID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Status","_Name":"Status","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Designation","_Name":"Designation","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Email","_Name":"Email","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Department","_Name":"Department","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Contact","_Name":"Contact","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Address","_Name":"Address","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"City","_Name":"City","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Postal_Code","KeyboardType":"Number","_Name":"Postal_Code","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Country","_Name":"Country","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"project_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Projects","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"project_ID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"module_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"module_ID","_Type":"Control.Type.FormCell.ListPicker"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Employees_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Employees/Employees_CreateCertifications.page":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Employees/Employees_CreateCertifications.page ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/CoE_Dashboard/Rules/Employees/Employees_CreateCertifications.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Certifications","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","_Name":"ID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CCode","_Name":"CCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Description","_Name":"Description","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"module_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"module_ID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"employee_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Employees","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"employee_ID","_Type":"Control.Type.FormCell.ListPicker","Value":"{ID}"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Employees_CreateCertifications","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Employees/Employees_CreateSkills.page":
/*!*************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Employees/Employees_CreateSkills.page ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/CoE_Dashboard/Rules/Employees/Employees_CreateSkills.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Skills","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","_Name":"ID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SUBID","_Name":"SUBID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Description","_Name":"Description","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Level","_Name":"Level","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"module_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"module_ID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"employee_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Employees","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"employee_ID","_Type":"Control.Type.FormCell.ListPicker","Value":"{ID}"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Employees_CreateSkills","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Employees/Employees_CreateUtilizations.page":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Employees/Employees_CreateUtilizations.page ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/CoE_Dashboard/Rules/Employees/Employees_CreateUtilizations.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Utilizations","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","_Name":"ID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"UT_PER","KeyboardType":"Number","_Name":"UT_PER","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Remarks","_Name":"Remarks","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"module_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"module_ID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"project_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Projects","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"project_ID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"employee_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Employees","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"employee_ID","_Type":"Control.Type.FormCell.ListPicker","Value":"{ID}"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Employees_CreateUtilizations","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Employees/Employees_Detail.page":
/*!*******************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Employees/Employees_Detail.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Employees Detail","DesignTimeTarget":{"Service":"/CoE_Dashboard/Services/service1.service","EntitySet":"Employees","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Rules/Employees/NavToEmployees_Edit.js","Position":"Right","SystemItem":"Edit"},{"OnPress":"/CoE_Dashboard/Actions/Employees/Employees_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{Name}","Subhead":"{ID}","BodyText":"","Footnote":"{Designation}","Description":"{Status}","StatusText":"{Email}","StatusImage":"","SubstatusImage":"","SubstatusText":"{Department}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"ID","Value":"{ID}"},{"KeyName":"Name","Value":"{Name}"},{"KeyName":"Status","Value":"{Status}"},{"KeyName":"Designation","Value":"{Designation}"},{"KeyName":"Email","Value":"{Email}"},{"KeyName":"Department","Value":"{Department}"},{"KeyName":"Contact","Value":"{Contact}"},{"KeyName":"Address","Value":"{Address}"},{"KeyName":"City","Value":"{City}"},{"KeyName":"Postal_Code","Value":"{Postal_Code}"},{"KeyName":"Country","Value":"{Country}"},{"KeyName":"project_ID","Value":"{project_ID}"},{"KeyName":"module_ID","Value":"{module_ID}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"skills"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{SUBID}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{Name}","Footnote":"{Description}","PreserveIconStackSpacing":false,"StatusText":"{Level}","Subhead":"{ID}","SubstatusText":"{module_ID}","OnPress":"/CoE_Dashboard/Actions/Skills/NavToSkills_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/skills","Service":"/CoE_Dashboard/Services/service1.service"},"_Type":"Section.Type.ObjectTable"},{"Header":{"Caption":"utilizations"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{Remarks}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ID}","Footnote":"{module_ID}","PreserveIconStackSpacing":false,"StatusText":"{project_ID}","Subhead":"{UT_PER}","SubstatusText":"{employee_ID}","OnPress":"/CoE_Dashboard/Actions/Utilizations/NavToUtilizations_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/utilizations","Service":"/CoE_Dashboard/Services/service1.service"},"_Type":"Section.Type.ObjectTable"},{"Header":{"Caption":"certifications"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{Description}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ID}","Footnote":"{module_ID}","PreserveIconStackSpacing":false,"StatusText":"{employee_ID}","Subhead":"{CCode}","SubstatusText":"","OnPress":"/CoE_Dashboard/Actions/Certifications/NavToCertifications_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/certifications","Service":"/CoE_Dashboard/Services/service1.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["Skills","Utilizations","Certifications"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Employees_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Employees/Employees_Edit.page":
/*!*****************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Employees/Employees_Edit.page ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Employees Detail","DesignTimeTarget":{"Service":"/CoE_Dashboard/Services/service1.service","EntitySet":"Employees","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/CoE_Dashboard/Rules/Employees/Employees_Cancel.js"},{"Position":"Right","SystemItem":"Save","OnPress":"/CoE_Dashboard/Rules/Employees/Employees_UpdateEntity.js"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","_Name":"ID","Value":"{ID}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"Name","_Name":"Name","Value":"{Name}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Status","_Name":"Status","Value":"{Status}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Designation","_Name":"Designation","Value":"{Designation}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Email","_Name":"Email","Value":"{Email}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Department","_Name":"Department","Value":"{Department}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Contact","_Name":"Contact","Value":"{Contact}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Address","_Name":"Address","Value":"{Address}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"City","_Name":"City","Value":"{City}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Postal_Code","_Name":"Postal_Code","Value":"{Postal_Code}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Country","_Name":"Country","Value":"{Country}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"project_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Projects","Service":"/CoE_Dashboard/Services/service1.service"}},"Value":"{project_ID}","_Name":"project_ID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"module_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service"}},"Value":"{module_ID}","_Name":"module_ID","_Type":"Control.Type.FormCell.ListPicker"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Employees_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Employees/Employees_List.page":
/*!*****************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Employees/Employees_List.page ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Employees","ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Actions/Employees/NavToEmployees_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{Status}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/CoE_Dashboard/Actions/Employees/NavToEmployees_Detail.action","StatusImage":"","Title":"{Name}","Footnote":"{Designation}","PreserveIconStackSpacing":false,"StatusText":"{Email}","Subhead":"{ID}","SubstatusText":"{Department}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Employees","Service":"/CoE_Dashboard/Services/service1.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Employees_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Main.page":
/*!*********************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Main.page ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Main","Controls":[{"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable","Sections":[{"Buttons":[{"OnPress":"/CoE_Dashboard/Actions/Certifications/NavToCertifications_List.action","Alignment":"Center","Title":"Certifications","ButtonType":"Text","Semantic":"Tint"},{"OnPress":"/CoE_Dashboard/Actions/Employees/NavToEmployees_List.action","Alignment":"Center","Title":"Employees","ButtonType":"Text","Semantic":"Tint"},{"OnPress":"/CoE_Dashboard/Actions/Modules/NavToModules_List.action","Alignment":"Center","Title":"Modules","ButtonType":"Text","Semantic":"Tint"},{"OnPress":"/CoE_Dashboard/Actions/Projects/NavToProjects_List.action","Alignment":"Center","Title":"Projects","ButtonType":"Text","Semantic":"Tint"},{"OnPress":"/CoE_Dashboard/Actions/Skills/NavToSkills_List.action","Alignment":"Center","Title":"Skills","ButtonType":"Text","Semantic":"Tint"},{"OnPress":"/CoE_Dashboard/Actions/Utilizations/NavToUtilizations_List.action","Alignment":"Center","Title":"Utilizations","ButtonType":"Text","Semantic":"Tint"}],"_Name":"SectionButtonTable0","_Type":"Section.Type.ButtonTable"}]}],"_Name":"Main","_Type":"Page","ToolBar":{"Items":[{"_Name":"LogoutToolbarItem","_Type":"Control.Type.ToolbarItem","Caption":"Logout","OnPress":"/CoE_Dashboard/Actions/LogoutMessage.action"},{"_Name":"UpdateToolbarItem","_Type":"Control.Type.ToolbarItem","Caption":"Update","Enabled":true,"Clickable":true,"OnPress":"/CoE_Dashboard/Actions/AppUpdateProgressBanner.action","Visible":"$(PLT,true,true,false)"}]},"PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Modules/Modules_Create.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Modules/Modules_Create.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/CoE_Dashboard/Rules/Modules/Modules_CreateEntity.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Modules Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","_Name":"ID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Description","_Name":"Description","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Modules_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Modules/Modules_CreateEmployees.page":
/*!************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Modules/Modules_CreateEmployees.page ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/CoE_Dashboard/Rules/Modules/Modules_CreateEmployees.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Employees","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","KeyboardType":"Number","_Name":"ID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Status","_Name":"Status","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Designation","_Name":"Designation","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Email","_Name":"Email","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Department","_Name":"Department","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Contact","_Name":"Contact","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Address","_Name":"Address","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"City","_Name":"City","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Postal_Code","KeyboardType":"Number","_Name":"Postal_Code","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Country","_Name":"Country","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"project_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Projects","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"project_ID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"module_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"module_ID","_Type":"Control.Type.FormCell.ListPicker","Value":"{ID}"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Modules_CreateEmployees","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Modules/Modules_CreateProjects.page":
/*!***********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Modules/Modules_CreateProjects.page ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/CoE_Dashboard/Rules/Modules/Modules_CreateProjects.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Projects","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","_Name":"ID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Description","_Name":"Description","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"module_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"module_ID","_Type":"Control.Type.FormCell.ListPicker","Value":"{ID}"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Modules_CreateProjects","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Modules/Modules_CreateSkills.page":
/*!*********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Modules/Modules_CreateSkills.page ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/CoE_Dashboard/Rules/Modules/Modules_CreateSkills.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Skills","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","_Name":"ID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SUBID","_Name":"SUBID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Description","_Name":"Description","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Level","_Name":"Level","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"module_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"module_ID","_Type":"Control.Type.FormCell.ListPicker","Value":"{ID}"},{"Caption":"employee_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Employees","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"employee_ID","_Type":"Control.Type.FormCell.ListPicker"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Modules_CreateSkills","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Modules/Modules_Detail.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Modules/Modules_Detail.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Modules Detail","DesignTimeTarget":{"Service":"/CoE_Dashboard/Services/service1.service","EntitySet":"Modules","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Rules/Modules/NavToModules_Edit.js","Position":"Right","SystemItem":"Edit"},{"OnPress":"/CoE_Dashboard/Actions/Modules/Modules_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{Name}","Subhead":"{ID}","BodyText":"","Footnote":"","Description":"{Description}","StatusText":"","StatusImage":"","SubstatusImage":"","SubstatusText":""},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"ID","Value":"{ID}"},{"KeyName":"Name","Value":"{Name}"},{"KeyName":"Description","Value":"{Description}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"projects"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{Description}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{Name}","Footnote":"{module_ID}","PreserveIconStackSpacing":false,"StatusText":"","Subhead":"{ID}","SubstatusText":"","OnPress":"/CoE_Dashboard/Actions/Projects/NavToProjects_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/projects","Service":"/CoE_Dashboard/Services/service1.service"},"_Type":"Section.Type.ObjectTable"},{"Header":{"Caption":"employees"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{Status}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{Name}","Footnote":"{Designation}","PreserveIconStackSpacing":false,"StatusText":"{Email}","Subhead":"{ID}","SubstatusText":"{Department}","OnPress":"/CoE_Dashboard/Actions/Employees/NavToEmployees_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/employees","Service":"/CoE_Dashboard/Services/service1.service"},"_Type":"Section.Type.ObjectTable"},{"Header":{"Caption":"skills"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{SUBID}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{Name}","Footnote":"{Description}","PreserveIconStackSpacing":false,"StatusText":"{Level}","Subhead":"{ID}","SubstatusText":"{module_ID}","OnPress":"/CoE_Dashboard/Actions/Skills/NavToSkills_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/skills","Service":"/CoE_Dashboard/Services/service1.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["Projects","Employees","Skills"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Modules_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Modules/Modules_Edit.page":
/*!*************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Modules/Modules_Edit.page ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Modules Detail","DesignTimeTarget":{"Service":"/CoE_Dashboard/Services/service1.service","EntitySet":"Modules","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/CoE_Dashboard/Rules/Modules/Modules_Cancel.js"},{"Position":"Right","SystemItem":"Save","OnPress":"/CoE_Dashboard/Rules/Modules/Modules_UpdateEntity.js"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","_Name":"ID","Value":"{ID}","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"Name","_Name":"Name","Value":"{Name}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Description","_Name":"Description","Value":"{Description}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Modules_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Modules/Modules_List.page":
/*!*************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Modules/Modules_List.page ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Modules","ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Actions/Modules/NavToModules_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{Description}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/CoE_Dashboard/Actions/Modules/NavToModules_Detail.action","StatusImage":"","Title":"{Name}","Footnote":"","PreserveIconStackSpacing":false,"StatusText":"","Subhead":"{ID}","SubstatusText":""},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Modules_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Projects/Projects_Create.page":
/*!*****************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Projects/Projects_Create.page ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/CoE_Dashboard/Rules/Projects/Projects_CreateEntity.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Projects Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","_Name":"ID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Description","_Name":"Description","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"module_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"module_ID","_Type":"Control.Type.FormCell.ListPicker"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Projects_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Projects/Projects_CreateEmployees.page":
/*!**************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Projects/Projects_CreateEmployees.page ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/CoE_Dashboard/Rules/Projects/Projects_CreateEmployees.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Employees","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","KeyboardType":"Number","_Name":"ID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Status","_Name":"Status","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Designation","_Name":"Designation","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Email","_Name":"Email","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Department","_Name":"Department","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Contact","_Name":"Contact","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Address","_Name":"Address","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"City","_Name":"City","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Postal_Code","KeyboardType":"Number","_Name":"Postal_Code","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Country","_Name":"Country","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"project_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Projects","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"project_ID","_Type":"Control.Type.FormCell.ListPicker","Value":"{ID}"},{"Caption":"module_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"module_ID","_Type":"Control.Type.FormCell.ListPicker"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Projects_CreateEmployees","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Projects/Projects_CreateUtilizations.page":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Projects/Projects_CreateUtilizations.page ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/CoE_Dashboard/Rules/Projects/Projects_CreateUtilizations.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Utilizations","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","_Name":"ID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"UT_PER","KeyboardType":"Number","_Name":"UT_PER","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Remarks","_Name":"Remarks","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"module_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"module_ID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"project_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Projects","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"project_ID","_Type":"Control.Type.FormCell.ListPicker","Value":"{ID}"},{"Caption":"employee_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Employees","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"employee_ID","_Type":"Control.Type.FormCell.ListPicker"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Projects_CreateUtilizations","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Projects/Projects_Detail.page":
/*!*****************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Projects/Projects_Detail.page ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Projects Detail","DesignTimeTarget":{"Service":"/CoE_Dashboard/Services/service1.service","EntitySet":"Projects","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Rules/Projects/NavToProjects_Edit.js","Position":"Right","SystemItem":"Edit"},{"OnPress":"/CoE_Dashboard/Actions/Projects/Projects_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{Name}","Subhead":"{ID}","BodyText":"","Footnote":"{module_ID}","Description":"{Description}","StatusText":"","StatusImage":"","SubstatusImage":"","SubstatusText":""},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"ID","Value":"{ID}"},{"KeyName":"Name","Value":"{Name}"},{"KeyName":"Description","Value":"{Description}"},{"KeyName":"module_ID","Value":"{module_ID}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"utilizations"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{Remarks}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ID}","Footnote":"{module_ID}","PreserveIconStackSpacing":false,"StatusText":"{project_ID}","Subhead":"{UT_PER}","SubstatusText":"{employee_ID}","OnPress":"/CoE_Dashboard/Actions/Utilizations/NavToUtilizations_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/utilizations","Service":"/CoE_Dashboard/Services/service1.service"},"_Type":"Section.Type.ObjectTable"},{"Header":{"Caption":"employees"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{Status}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{Name}","Footnote":"{Designation}","PreserveIconStackSpacing":false,"StatusText":"{Email}","Subhead":"{ID}","SubstatusText":"{Department}","OnPress":"/CoE_Dashboard/Actions/Employees/NavToEmployees_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/employees","Service":"/CoE_Dashboard/Services/service1.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["Utilizations","Employees"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Projects_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Projects/Projects_Edit.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Projects/Projects_Edit.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Projects Detail","DesignTimeTarget":{"Service":"/CoE_Dashboard/Services/service1.service","EntitySet":"Projects","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/CoE_Dashboard/Rules/Projects/Projects_Cancel.js"},{"Position":"Right","SystemItem":"Save","OnPress":"/CoE_Dashboard/Rules/Projects/Projects_UpdateEntity.js"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","_Name":"ID","Value":"{ID}","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"Name","_Name":"Name","Value":"{Name}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Description","_Name":"Description","Value":"{Description}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"module_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service"}},"Value":"{module_ID}","_Name":"module_ID","_Type":"Control.Type.FormCell.ListPicker"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Projects_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Projects/Projects_List.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Projects/Projects_List.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Projects","ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Actions/Projects/NavToProjects_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{Description}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/CoE_Dashboard/Actions/Projects/NavToProjects_Detail.action","StatusImage":"","Title":"{Name}","Footnote":"{module_ID}","PreserveIconStackSpacing":false,"StatusText":"","Subhead":"{ID}","SubstatusText":""},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Projects","Service":"/CoE_Dashboard/Services/service1.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Projects_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Skills/Skills_Create.page":
/*!*************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Skills/Skills_Create.page ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/CoE_Dashboard/Rules/Skills/Skills_CreateEntity.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Skills Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","_Name":"ID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SUBID","_Name":"SUBID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Description","_Name":"Description","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Level","_Name":"Level","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"module_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"module_ID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"employee_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Employees","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"employee_ID","_Type":"Control.Type.FormCell.ListPicker"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Skills_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Skills/Skills_Detail.page":
/*!*************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Skills/Skills_Detail.page ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Skills Detail","DesignTimeTarget":{"Service":"/CoE_Dashboard/Services/service1.service","EntitySet":"Skills","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Rules/Skills/NavToSkills_Edit.js","Position":"Right","SystemItem":"Edit"},{"OnPress":"/CoE_Dashboard/Rules/Skills/Skills_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{Name}","Subhead":"{ID}","BodyText":"","Footnote":"{Description}","Description":"{SUBID}","StatusText":"{Level}","StatusImage":"","SubstatusImage":"","SubstatusText":"{module_ID}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"ID","Value":"{ID}"},{"KeyName":"SUBID","Value":"{SUBID}"},{"KeyName":"Name","Value":"{Name}"},{"KeyName":"Description","Value":"{Description}"},{"KeyName":"Level","Value":"{Level}"},{"KeyName":"module_ID","Value":"{module_ID}"},{"KeyName":"employee_ID","Value":"{employee_ID}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Skills_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Skills/Skills_Edit.page":
/*!***********************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Skills/Skills_Edit.page ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Skills Detail","DesignTimeTarget":{"Service":"/CoE_Dashboard/Services/service1.service","EntitySet":"Skills","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/CoE_Dashboard/Rules/Skills/Skills_Cancel.js"},{"Position":"Right","SystemItem":"Save","OnPress":"/CoE_Dashboard/Rules/Skills/Skills_UpdateEntity.js"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","_Name":"ID","Value":"{ID}","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"SUBID","_Name":"SUBID","Value":"{SUBID}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","Value":"{Name}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Description","_Name":"Description","Value":"{Description}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Level","_Name":"Level","Value":"{Level}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"module_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service"}},"Value":"{module_ID}","_Name":"module_ID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"employee_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Employees","Service":"/CoE_Dashboard/Services/service1.service"}},"Value":"{employee_ID}","_Name":"employee_ID","_Type":"Control.Type.FormCell.ListPicker"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Skills_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Skills/Skills_List.page":
/*!***********************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Skills/Skills_List.page ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Skills","ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Actions/Skills/NavToSkills_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{SUBID}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/CoE_Dashboard/Actions/Skills/NavToSkills_Detail.action","StatusImage":"","Title":"{Name}","Footnote":"{Description}","PreserveIconStackSpacing":false,"StatusText":"{Level}","Subhead":"{ID}","SubstatusText":"{module_ID}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Skills","Service":"/CoE_Dashboard/Services/service1.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Skills_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Utilizations/Utilizations_Create.page":
/*!*************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Utilizations/Utilizations_Create.page ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/CoE_Dashboard/Rules/Utilizations/Utilizations_CreateEntity.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Utilizations Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","_Name":"ID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"UT_PER","KeyboardType":"Number","_Name":"UT_PER","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Remarks","_Name":"Remarks","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"module_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"module_ID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"project_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Projects","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"project_ID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"employee_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Employees","Service":"/CoE_Dashboard/Services/service1.service"}},"_Name":"employee_ID","_Type":"Control.Type.FormCell.ListPicker"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Utilizations_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Utilizations/Utilizations_Detail.page":
/*!*************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Utilizations/Utilizations_Detail.page ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Utilizations Detail","DesignTimeTarget":{"Service":"/CoE_Dashboard/Services/service1.service","EntitySet":"Utilizations","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Rules/Utilizations/NavToUtilizations_Edit.js","Position":"Right","SystemItem":"Edit"},{"OnPress":"/CoE_Dashboard/Rules/Utilizations/Utilizations_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ID}","Subhead":"{UT_PER}","BodyText":"","Footnote":"{module_ID}","Description":"{Remarks}","StatusText":"{project_ID}","StatusImage":"","SubstatusImage":"","SubstatusText":"{employee_ID}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"ID","Value":"{ID}"},{"KeyName":"UT_PER","Value":"{UT_PER}"},{"KeyName":"Remarks","Value":"{Remarks}"},{"KeyName":"module_ID","Value":"{module_ID}"},{"KeyName":"project_ID","Value":"{project_ID}"},{"KeyName":"employee_ID","Value":"{employee_ID}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Utilizations_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Utilizations/Utilizations_Edit.page":
/*!***********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Utilizations/Utilizations_Edit.page ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Utilizations Detail","DesignTimeTarget":{"Service":"/CoE_Dashboard/Services/service1.service","EntitySet":"Utilizations","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/CoE_Dashboard/Rules/Utilizations/Utilizations_Cancel.js"},{"Position":"Right","SystemItem":"Save","OnPress":"/CoE_Dashboard/Rules/Utilizations/Utilizations_UpdateEntity.js"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ID","_Name":"ID","Value":"{ID}","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"UT_PER","_Name":"UT_PER","Value":"{UT_PER}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Remarks","_Name":"Remarks","Value":"{Remarks}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"module_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service"}},"Value":"{module_ID}","_Name":"module_ID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"project_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Projects","Service":"/CoE_Dashboard/Services/service1.service"}},"Value":"{project_ID}","_Name":"project_ID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"employee_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ID}","ReturnValue":"{ID}","Target":{"EntitySet":"Employees","Service":"/CoE_Dashboard/Services/service1.service"}},"Value":"{employee_ID}","_Name":"employee_ID","_Type":"Control.Type.FormCell.ListPicker"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Utilizations_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Pages/Utilizations/Utilizations_List.page":
/*!***********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Pages/Utilizations/Utilizations_List.page ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Utilizations","ActionBar":{"Items":[{"OnPress":"/CoE_Dashboard/Actions/Utilizations/NavToUtilizations_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{Remarks}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/CoE_Dashboard/Actions/Utilizations/NavToUtilizations_Detail.action","StatusImage":"","Title":"{ID}","Footnote":"{module_ID}","PreserveIconStackSpacing":false,"StatusText":"{project_ID}","Subhead":"{UT_PER}","SubstatusText":"{employee_ID}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Utilizations","Service":"/CoE_Dashboard/Services/service1.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Utilizations_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"CoE_Dashboard","Version":"/CoE_Dashboard/Globals/AppDefinition_Version.global","MainPage":"/CoE_Dashboard/Pages/Main.page","OnLaunch":["/CoE_Dashboard/Actions/Service/InitializeOnline.action"],"OnWillUpdate":"/CoE_Dashboard/Rules/OnWillUpdate.js","OnDidUpdate":"/CoE_Dashboard/Actions/Service/InitializeOnline.action","Styles":"/CoE_Dashboard/Styles/Styles.less","Localization":"/CoE_Dashboard/i18n/i18n.properties","_SchemaVersion":"23.8","StyleSheets":{"Styles":{"css":"/CoE_Dashboard/Styles/Styles.css","ios":"/CoE_Dashboard/Styles/Styles.nss","android":"/CoE_Dashboard/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/AppUpdate.action":
/*!******************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/AppUpdate.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/CoE_Dashboard/Rules/AppUpdateFailure.js","OnSuccess":"/CoE_Dashboard/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/AppUpdateFailureMessage.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/AppUpdateFailureMessage.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/AppUpdateProgressBanner.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/AppUpdateProgressBanner.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/CoE_Dashboard/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/AppUpdateSuccessMessage.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/AppUpdateSuccessMessage.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Certifications/Certifications_CreateEntity.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Certifications/Certifications_CreateEntity.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/CoE_Dashboard/Actions/CreateEntityFailureMessage.action","OnSuccess":"/CoE_Dashboard/Actions/CreateEntitySuccessMessage.action","Properties":{"ID":"#Control:ID/#Value","CCode":"#Control:CCode/#Value","Description":"#Control:Description/#Value","module_ID":"#Control:module_ID/#SelectedValue","employee_ID":"#Control:employee_ID/#SelectedValue"},"Target":{"EntitySet":"Certifications","Service":"/CoE_Dashboard/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Certifications/Certifications_DeleteEntity.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Certifications/Certifications_DeleteEntity.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Certifications","Service":"/CoE_Dashboard/Services/service1.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/CoE_Dashboard/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/CoE_Dashboard/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Certifications/Certifications_UpdateEntity.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Certifications/Certifications_UpdateEntity.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Certifications","Service":"/CoE_Dashboard/Services/service1.service","ReadLink":"{@odata.readLink}"},"Properties":{"ID":"#Control:ID/#Value","CCode":"#Control:CCode/#Value","Description":"#Control:Description/#Value","module_ID":"#Control:module_ID/#SelectedValue","employee_ID":"#Control:employee_ID/#SelectedValue"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/CoE_Dashboard/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/CoE_Dashboard/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Certifications/NavToCertifications_Create.action":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Certifications/NavToCertifications_Create.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CoE_Dashboard/Pages/Certifications/Certifications_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Certifications/NavToCertifications_Detail.action":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Certifications/NavToCertifications_Detail.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/CoE_Dashboard/Pages/Certifications/Certifications_Detail.page"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Certifications/NavToCertifications_Edit.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Certifications/NavToCertifications_Edit.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CoE_Dashboard/Pages/Certifications/Certifications_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Certifications/NavToCertifications_List.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Certifications/NavToCertifications_List.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/CoE_Dashboard/Pages/Certifications/Certifications_List.page"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/CloseModalPage_Cancel.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/CloseModalPage_Cancel.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/CloseModalPage_Complete.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/CloseModalPage_Complete.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/ClosePage.action":
/*!******************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/ClosePage.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/CreateEntityFailureMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/CreateEntityFailureMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Create entity failure - {#ActionResults:create/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/CreateEntitySuccessMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/CreateEntitySuccessMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity created","IsIconHidden":true,"OnSuccess":"/CoE_Dashboard/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/DeleteConfirmation.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/DeleteConfirmation.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Delete current entity?","Title":"Confirmation","OKCaption":"OK","CancelCaption":"Cancel","ActionResult":{"_Name":"DeleteConfirmation"}}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/DeleteEntityFailureMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/DeleteEntityFailureMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Delete entity failure - {#ActionResults:delete/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/DeleteEntitySuccessMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/DeleteEntitySuccessMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity deleted","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/CoE_Dashboard/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/DraftDiscardEntity.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/DraftDiscardEntity.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Discard","Target":{"Service":"/CoE_Dashboard/Services/service1.service","EntitySet":"Certifications","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/CoE_Dashboard/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Discarded"}},"OnFailure":"/CoE_Dashboard/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/DraftEditEntity.action":
/*!************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/DraftEditEntity.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Edit","Target":{"Service":"/CoE_Dashboard/Services/service1.service","EntitySet":"Certifications","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/CoE_Dashboard/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Edit"}},"OnFailure":"/CoE_Dashboard/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/DraftSaveEntity.action":
/*!************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/DraftSaveEntity.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Save","Target":{"Service":"/CoE_Dashboard/Services/service1.service","EntitySet":"Certifications","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/CoE_Dashboard/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Saved"}},"OnFailure":"/CoE_Dashboard/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Employees/Employees_CreateCertifications.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Employees/Employees_CreateCertifications.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"certifications","Target":{"EntitySet":"Employees","ReadLink":"{@odata.readLink}"}},"OnFailure":"/CoE_Dashboard/Actions/CreateEntityFailureMessage.action","OnSuccess":"/CoE_Dashboard/Actions/CreateEntitySuccessMessage.action","Properties":{"ID":"#Control:ID/#Value","CCode":"#Control:CCode/#Value","Description":"#Control:Description/#Value","module_ID":"#Control:module_ID/#SelectedValue","employee_ID":"#Control:employee_ID/#SelectedValue"},"Target":{"EntitySet":"Certifications","Service":"/CoE_Dashboard/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Employees/Employees_CreateEntity.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Employees/Employees_CreateEntity.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/CoE_Dashboard/Actions/CreateEntityFailureMessage.action","OnSuccess":"/CoE_Dashboard/Actions/CreateEntitySuccessMessage.action","Properties":{"ID":"#Control:ID/#Value","Name":"#Control:Name/#Value","Status":"#Control:Status/#Value","Designation":"#Control:Designation/#Value","Email":"#Control:Email/#Value","Department":"#Control:Department/#Value","Contact":"#Control:Contact/#Value","Address":"#Control:Address/#Value","City":"#Control:City/#Value","Postal_Code":"#Control:Postal_Code/#Value","Country":"#Control:Country/#Value","project_ID":"#Control:project_ID/#SelectedValue","module_ID":"#Control:module_ID/#SelectedValue"},"Target":{"EntitySet":"Employees","Service":"/CoE_Dashboard/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Employees/Employees_CreateSkills.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Employees/Employees_CreateSkills.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"skills","Target":{"EntitySet":"Employees","ReadLink":"{@odata.readLink}"}},"OnFailure":"/CoE_Dashboard/Actions/CreateEntityFailureMessage.action","OnSuccess":"/CoE_Dashboard/Actions/CreateEntitySuccessMessage.action","Properties":{"ID":"#Control:ID/#Value","SUBID":"#Control:SUBID/#Value","Name":"#Control:Name/#Value","Description":"#Control:Description/#Value","Level":"#Control:Level/#Value","module_ID":"#Control:module_ID/#SelectedValue","employee_ID":"#Control:employee_ID/#SelectedValue"},"Target":{"EntitySet":"Skills","Service":"/CoE_Dashboard/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Employees/Employees_CreateUtilizations.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Employees/Employees_CreateUtilizations.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"utilizations","Target":{"EntitySet":"Employees","ReadLink":"{@odata.readLink}"}},"OnFailure":"/CoE_Dashboard/Actions/CreateEntityFailureMessage.action","OnSuccess":"/CoE_Dashboard/Actions/CreateEntitySuccessMessage.action","Properties":{"ID":"#Control:ID/#Value","UT_PER":"#Control:UT_PER/#Value","Remarks":"#Control:Remarks/#Value","module_ID":"#Control:module_ID/#SelectedValue","project_ID":"#Control:project_ID/#SelectedValue","employee_ID":"#Control:employee_ID/#SelectedValue"},"Target":{"EntitySet":"Utilizations","Service":"/CoE_Dashboard/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Employees/Employees_DeleteEntity.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Employees/Employees_DeleteEntity.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Employees","Service":"/CoE_Dashboard/Services/service1.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/CoE_Dashboard/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/CoE_Dashboard/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Employees/Employees_DetailPopover.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Employees/Employees_DetailPopover.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Add Skills","OnPress":"/CoE_Dashboard/Rules/Employees/NavToEmployees_CreateSkills.js"},{"Title":"Add Utilizations","OnPress":"/CoE_Dashboard/Rules/Employees/NavToEmployees_CreateUtilizations.js"},{"Title":"Add Certifications","OnPress":"/CoE_Dashboard/Rules/Employees/NavToEmployees_CreateCertifications.js"},{"Title":"Delete","OnPress":"/CoE_Dashboard/Rules/Employees/Employees_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Employees/Employees_UpdateEntity.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Employees/Employees_UpdateEntity.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Employees","Service":"/CoE_Dashboard/Services/service1.service","ReadLink":"{@odata.readLink}"},"Properties":{"ID":"#Control:ID/#Value","Name":"#Control:Name/#Value","Status":"#Control:Status/#Value","Designation":"#Control:Designation/#Value","Email":"#Control:Email/#Value","Department":"#Control:Department/#Value","Contact":"#Control:Contact/#Value","Address":"#Control:Address/#Value","City":"#Control:City/#Value","Postal_Code":"#Control:Postal_Code/#Value","Country":"#Control:Country/#Value","project_ID":"#Control:project_ID/#SelectedValue","module_ID":"#Control:module_ID/#SelectedValue"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/CoE_Dashboard/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/CoE_Dashboard/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Employees/NavToEmployees_Create.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Employees/NavToEmployees_Create.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CoE_Dashboard/Pages/Employees/Employees_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Employees/NavToEmployees_CreateCertifications.action":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Employees/NavToEmployees_CreateCertifications.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CoE_Dashboard/Pages/Employees/Employees_CreateCertifications.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Employees/NavToEmployees_CreateSkills.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Employees/NavToEmployees_CreateSkills.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CoE_Dashboard/Pages/Employees/Employees_CreateSkills.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Employees/NavToEmployees_CreateUtilizations.action":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Employees/NavToEmployees_CreateUtilizations.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CoE_Dashboard/Pages/Employees/Employees_CreateUtilizations.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Employees/NavToEmployees_Detail.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Employees/NavToEmployees_Detail.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/CoE_Dashboard/Pages/Employees/Employees_Detail.page"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Employees/NavToEmployees_Edit.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Employees/NavToEmployees_Edit.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CoE_Dashboard/Pages/Employees/Employees_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Employees/NavToEmployees_List.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Employees/NavToEmployees_List.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/CoE_Dashboard/Pages/Employees/Employees_List.page"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Logout.action":
/*!***************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Logout.action ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/LogoutMessage.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/LogoutMessage.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/CoE_Dashboard/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Modules/Modules_CreateEmployees.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Modules/Modules_CreateEmployees.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"employees","Target":{"EntitySet":"Modules","ReadLink":"{@odata.readLink}"}},"OnFailure":"/CoE_Dashboard/Actions/CreateEntityFailureMessage.action","OnSuccess":"/CoE_Dashboard/Actions/CreateEntitySuccessMessage.action","Properties":{"ID":"#Control:ID/#Value","Name":"#Control:Name/#Value","Status":"#Control:Status/#Value","Designation":"#Control:Designation/#Value","Email":"#Control:Email/#Value","Department":"#Control:Department/#Value","Contact":"#Control:Contact/#Value","Address":"#Control:Address/#Value","City":"#Control:City/#Value","Postal_Code":"#Control:Postal_Code/#Value","Country":"#Control:Country/#Value","project_ID":"#Control:project_ID/#SelectedValue","module_ID":"#Control:module_ID/#SelectedValue"},"Target":{"EntitySet":"Employees","Service":"/CoE_Dashboard/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Modules/Modules_CreateEntity.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Modules/Modules_CreateEntity.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/CoE_Dashboard/Actions/CreateEntityFailureMessage.action","OnSuccess":"/CoE_Dashboard/Actions/CreateEntitySuccessMessage.action","Properties":{"ID":"#Control:ID/#Value","Name":"#Control:Name/#Value","Description":"#Control:Description/#Value"},"Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Modules/Modules_CreateProjects.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Modules/Modules_CreateProjects.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"projects","Target":{"EntitySet":"Modules","ReadLink":"{@odata.readLink}"}},"OnFailure":"/CoE_Dashboard/Actions/CreateEntityFailureMessage.action","OnSuccess":"/CoE_Dashboard/Actions/CreateEntitySuccessMessage.action","Properties":{"ID":"#Control:ID/#Value","Name":"#Control:Name/#Value","Description":"#Control:Description/#Value","module_ID":"#Control:module_ID/#SelectedValue"},"Target":{"EntitySet":"Projects","Service":"/CoE_Dashboard/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Modules/Modules_CreateSkills.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Modules/Modules_CreateSkills.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"skills","Target":{"EntitySet":"Modules","ReadLink":"{@odata.readLink}"}},"OnFailure":"/CoE_Dashboard/Actions/CreateEntityFailureMessage.action","OnSuccess":"/CoE_Dashboard/Actions/CreateEntitySuccessMessage.action","Properties":{"ID":"#Control:ID/#Value","SUBID":"#Control:SUBID/#Value","Name":"#Control:Name/#Value","Description":"#Control:Description/#Value","Level":"#Control:Level/#Value","module_ID":"#Control:module_ID/#SelectedValue","employee_ID":"#Control:employee_ID/#SelectedValue"},"Target":{"EntitySet":"Skills","Service":"/CoE_Dashboard/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Modules/Modules_DeleteEntity.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Modules/Modules_DeleteEntity.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/CoE_Dashboard/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/CoE_Dashboard/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Modules/Modules_DetailPopover.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Modules/Modules_DetailPopover.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Add Projects","OnPress":"/CoE_Dashboard/Rules/Modules/NavToModules_CreateProjects.js"},{"Title":"Add Employees","OnPress":"/CoE_Dashboard/Rules/Modules/NavToModules_CreateEmployees.js"},{"Title":"Add Skills","OnPress":"/CoE_Dashboard/Rules/Modules/NavToModules_CreateSkills.js"},{"Title":"Delete","OnPress":"/CoE_Dashboard/Rules/Modules/Modules_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Modules/Modules_UpdateEntity.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Modules/Modules_UpdateEntity.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Modules","Service":"/CoE_Dashboard/Services/service1.service","ReadLink":"{@odata.readLink}"},"Properties":{"ID":"#Control:ID/#Value","Name":"#Control:Name/#Value","Description":"#Control:Description/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/CoE_Dashboard/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/CoE_Dashboard/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Modules/NavToModules_Create.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Modules/NavToModules_Create.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CoE_Dashboard/Pages/Modules/Modules_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Modules/NavToModules_CreateEmployees.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Modules/NavToModules_CreateEmployees.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CoE_Dashboard/Pages/Modules/Modules_CreateEmployees.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Modules/NavToModules_CreateProjects.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Modules/NavToModules_CreateProjects.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CoE_Dashboard/Pages/Modules/Modules_CreateProjects.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Modules/NavToModules_CreateSkills.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Modules/NavToModules_CreateSkills.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CoE_Dashboard/Pages/Modules/Modules_CreateSkills.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Modules/NavToModules_Detail.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Modules/NavToModules_Detail.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/CoE_Dashboard/Pages/Modules/Modules_Detail.page"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Modules/NavToModules_Edit.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Modules/NavToModules_Edit.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CoE_Dashboard/Pages/Modules/Modules_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Modules/NavToModules_List.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Modules/NavToModules_List.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/CoE_Dashboard/Pages/Modules/Modules_List.page"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/OnWillUpdate.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/OnWillUpdate.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Projects/NavToProjects_Create.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Projects/NavToProjects_Create.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CoE_Dashboard/Pages/Projects/Projects_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Projects/NavToProjects_CreateEmployees.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Projects/NavToProjects_CreateEmployees.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CoE_Dashboard/Pages/Projects/Projects_CreateEmployees.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Projects/NavToProjects_CreateUtilizations.action":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Projects/NavToProjects_CreateUtilizations.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CoE_Dashboard/Pages/Projects/Projects_CreateUtilizations.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Projects/NavToProjects_Detail.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Projects/NavToProjects_Detail.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/CoE_Dashboard/Pages/Projects/Projects_Detail.page"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Projects/NavToProjects_Edit.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Projects/NavToProjects_Edit.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CoE_Dashboard/Pages/Projects/Projects_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Projects/NavToProjects_List.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Projects/NavToProjects_List.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/CoE_Dashboard/Pages/Projects/Projects_List.page"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Projects/Projects_CreateEmployees.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Projects/Projects_CreateEmployees.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"employees","Target":{"EntitySet":"Projects","ReadLink":"{@odata.readLink}"}},"OnFailure":"/CoE_Dashboard/Actions/CreateEntityFailureMessage.action","OnSuccess":"/CoE_Dashboard/Actions/CreateEntitySuccessMessage.action","Properties":{"ID":"#Control:ID/#Value","Name":"#Control:Name/#Value","Status":"#Control:Status/#Value","Designation":"#Control:Designation/#Value","Email":"#Control:Email/#Value","Department":"#Control:Department/#Value","Contact":"#Control:Contact/#Value","Address":"#Control:Address/#Value","City":"#Control:City/#Value","Postal_Code":"#Control:Postal_Code/#Value","Country":"#Control:Country/#Value","project_ID":"#Control:project_ID/#SelectedValue","module_ID":"#Control:module_ID/#SelectedValue"},"Target":{"EntitySet":"Employees","Service":"/CoE_Dashboard/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Projects/Projects_CreateEntity.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Projects/Projects_CreateEntity.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/CoE_Dashboard/Actions/CreateEntityFailureMessage.action","OnSuccess":"/CoE_Dashboard/Actions/CreateEntitySuccessMessage.action","Properties":{"ID":"#Control:ID/#Value","Name":"#Control:Name/#Value","Description":"#Control:Description/#Value","module_ID":"#Control:module_ID/#SelectedValue"},"Target":{"EntitySet":"Projects","Service":"/CoE_Dashboard/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Projects/Projects_CreateUtilizations.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Projects/Projects_CreateUtilizations.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"utilizations","Target":{"EntitySet":"Projects","ReadLink":"{@odata.readLink}"}},"OnFailure":"/CoE_Dashboard/Actions/CreateEntityFailureMessage.action","OnSuccess":"/CoE_Dashboard/Actions/CreateEntitySuccessMessage.action","Properties":{"ID":"#Control:ID/#Value","UT_PER":"#Control:UT_PER/#Value","Remarks":"#Control:Remarks/#Value","module_ID":"#Control:module_ID/#SelectedValue","project_ID":"#Control:project_ID/#SelectedValue","employee_ID":"#Control:employee_ID/#SelectedValue"},"Target":{"EntitySet":"Utilizations","Service":"/CoE_Dashboard/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Projects/Projects_DeleteEntity.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Projects/Projects_DeleteEntity.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Projects","Service":"/CoE_Dashboard/Services/service1.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/CoE_Dashboard/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/CoE_Dashboard/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Projects/Projects_DetailPopover.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Projects/Projects_DetailPopover.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Add Utilizations","OnPress":"/CoE_Dashboard/Rules/Projects/NavToProjects_CreateUtilizations.js"},{"Title":"Add Employees","OnPress":"/CoE_Dashboard/Rules/Projects/NavToProjects_CreateEmployees.js"},{"Title":"Delete","OnPress":"/CoE_Dashboard/Rules/Projects/Projects_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Projects/Projects_UpdateEntity.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Projects/Projects_UpdateEntity.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Projects","Service":"/CoE_Dashboard/Services/service1.service","ReadLink":"{@odata.readLink}"},"Properties":{"ID":"#Control:ID/#Value","Name":"#Control:Name/#Value","Description":"#Control:Description/#Value","module_ID":"#Control:module_ID/#SelectedValue"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/CoE_Dashboard/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/CoE_Dashboard/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Service/InitializeOnline.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Service/InitializeOnline.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/CoE_Dashboard/Services/service1.service","_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"OnSuccess":"/CoE_Dashboard/Actions/Service/InitializeOnlineSuccessMessage.action","OnFailure":"/CoE_Dashboard/Actions/Service/InitializeOnlineFailureMessage.action","ActionResult":{"_Name":"init"}}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Service/InitializeOnlineFailureMessage.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Service/InitializeOnlineFailureMessage.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Service/InitializeOnlineSuccessMessage.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Service/InitializeOnlineSuccessMessage.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"NumberOfLines":2,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Skills/NavToSkills_Create.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Skills/NavToSkills_Create.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CoE_Dashboard/Pages/Skills/Skills_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Skills/NavToSkills_Detail.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Skills/NavToSkills_Detail.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/CoE_Dashboard/Pages/Skills/Skills_Detail.page"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Skills/NavToSkills_Edit.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Skills/NavToSkills_Edit.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CoE_Dashboard/Pages/Skills/Skills_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Skills/NavToSkills_List.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Skills/NavToSkills_List.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/CoE_Dashboard/Pages/Skills/Skills_List.page"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Skills/Skills_CreateEntity.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Skills/Skills_CreateEntity.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/CoE_Dashboard/Actions/CreateEntityFailureMessage.action","OnSuccess":"/CoE_Dashboard/Actions/CreateEntitySuccessMessage.action","Properties":{"ID":"#Control:ID/#Value","SUBID":"#Control:SUBID/#Value","Name":"#Control:Name/#Value","Description":"#Control:Description/#Value","Level":"#Control:Level/#Value","module_ID":"#Control:module_ID/#SelectedValue","employee_ID":"#Control:employee_ID/#SelectedValue"},"Target":{"EntitySet":"Skills","Service":"/CoE_Dashboard/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Skills/Skills_DeleteEntity.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Skills/Skills_DeleteEntity.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Skills","Service":"/CoE_Dashboard/Services/service1.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/CoE_Dashboard/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/CoE_Dashboard/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Skills/Skills_UpdateEntity.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Skills/Skills_UpdateEntity.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Skills","Service":"/CoE_Dashboard/Services/service1.service","ReadLink":"{@odata.readLink}"},"Properties":{"ID":"#Control:ID/#Value","SUBID":"#Control:SUBID/#Value","Name":"#Control:Name/#Value","Description":"#Control:Description/#Value","Level":"#Control:Level/#Value","module_ID":"#Control:module_ID/#SelectedValue","employee_ID":"#Control:employee_ID/#SelectedValue"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/CoE_Dashboard/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/CoE_Dashboard/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/UpdateEntityFailureMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/UpdateEntityFailureMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Update entity failure - {#ActionResults:update/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/UpdateEntitySuccessMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/UpdateEntitySuccessMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity updated","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/CoE_Dashboard/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Utilizations/NavToUtilizations_Create.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Utilizations/NavToUtilizations_Create.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CoE_Dashboard/Pages/Utilizations/Utilizations_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Utilizations/NavToUtilizations_Detail.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Utilizations/NavToUtilizations_Detail.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/CoE_Dashboard/Pages/Utilizations/Utilizations_Detail.page"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Utilizations/NavToUtilizations_Edit.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Utilizations/NavToUtilizations_Edit.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CoE_Dashboard/Pages/Utilizations/Utilizations_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Utilizations/NavToUtilizations_List.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Utilizations/NavToUtilizations_List.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/CoE_Dashboard/Pages/Utilizations/Utilizations_List.page"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Utilizations/Utilizations_CreateEntity.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Utilizations/Utilizations_CreateEntity.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/CoE_Dashboard/Actions/CreateEntityFailureMessage.action","OnSuccess":"/CoE_Dashboard/Actions/CreateEntitySuccessMessage.action","Properties":{"ID":"#Control:ID/#Value","UT_PER":"#Control:UT_PER/#Value","Remarks":"#Control:Remarks/#Value","module_ID":"#Control:module_ID/#SelectedValue","project_ID":"#Control:project_ID/#SelectedValue","employee_ID":"#Control:employee_ID/#SelectedValue"},"Target":{"EntitySet":"Utilizations","Service":"/CoE_Dashboard/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Utilizations/Utilizations_DeleteEntity.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Utilizations/Utilizations_DeleteEntity.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Utilizations","Service":"/CoE_Dashboard/Services/service1.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/CoE_Dashboard/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/CoE_Dashboard/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Actions/Utilizations/Utilizations_UpdateEntity.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Actions/Utilizations/Utilizations_UpdateEntity.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Utilizations","Service":"/CoE_Dashboard/Services/service1.service","ReadLink":"{@odata.readLink}"},"Properties":{"ID":"#Control:ID/#Value","UT_PER":"#Control:UT_PER/#Value","Remarks":"#Control:Remarks/#Value","module_ID":"#Control:module_ID/#SelectedValue","project_ID":"#Control:project_ID/#SelectedValue","employee_ID":"#Control:employee_ID/#SelectedValue"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/CoE_Dashboard/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/CoE_Dashboard/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Globals/AppDefinition_Version.global":
/*!******************************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Globals/AppDefinition_Version.global ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Services/service1.service":
/*!*******************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Services/service1.service ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"../service/CoE_Dashboard/","OfflineEnabled":false,"LanguageURLParam":"","OnlineOptions":{},"PathSuffix":"","SourceType":"Cloud","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "1.1\n";

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/Styles/Styles.json":
/*!************************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/Styles/Styles.json ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/CoE_Dashboard/jsconfig.json":
/*!*******************************************************!*\
  !*** ./build.definitions/CoE_Dashboard/jsconfig.json ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map