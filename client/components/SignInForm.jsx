import React from 'react';

const SignInForm = props => (
    <div className="jumbotron d-flex align-items-center landing">
        <form className="container form-signin">
            <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" name="email" required autoFocus onChange = {props.onChange} />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" name="password" required  onChange={props.onChange} />
            <div className="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me"/> Remember me
                </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={props.onClick}>Sign in</button>
        </form>
    </div>
);

export default SignInForm;

