import React from 'react';
import Notification from '../../common/Notificationcard';



function Invitation() {
    return (
        <div>
            <h3>Invitations</h3>
            <p>Here is a list of events you have been invited to.</p>
            <p>You can either accept or reject any of the invitations.</p>
            <Notification />
        </div>
    )
}

export default Invitation
