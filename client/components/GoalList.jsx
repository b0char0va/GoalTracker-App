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
            props.list.map((el, i)=>{
                return(
                    <Goal goal={el} onEdit={props.onEdit} edit={props.edit} key={i} id={i} onChange={props.onChange} onClick={props.saveGoal}/>
                )
            })
        }
    </div>
);

export default GoalList;