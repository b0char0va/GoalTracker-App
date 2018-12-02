import React from 'react';
import GoalList from './GoalList.jsx';

const LifeGoals = props => (
    <div className="currentgoals">
        <h6>Life Goals</h6>
        <div className="goalBox">
            <div className="input-group">
                <input type="text" id="inputGoals" className="form-control" placeholder="add a goal" name="life"  onChange = {props.onChange} />
                <div className="input-group-btn">
                    <button className="btn btn-primary" type="button" id="searchBtn" onClick={props.onClick}>
                        Add Goal
                    </button>
                </div>
            </div>
            <div>
                {
                    props.goalList.length > 0 ? <GoalList list={props.goalList}/> : null
                }
            </div>
        </div>
    </div>
);

export default LifeGoals;