import React from 'react';

const Goal = props => (
    <div className="row items">
        <div className="col-md-6 hover">{props.goal.title}</div>
        <div className="col-md-6 hover">{props.goal.status}</div>
    </div>
);

export default Goal;