import React from 'react';
import CustomNavbar from "../../components/nav-bar/navbar";
import {getData} from "../../utils/storage";
import {Card, Col, Row} from "react-bootstrap";
import {getReviewerProjectsAPI} from '../../utils/HTTP';

export default class ReviewerHome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
        }
    }

    componentWillMount() {
        if (!getData('token')) {
            this.props.history.push("/login");
        }
    }

    async componentDidMount() {
        this.setState({
            name: localStorage.getItem('name')
        });
        await this.fetchProjectList()
    }

    addProjects = (project) => {
        this.setState({
            projects: [...this.state.projects, project]
        });
    };

    fetchProjectList = async () => {
        const requestData = {
            name: localStorage.getItem('name')
        };

        try {
            const response = await getReviewerProjectsAPI(requestData);
            if (response.status === 200) {
                const projectList = response.data.pdetails;
                projectList.forEach((project) => {
                    this.addProjects(project);
                })
            }
        } catch (e) {
            console.log(e);
        }
    };

    readClicked = (id, pver) => {
        this.props.history.push(`/project/read/${id}/${pver}`, {isReviewer: true});
    };

    render() {
        const Badges = (data) => {
            if (data.status === 0) {
                return (<span className='badge badge-warning'> Pending</span>);
            } else if (data.status === 1) {
                return (<span className='badge badge-success'> Accepted</span>);
            } else if (data.status === 2) {
                return (<span className='badge badge-danger'> Rejected</span>);
            }
        };

        const WelcomeText = () => {
            const name = localStorage.getItem('name');
            const text = name.charAt(0).toUpperCase() + name.slice(1);
            return (<h4>
                Welcome {text}!
            </h4>);
        };

        const ReviewerProjectCard = (data) => {
            return (
                <Card>
                    <Card.Body style={{padding: 0}}>
                        <Row>
                            <Col xs={6} className={'bg pt-1 pr-3'}>
                                <Card.Title className={'m-3 pl-3'}>
                                    <strong>{data.item.pname}</strong>
                                </Card.Title>
                            </Col>
                            <Col xs={3} className={'bg pt-1 pr-3 mt-3'}>
                                <div className={'text-right'}>
                                    <Badges status={data.item.status}/>
                                </div>
                            </Col>
                            <Col className={'bg bg-info'} xs={3}
                                 onClick={() => this.readClicked(data.item.pid, data.item.pver)}>
                                <div style={{flex: 1}} className={'mt-3'}>
                                    <h5 style={{color: 'white', textAlign: 'center'}}>Read</h5>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            );
        };

        return (
            <>
                <CustomNavbar history={this.props.history} isReviewer={true}/>
                <div className='container'>
                    <div className='pb-2 mt-4 mb-2 border-bottom'>
                        <h4>Projects for Review</h4>
                    </div>
                    <div className='container pb-2 mt-4 mb-2'>
                        {
                            this.state.projects.length ?
                                this.state.projects.map((item, index) =>
                                    <li key={index} style={{listStyleType: 'none'}}>
                                        <div className='container mt-2 ml-10 mr-10'>
                                            <ReviewerProjectCard item={item}/>
                                        </div>
                                    </li>
                                ) :
                                <div className={'jumbotron text-center'}>
                                    <WelcomeText/>
                                    <br/>
                                    <p>
                                        No projects has been to you.<br/>
                                    </p>
                                </div>
                        }
                    </div>
                </div>
            </>
        );
    }
}