import React from 'react';
import {Button, Card, Form} from 'react-bootstrap';
import {createUserAPI} from "../../utils/HTTP";
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';

const Toaster = ({message}) => <div>{message}</div>;

export default class RegisterForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            isReviewer: false,
            registered: false
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleToggle = (event) => {
        this.setState({
            isReviewer: !!event.target.checked
        });
    };

    createUser = async (event) => {
        event.preventDefault();
        const requestData = {
            name: this.state.username,
            email: this.state.email,
            pswd: this.state.password,
            isReviewer: this.state.isReviewer
        };

        const valid = this.validationChecks();
        if (!valid) {
            return;
        }

        try {
            const response = await createUserAPI(requestData);
            console.log(response);
            if (response.status === 201) {
                toast.success(<Toaster message={response.data.message}/>);
                this.setState({
                    registered: true
                })
            }
        } catch (e) {
            console.log(e);
        }
    };

    validationChecks = () => {
        if (!this.state.username) {
            toast.error(<Toaster message={'Username is required'}/>);
            return false;
        }

        if (!this.state.email) {
            toast.error(<Toaster message={'Email is required'}/>);
            return false;
        }

        if (!this.state.password) {
            toast.error(<Toaster message={'Password is required'}/>);
            return false;
        }

        return true;
    };

    componentDidUpdate() {
        if (this.state.registered) {
            this.props.history.push('/');
        }
    }

    validateForm = () => {
        return true
        // return this.state.username.length > 0 && this.state.password.length > 0;
    };

    render() {
        return (
            <Card>
                <Card.Header style={{color: 'white', backgroundColor: '#17a2b8'}}>
                    <strong>REGISTER</strong>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.createUser}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control autoFocus type="text" value={this.state.username}
                                          onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control autoFocus type="email" value={this.state.email}
                                          onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={this.state.password} onChange={this.handleChange} type="password"/>
                        </Form.Group>
                        <Form.Group controlId="reviewer">
                            <Form.Check type="checkbox" label="Reviewer" onChange={this.handleToggle}/>
                        </Form.Group>
                        <Button block disabled={!this.validateForm()} type="submit" variant="info">
                            Register
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer style={{textAlign: 'center'}}>
                    <Link to='/login'  style={{color: '#17a2b8'}}>Already a member? Click here to Login</Link>
                </Card.Footer>
            </Card>
        );
    }
}
