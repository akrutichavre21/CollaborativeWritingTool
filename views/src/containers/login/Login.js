import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import LoginForm from "../../components/login-form/login";
import {getData} from "../../utils/storage";
import {Redirect} from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToPreviousRoute: false
        };
    }

    componentWillMount() {
        if (getData('token')) {
            this.props.history.push("/home");
        }
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToPreviousRoute } = this.state;

        if (redirectToPreviousRoute) {
            return <Redirect to={from} />;
        }

        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col sm={12} xs={12} md={6}>
                        <LoginForm history={this.props.history}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}