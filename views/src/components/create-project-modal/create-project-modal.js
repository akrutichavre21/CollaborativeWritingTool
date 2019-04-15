import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import {createProjectAPI} from "../../utils/HTTP";
import {toast} from "react-toastify";

const Toaster = ({message}) => <div>{message}</div>;

export default class CreateProjectModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pname: "",
            reviewer: "",
            contributors: [],
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    validateForm = () => {
        return true;
        // return this.state.username.length > 0 && this.state.password.length > 0;
    };

    handleContributors = contributors => {
        this.setState({contributors});
    };

    createProject = async () => {
        const requestData = {
            pname: this.state.pname,
            reviewer: this.state.reviewer,
            contributors: this.state.contributors.join(",")
        };
        console.log(requestData);

        try {
            const response = await createProjectAPI(requestData);
            if (response.status === 201) {
                toast.success(<Toaster message={response.data.message}/>);
                this.props.openCreateProjectModal();
                this.props.addProjects(requestData);
                this.reset();
            }
        } catch (e) {
            console.log(e);
        }
    };

    reset = () => {
        this.setState({
            pname: "",
            reviewer: "",
            contributors: []
        });
    };

    render() {
        return (
            <Modal
                show={this.props.openModal}
                onHide={this.props.openCreateProjectModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create a new project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="pname">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={this.state.projectName}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="reviewer">
                            <Form.Label>Reviewer</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={this.state.reviewer}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="contributors">
                            <Form.Label>Contributor</Form.Label>
                            <TagsInput
                                value={this.state.contributors}
                                onChange={this.handleContributors}
                                inputProps={{placeholder: ""}}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={this.props.openCreateProjectModal}
                    >
                        Close
                    </Button>
                    <Button variant="info" onClick={this.createProject}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
