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
            },
            anyGoals: false,
            goals: {
                title: '',
                status: 0,
                category: ''
            },
            allGoals: [],
            edit: {
                status: false,
                toEdit: 0,
                input: '',
                progressStatus: 0
            },
        };
        this.handleOnChangeSignup = this.handleOnChangeSignup.bind(this);
        this.handleOnChangeSignin = this.handleOnChangeSignin.bind(this);
        this.handleSignin = this.handleSignin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.handleChangeGoal = this.handleChangeGoal.bind(this);
        this.addGoal = this.addGoal.bind(this);
        this.editGoal = this.editGoal.bind(this);
        this.handleGoalEdit = this.handleGoalEdit.bind(this);
        this.saveEditedGoal = this.saveEditedGoal.bind(this);
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
                        }
                    });
                    this.setState({
                        isLoggedIn: true,
                        id: data[0].userId,
                        allGoals: data,
                        currentGoals: currentGoals,
                        anyGoals: true,
                        signinDetails: {},
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
            .then(data => console.log(data))
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
                goals.push(data[0]);
                const goalState = Object.assign({}, this.state.goals);
                goalState.title = '';
                goalState.category= '';
                this.setState({
                    allGoals: goals,
                    goals : goalState
                })
            })
            .catch(err => console.log(err))
    }

    handleGoalEdit(e){
        let editState = Object.assign({}, this.state.edit);
        if(e.target.name === 'title') {
            editState.input = e.target.value;
        } else if(e.target.name === 'progress') {
            editState.progressStatus = e.target.value;
        }
        this.setState({
            edit: editState
        }, ()=> console.log(this.state.edit))
    }

    editGoal(e){
        let editState = Object.assign({}, this.state.edit);
        editState.toEdit = e.target.id;
        editState.status = true;
        let goals = [...this.state.allGoals];
        goals.map((el) => {
            if(el.id == e.target.id){
                editState.input = el.title;
                editState.progressStatus = el.status;
            }
        });
        this.setState({
            edit: editState
        }, ()=> console.log(this.state.edit))
    }

    saveEditedGoal(){
        fetch(`/users/:${this.state.edit.toEdit}/goal`,
            {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.edit)
            })
            .then(res =>  res.json())
            .then(data => {
                const goals = [...this.state.allGoals];
                goals.map((el, i) =>{
                   if(el.id == this.state.edit.toEdit){
                       if(data[0].title === ''){
                           goals.splice(i, 1);
                       }else{
                           goals.splice(i, 1, data[0]);
                       }
                   }
                });
                let editState = Object.assign({}, this.state.edit);
                editState.toEdit = 0;
                editState.status = false;
                this.setState({
                    allGoals: goals,
                    edit: editState
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
                                           onClick={this.addGoal} edit={this.state.edit} onEdit={this.editGoal} editHandle={this.handleGoalEdit} saveGoal={this.saveEditedGoal}/>
                            }
                        </div>
                }
            </div>
        );
    }
}

export default App;