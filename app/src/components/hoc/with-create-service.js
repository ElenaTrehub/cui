import React from 'react';
import CreatorServiceContext from "../creator-service-context";

const WithCreateService = () => (Wrapped) => {
    return (props) => {
        return (
            <CreatorServiceContext.Consumer>
                {
                    (CreatorService) => {
                        return <Wrapped {...props} CreatorService={CreatorService}/>
                    }
                }

            </CreatorServiceContext.Consumer>
        )
    };
};

export default WithCreateService;