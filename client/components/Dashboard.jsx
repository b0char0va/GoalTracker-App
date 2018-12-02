import React from 'react';

const Dashboard = props => (
    <div className="currentgoals">
        <h3>My Goals</h3>
        <span>{!props.status? 'No goals added': null}</span>
    </div>
);

export default Dashboard;