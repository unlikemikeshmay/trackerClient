import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="ui container">

<div className="ui middle aligned center aligned grid">
  <div className="column">
    <h2 className="ui teal image header">
      
      <div className="content">
        Log-in to your account
      </div>
    </h2>


    <form className="ui large form" name="form" onSubmit={this.handleSubmit}>
      <div className="ui stacked segment">
        <div className="field">
          <div className="ui left icon input">
            <i className="user icon"></i>
            <input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange} />
          </div>
        </div>
        <div className="field">
          <div className="ui left icon input">
            <i className="lock icon"></i>
            <input type="password"  placeholder="Password" name="password" value={password} onChange={this.handleChange} />
          </div>
        </div>
        <button className="ui fluid large teal submit button">Login</button>
      </div>

    </form>
    {/* {submitted && !username ? <img src={nedry} alt="loading..." />:null} */}
        </div>
    </div>
</div>
          
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };

/*   
  <div className="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui teal image header">
      
      <div class="content">
        Log-in to your account
      </div>
    </h2>
    //
    <form className="ui large form" name="form" onSubmit={this.handleSubmit}>
                    <div className={'ui stacked segment' + (submitted && !username ? ' has-error' : '')}>
                        <div className="field">
                            <div className="ui left icon input">
                                <i class="user icon"></i>
                                <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                                {submitted && !username &&
                                    <div className="ui error message">Username is required</div>
                                }
                            </div>
                            
                        </div>
                  
                    </div>
                    <div className="field">
                    <div className="ui left icon input" >
                    <i class="lock icon"></i>
                        <input type="password" className={"form-control "+ (submitted && !password ? ' error' : '')} name="password" value={password} onChange={this.handleChange} />
                    </div>
                    
                        {submitted && !password &&
                            <div className="ui error message">Password is required</div>
                        }
                    </div>
                    <button class="ui fluid large teal submist button">Login</button>
                    <div className="field">
                      

                        <Link to="/register" className="ui fluid large teal submit button">Register</Link>
                    </div>
                </form>
    //

  </div>
</div> */