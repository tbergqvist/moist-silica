import {h} from "preact";
import { Login } from './login/login';
import { Register } from './register/register';
import { Home } from './home/home';
import Router from 'preact-router';

export function App() {
  return (
    <Router>
      <Login path="/login"></Login>
      <Register path="/register"></Register>
      <Home path="/"></Home>
    </Router>
  );
}