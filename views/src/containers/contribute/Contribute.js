import React from 'react';
import CustomNavbar from "../../components/nav-bar/navbar";
import {getData} from "../../utils/storage";
import {Button, Form} from "react-bootstrap";
import {getProjectDetails, saveProject} from "../../utils/HTTP";
import {toast} from "react-toastify";

const Toaster = ({message}) => <div>{message}</div>;

export default class Contribute extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            version: '',
            description: ''
        }
    }

    componentWillMount() {
        const illegal = this.props.location.state === undefined;
        if (illegal || !getData("token")) {
            this.props.history.push("/home");
        }

        this.setState({
            id: this.props.location.state.id,
            version: this.props.location.state.version
        });
    }

    async componentDidMount() {
        await this.getProjectDetails();
    }

    saveProject = async () => {
        try {
            const data = {
                pid: this.state.id,
                description: this.state.description
            };
            const response = await saveProject(data);
            console.log(response);
            if (response.status === 201) {
                toast.success(<Toaster message={'New version has been added'}/>);
                this.props.history.push('/home');
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    getProjectDetails = async () => {
        if (!this.state.version) {
            return;
        }

        try {
            const data = {
                pid: this.state.id,
                versionNum: this.state.version
            };
            const response = await getProjectDetails(data);
            if (response.status === 200) {
                this.setState({
                    description: response.data.description
                })
            }

        } catch (e) {
            console.log(e);
        }
    };

    render() {
        return (
            <>
                <CustomNavbar history={this.props.history} addProjects={this.addProjects}/>
                <div className={'container'}>
                    <div className='container mt-5'>
                        <div className='pb-2 mt-4 mb-2 border-bottom'>
                            <h3>Project Title</h3>
                        </div>
                        <span className={'badge badge-info ml-3 mb-3'}>Contributor-1</span> &nbsp;
                        <span className={'badge badge-info '}>Contributor-2</span>

                        <div className={'container'}>
                            <div className='container mt-5'>
                                <Form.Group controlId="description">
                                    <Form.Control as="textarea" rows="10" value={this.state.description}
                                                  onChange={this.handleChange}/>
                                </Form.Group>
                                <div className={'text-right'}>
                                    <Button variant="outline-info" onClick={this.saveProject}>
                                        Save Project
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}