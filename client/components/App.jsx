import React from 'react';
import SignInForm from './SignInForm.jsx';
import SignUpForm from './SignUpForm.jsx';
import Category from './Category.jsx';
import Dashboard from './Dashboard.jsx';
import LifeGoals from './LifeGoals.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            id: '',
            signupDetails: {
                firstname: "",
                lastname: "",
                email: "",
                password: ""
            },
            signinDetails: {
                email: "",
                password: ""
            },
            currentGoals: {
                life: false,
                yearly: false,
                quaterly: false,
                monthly: false,
                weekly: false,
                daily: false
            },
            anyGoals: false,
            goals: {
                title: '',
                status: 0,
                category: ''
            },
            allGoals: [],
        };
        this.handleOnChangeSignup = this.handleOnChangeSignup.bind(this);
        this.handleOnChangeSignin = this.handleOnChangeSignin.bind(this);
        this.handleSignin = this.handleSignin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.handleChangeGoal = this.handleChangeGoal.bind(this);
        this.addGoal = this.addGoal.bind(this);
    }

    handleOnChangeSignup(e) {
        const label = e.target.name;
        const currentSignupDetails = Object.assign({}, this.state.signupDetails);
        currentSignupDetails[label] = e.target.value;
        this.setState({
            signupDetails: currentSignupDetails
        })
    }

    handleOnChangeSignin(e) {
        const label = e.target.name;
        const currentSigninDetails = Object.assign({}, this.state.signinDetails);
        currentSigninDetails[label] = e.target.value;
        this.setState({
            signinDetails: currentSigninDetails
        });
    }

    handleSignin(e){
        e.preventDefault();
        const email = this.state.signinDetails.email;
        const password = this.state.signinDetails.password;
        fetch(`/user/${email}/${password}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res =>  res.json() )
            .then(data => {
                const currentGoals = Object.assign({}, this.state.currentGoals);
                if (!Array.isArray(data)) {
                    this.setState({isLoggedIn: true, id: data.id, anyGoals: false})
                } else {
                    data.map((el) => {
                        if (el.category === 'life') {
                            currentGoals.life = true;
                        } else if (el.category === 'yearly') {
                            currentGoals.life = true;
                        } else if (el.category === 'quaterly') {
                            currentGoals.life = true;
                        } else if (el.category === 'monthly') {
                            currentGoals.life = true;
                        } else if (el.category === 'weekly') {
                            currentGoals.life = true;
                        } else if (el.category === 'daily') {
                            currentGoals.life = true;
                        }
                    });
                    this.setState({
                        isLoggedIn: true,
                        id: data[0].userId,
                        allGoals: data,
                        currentGoals: currentGoals,
                        anyGoals: true
                    })
                }
            })
            .catch(err => console.log(err))
    }

    handleSignup(e){
        e.preventDefault();
        fetch("/user",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.signupDetails)
            })
            .then(res =>  res.json() )
            .then(data => console.log( JSON.stringify( data )))
            .catch(err => console.log(err))
    }

    addCategory(e) {
        e.preventDefault();
        const label = e.target.name;
        const currentGoals = Object.assign({}, this.state.currentGoals);
        if(currentGoals[label] === false){
            currentGoals[label] = true;
        }
        this.setState({
            currentGoals: currentGoals,
            anyGoals:true
        })
    }

    handleChangeGoal(e){
        const goals = Object.assign({}, this.state.goals);
        goals['category'] = e.target.name;
        goals['title'] = e.target.value;
        goals['status'] = 0;
        this.setState({
            goals: goals
        });
    }

    addGoal(e) {
        e.preventDefault;
        const id = this.state.id;
        const data = Object.assign({}, this.state.goals);
        data.userId = id;
        fetch(`/users/:${id}/goal`,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res =>  res.json() )
            .then(data => {
                const goals = this.state.allGoals;
                console.log(goals);
                goals.push(data[0]);
                this.setState({
                    allGoals: goals,
                }, () => {
                    console.log(this.state.allGoals)
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="parent">
                {
                    !this.state.isLoggedIn ?
                        <div className="row parent">
                            <div className="col-md-6 text-center signin-color"> <SignInForm onClick={this.handleSignin} onChange={this.handleOnChangeSignin} /> </div>
                             <div className="col-md-6 text-center signup-color"> <SignUpForm onClick={this.handleSignup} onChange={this.handleOnChangeSignup} /> </div>
                        </div>
                        :
                        <div className="dashboard">
                            <Category onClick={this.addCategory}/>
                            <Dashboard status={this.state.anyGoals} />
                            {
                                !this.state.currentGoals.life ? null :
                                    <LifeGoals goalList={this.state.allGoals} onChange={this.handleChangeGoal}
                                           onClick={this.addGoal}/>
                            }
                            {
                                !this.state.currentGoals.yearly ? null :
                                    <YearlyGoals goalList={this.state.allGoals} onChange={this.handleChangeGoal} onClick={this.addGoal}/>
                            }
                            {
                                !this.state.currentGoals.quaterly ? null :
                                    <QuaterlyGoals goalList={this.state.allGoals} onChange={this.handleChangeGoal}
                                           onClick={this.addGoal}/>
                            }
                            {
                                !this.state.currentGoals.monthly ? null :
                                    <MonthlyGoals goalList={this.state.allGoals} onChange={this.handleChangeGoal}
                                           onClick={this.addGoal}/>
                            }
                            {
                                !this.state.currentGoals.weekly ? null :
                                    <WeeklyGoals goalList={this.state.allGoals} onChange={this.handleChangeGoal}
                                           onClick={this.addGoal}/>
                            }
                            {
                                !this.state.currentGoals.daily ? null :
                                    <DailyGoals goalList={this.state.allGoals} onChange={this.handleChangeGoal}
                                           onClick={this.addGoal}/>
                            }
                        </div>
                }
            </div>
        );
    }
}

export default App;