export default function CreateEntity(clientAPI) {
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