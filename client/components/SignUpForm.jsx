import React from 'react';

const SignUpForm = props => (
    <div className="jumbotron d-flex align-items-center landing signup">
        <form className="container form-signin signup-color">
            <h1 className="h3 mb-3 font-weight-normal">Sign up for free</h1>
            <label htmlFor="inputName" className="sr-only">First Name</label>
            <input type="text" id="inputFirstName" className="form-control" placeholder="First name" name="firstname" required autoFocus onChange = {props.onChange} />
            <label htmlFor="inputName" className="sr-only">Last Name</label>
            <input type="text" id="inputLastName" className="form-control" placeholder="Last name" name="lastname"  required  onChange = {props.onChange}/>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input type="email" id="inputEmail2" className="form-control" placeholder="Email address" name="email" required onChange = {props.onChange} />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword2" className="form-control" placeholder="Password" name="password" required onChange = {props.onChange} />
            <div className="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me"/> Remember me
                </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={props.onClick}>Sign up</button>
        </form>
    </div>
);

export default SignUpForm;

