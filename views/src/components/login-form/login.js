import React from 'react';
import {Button, Card, Form} from 'react-bootstrap';
import {loginAPI} from "../../utils/HTTP";
import {Link} from "react-router-dom";
import {getData, storeData} from "../../utils/storage";
import {toast} from "react-toastify";

const Toaster = ({message}) => <div>{message}</div>;

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            authenticated: false,
            reviewer: false
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    authenticate = async (event) => {
        event.preventDefault();
        const requestData = {
            name: this.state.username,
            pswd: this.state.password
        };

        const valid = this.validationChecks();
        if (!valid) {
            return;
        }

        try {
            const response = await loginAPI(requestData);
            if (response.status === 200) {
                if (!response.data.token) {
                    this.reset();
                    return;
                }
            }

            if (response.data.isReviewer === true) {
                this.setState({
                    reviewer: true
                });
            }

            storeData('token', response.data.token);
            storeData('name', response.data.name);
            this.setState({
                authenticated: true
            });

            toast.success(<Toaster message={response.data.message}/>);
        } catch (e) {
            console.log(e);
        }
    };

    componentDidUpdate() {
        if (this.state.authenticated && getData('token') && this.state.reviewer === true) {
            this.props.history.push("/reviewerHome");
        } else if (this.state.authenticated && getData('token') && this.state.reviewer === false) {
            this.props.history.push("/home");
        }
    }

    validationChecks = () => {
        if (!this.state.username) {
            toast.error(<Toaster message={'Username is required'}/>);
            return false;
        }

        if (!this.state.password) {
            toast.error(<Toaster message={'Password is required'}/>);
            return false;
        }

        return true;
    };

    reset = () => {
        this.setState({
            username: '',
            password: ''
        });
    };

    validateForm = () => {
        return true;
        // return this.state.username.length > 0 && this.state.password.length > 0;
    };

    render() {
        return (
            <Card>
                <Card.Header style={{color: 'white', backgroundColor: '#17a2b8'}}>
                    <strong>LOGIN</strong>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.authenticate}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control autoFocus type="text" value={this.state.username}
                                          onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={this.state.password} onChange={this.handleChange} type="password"/>
                        </Form.Group>
                        <Button block disabled={!this.validateForm()} type="submit" variant="info">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer style={{textAlign: 'center'}}>
                    <Link to='/createUser' style={{color: '#17a2b8'}}>Not yet registered? Click here to Register</Link>
                </Card.Footer>
            </Card>
        );
    }
}
