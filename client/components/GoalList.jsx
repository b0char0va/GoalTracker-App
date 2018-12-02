import React from 'react';
import Goal from './Goal.jsx';

const GoalList = props => (
    <div className="list">
        <span>Hover on goal title or progress to edit</span>
        <div className="row headings">
            <div className="col-md-6">Title</div>
            <div className="col-md-6">Progress %</div>
        </div>
        {
            props.list.map((el)=>{
                return(
                    <Goal goal={el}/>
                )
            })
        }
    </div>
);

export default GoalList;