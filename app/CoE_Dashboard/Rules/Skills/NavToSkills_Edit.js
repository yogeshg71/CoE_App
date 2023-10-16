export default function NavToEdit(clientAPI) {
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