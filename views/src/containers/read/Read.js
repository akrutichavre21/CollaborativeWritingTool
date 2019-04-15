import React from "react";
import CustomNavbar from "../../components/nav-bar/navbar";
import {Button, ButtonGroup, Card, Form, Image, Media} from "react-bootstrap";
import {getAllComments, getProjectDetails, postComments, updateProjectStatus} from "../../utils/HTTP";
import {getData} from "../../utils/storage";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {toast} from "react-toastify";

const Toaster = ({message}) => <div>{message}</div>;

export default class Read extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: '',
            id: 0,
            version: 0,
            comments: [],
            description: '',
        }
    }

    componentWillMount() {
        const illegal = this.props.location.state === undefined;
        if (illegal || !getData("token")) {
            this.props.history.push("/home");
        }

        this.setState({
            id: this.props.match.params.id,
            version: this.props.match.params.versionNum,
        });
    }

    async componentDidMount() {
        await this.listComments();
        await this.getProjectDetails();
    }

    componentWillUnmount() {
        this.state = {
            comment: '',
            id: 0,
            version: 0,
            comments: [],
            description: '',
        }
    }

    saveComment = async () => {
        if (!this.state.comment) {
            const message = 'Please type proper comment';
            toast.warn(<Toaster message={message}/>);
            return;
        }

        try {
            const commentData = {
                comment: this.state.comment,
                pid: this.state.id,
                pver: this.state.version,
                name: localStorage.getItem('name')
            };
            const response = await postComments(commentData);
            if (response.status === 201) {
                await this.listComments();
            }
        } catch (e) {
            console.log(e);
        }
    };

    listComments = async () => {
        try {
            const commentData = {
                pid: this.state.id,
            };
            const response = await getAllComments(commentData);
            if (response.status === 200) {
                this.setState({
                    comments: response.data.description
                })
            }

        } catch (e) {
            console.log(e);
        }
    };

    getProjectDetails = async () => {
        try {
            const commentData = {
                pid: this.state.id,
                versionNum: this.state.version
            };
            const response = await getProjectDetails(commentData);
            if (response.status === 200) {
                this.setState({
                    description: response.data.description
                })
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

    updateProjectStatus = async (status) => {
        try {
            const commentData = {
                pid: this.state.id,
                pver: this.state.version,
                status: status
            };
            const response = await updateProjectStatus(commentData);
            console.log(response);
            if (response.status === 201) {
                toast.success(<Toaster message={`Project status updated successfully`}/>);
                this.props.history.push('/reviewerHome');
            }
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const CommentBox = (data) => {
            const date = new Date(data.item.timestamp);
            const random = Math.random();
            const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

            return (
                <Media>
                    <Image width={64} height={64} className="mr-3" roundedCircle
                           src={`https://api.adorable.io/avatars/141/${random}.png`}
                    />
                    <Media.Body>
                        <div style={{
                            backgroundColor: '#dedede',
                            borderRadius: 100,
                            paddingLeft: 30,
                            paddingTop: 5,
                            paddingBottom: 5
                        }}>
                            <blockquote class="blockquote p- text-dark">
                                <h6>
                                    {data.item.comment}
                                </h6>
                                <footer class="blockquote-footer">
                                    Posted by: <b>{data.item.name}</b> &nbsp;
                                    <span>
                                             <small>on {dateString}</small>
                                        </span>
                                </footer>
                            </blockquote>
                        </div>
                    </Media.Body>
                </Media>
            );
        };

        const StatusButton = () => {
            return (
                <ButtonGroup aria-label="Status Button">
                    <Button variant="outline-warning"
                            className={"mr-2"}
                            title={'Mark Pending'}
                            style={{borderRadius: '100%', width: 60, height: 60}}
                            onClick={() => this.updateProjectStatus(0)}>
                        <FontAwesomeIcon icon="hand-paper"/>
                    </Button>
                    <Button variant="outline-success"
                            className={"mr-2"}
                            title={'Accept'}
                            style={{borderRadius: '100%', width: 60, height: 60}}
                            onClick={() => this.updateProjectStatus(1)}>
                        <FontAwesomeIcon icon="check"/>
                    </Button>
                    <Button variant="outline-danger"
                            className={"mr-2"}
                            title={'Reject'}
                            style={{borderRadius: '100%', width: 60, height: 60}}
                            onClick={() => this.updateProjectStatus(2)}>
                        <FontAwesomeIcon icon="times"/>
                    </Button>
                </ButtonGroup>
            );
        };

        return (
            <>
                {
                    this.props.location.state && this.props.location.state.isReviewer ?
                        <CustomNavbar history={this.props.history} isReviewer={true}/> :
                        <CustomNavbar history={this.props.history} addProjects={this.addProjects}/>
                }
                <div className={'container'}>
                    <div className='container mt-5'>
                        <div className='pb-2 mt-4 mb-2 border-bottom'>
                            <div className={'text-right'}>
                                {
                                    this.props.location.state && this.props.location.state.isReviewer ?
                                        <StatusButton/> : null
                                }
                            </div>
                            <h3>Project Title</h3>
                        </div>
                        <span className={'badge badge-info ml-3 mb-3'}>Contributor-1</span> &nbsp;
                        <span className={'badge badge-info '}>Contributor-2</span>

                        <div className={'container'}>
                            <Card>
                                <Card.Body>
                                    <Card.Title> {this.state.description} </Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>

                    <div className={'container'}>
                        <div className='container mt-5'>
                            <Form.Group controlId="comment">
                                <Form.Control as="textarea" rows="3" value={this.state.comment}
                                              onChange={this.handleChange}/>
                            </Form.Group>
                            <div className={'text-right'}>
                                <Button variant="outline-info" onClick={this.saveComment}>
                                    Add Comment
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className='pb-2 mt-4 mb-2 border-bottom'>
                        <h4>Comments</h4>
                    </div>
                    <div style={{marginLeft: 10}}>
                        {
                            this.state.comments.length ?
                                this.state.comments.map((item, index) => (
                                        <li key={index} style={{
                                            listStyleType: 'none', margin: '3.5rem',
                                            marginBottom: '1rem', marginTop: '1rem',
                                            marginRight: 0
                                        }}>
                                            <CommentBox item={item}/>
                                        </li>
                                    )
                                ) :
                                <div className={'jumbotron text-center'}>
                                    <p>
                                        No one has commented yet, but don't be sad. <br/>
                                        You can post your comment for this project by simply using the comment
                                        box
                                        above.
                                    </p>
                                </div>
                        }
                    </div>
                </div>
            </>
        );
    }
}