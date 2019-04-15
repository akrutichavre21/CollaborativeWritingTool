import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import CreateProjectModal from "../create-project-modal/create-project-modal";
import {getData, removeData} from "../../utils/storage";
import {toast} from "react-toastify";

const Toaster = ({message}) => <div>{message}</div>;

export default class CustomNabvar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openModal: false,
            logOut: false
        }
    }

    openDropDown = () => {
        this.setState({
            logOut: !this.state.logOut
        });

        removeData('token');
        removeData('name');
        toast.success(<Toaster message={'Logged Out Successfully'}/>);
    };

    componentDidUpdate() {
        if (this.state.logOut && !getData('token')) {
            this.props.history.push('/');
        }
    }

    openCreateProjectModal = () => {
        this.setState({
            openModal: !this.state.openModal
        });
    };

    goToHome = () => {
      const routePath = this.props.isReviewer ? '/reviewerHome': '/home';
      this.props.history.push(routePath);
    };

    render() {
        return (
            <>
                <Navbar bg="info" expand="lg" variant="dark">
                    <Navbar.Brand onClick={this.goToHome}>Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {
                                !this.props.isReviewer ? <Nav.Link onClick={this.openCreateProjectModal}>
                                    Create Project
                                </Nav.Link> : null
                            }
                        </Nav>
                        <Nav pullRight>
                            <Nav.Link onClick={this.openDropDown}>
                                Log Out
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <CreateProjectModal openModal={this.state.openModal}
                                    openCreateProjectModal={this.openCreateProjectModal}
                                    addProjects={this.props.addProjects}
                />
            </>
        );
    }
}