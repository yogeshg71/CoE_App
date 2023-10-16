export default function NavToCreate(clientAPI) {
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