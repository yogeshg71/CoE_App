export default function NavToCreate(clientAPI) {
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