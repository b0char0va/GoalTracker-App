import React from 'react';

const Category = props => (
    <div className="categories">
        <span>Add Category:</span>
        <button className="btn btn-lg btn-primary btn-position" name="life" type="submit" onClick={props.onClick}>Life Goals</button>
        <button className="btn btn-lg btn-primary btn-position" name="yearly" type="submit" onClick={props.onClick}>Yearly Goals</button>
        <button className="btn btn-lg btn-primary btn-position" name="quaterly" type="submit" onClick={props.onClick}>Quaterly Goals</button>
        <button className="btn btn-lg btn-primary btn-position" name="monthly" type="submit" onClick={props.onClick}>Monthly Goals</button>
        <button className="btn btn-lg btn-primary btn-position" name="weekly" type="submit" onClick={props.onClick}>Weekly Goals</button>
        <button className="btn btn-lg btn-primary btn-position" name="daily" type="submit" onClick={props.onClick}>Daily Goals</button>
    </div>
);

export default Category;
