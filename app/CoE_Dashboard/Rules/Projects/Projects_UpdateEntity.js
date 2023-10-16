export default function UpdateEntity(clientAPI) {
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