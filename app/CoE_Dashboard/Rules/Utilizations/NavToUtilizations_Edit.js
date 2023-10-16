export default function NavToEdit(clientAPI) {
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