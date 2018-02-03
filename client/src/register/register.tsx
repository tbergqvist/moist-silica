import {h, render, Component} from "preact";
import { connect } from 'preact-redux';
import { register } from './actions';
import { Store } from "redux";
import { State, LoginState } from "../state";

interface Props {
  onSubmit(event: Event, login: string, password: string);
  loading: boolean;
  error: string;
}

interface LocalState {
  username: string;
  password: string;
}

function mapStateToProps(state: State) {
  console.log(state);
  return {
    loading: state.register.loading,
    error: state.register.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit(event, username, password) {
      event.preventDefault();
      dispatch(register(username, password));
    }
  };
}

export class Register2 extends Component<Props, LocalState>{
  state = {
    username: "hej23",
    password: ""
  };

  render(props: Props, localState: LocalState) {
    console.log({props, localState});
    let updateLogin = (event: Event) => {
      let newValue: string = event.target["value"];
      this.setState({username: newValue});
    }

    let updatePassword = (event: Event) => {
      let newValue = event.target["value"];
      this.setState({password: newValue});
    }

    return (
      <form onSubmit={(event)=>props.onSubmit(event, localState.username, localState.password)}>
        <h3>Register</h3>
        <label>Username:</label>
        <input type="text" value={localState.username} onInput={updateLogin}/>
        <label>Password:</label>
        <input type="password" value={localState.password} onInput={updatePassword} />
        <button type="submit">Register</button>
        <div>Loading: {props.loading.toString()}</div>
        <div>Error: {props.error}</div>
      </form>
      );
  }
}

export const Register = connect(
  mapStateToProps, mapDispatchToProps
)(Register2);