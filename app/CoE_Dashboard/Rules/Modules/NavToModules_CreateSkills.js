export default function NavToCreate(clientAPI) {
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