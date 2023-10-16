export default function Cancel(clientAPI) {
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