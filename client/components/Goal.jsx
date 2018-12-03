import React from 'react';

const Goal = props => {
    console.log(props.edit.status);
   return (
        <div className="row items">
            <div className="col-md-6 hover">{
                (props.edit.status && props.edit.toEdit == props.goal.id) ?
                    <div className="input-group">
                        <input type="text" id={props.goal.id} className="form-control" value={props.edit.input} onChange={props.onChange} name="goal"/>
                        <div className="input-group-btn">
                            <button className="btn btn-primary" type="button" id="searchBtn" onClick={props.onClick}>
                                Save
                            </button>
                        </div>
                    </div>
                    : <span id={props.goal.id} onClick={props.onEdit}>{props.goal.title}</span>
            }
            </div>
            <div className="col-md-6 hover">{
                (props.edit.status && props.edit.toEdit == props.goal.id) ?
                    <div className="input-group">
                        <input type="text" id={props.goal.id} className="form-control" value={props.edit.input} onChange={props.onChange} name="goal"/>
                        <div className="input-group-btn">
                            <button className="btn btn-primary" type="button" id="searchBtn" onClick={props.onClick}>
                                Save
                            </button>
                        </div>
                    </div>
                    : <span id={props.goal.id} onClick={props.onEdit}>{props.goal.status}</span>
            }
            </div>
        </div>
    );
};

export default Goal;

//props.goal.status