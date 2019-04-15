import React from 'react';
import {Col, Container, Row} from 'react-bootstrap'
import RegisterForm from "../../components/register-form/register";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container>
                <Row className="justify-content-md-center">
                    <Col sm={12} xs={12} md={6}>
                        <RegisterForm history={this.props.history} isReviewer={false}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}