export default function NavToEdit(clientAPI) {
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