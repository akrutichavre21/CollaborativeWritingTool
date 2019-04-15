import React from "react";
import {Card, Col, Dropdown, DropdownButton, Row} from "react-bootstrap";
import {toast} from "react-toastify";

const Toaster = ({message}) => <div>{message}</div>;

export default class ProjectCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            version: [],
            disableContribute: true,
            disableRead: true,
            selected: null
        };

        this.loadData();
    }

    componentWillMount() {
        if (!this.state.version.length) {
            this.setState({
                disableContribute: false,
                disableRead: true
            })
        }
    }

    loadData = () => {
        const versions = [...Array(this.props.version).keys()];
        versions.sort((a, b) => {
            return b - a;
        });
        versions.forEach((version, index) => {
            const isLatest = index === 0;
            this.setState({
                version: this.state.version.push({
                    ver: version + 1,
                    isLastest: isLatest
                })
            });
        });

    };

    selectedValue = item => {
        this.setState({
            disableContribute: !item.isLastest,
            selected: item.ver,
            disableRead: false
        });
    };

    handleSelected = event => {
        this.setState({
            selected: event
        });
    };

    contributorClicked = () => {
        if (this.state.selected < this.props.version) {
            toast.warn(<Toaster message={'Sorry! You are only allowed to contribute for the latest version.'}/>);
            return;
        }

        const params = {id: this.props.id, version: this.props.version};
        this.props.history.push(`/project/contribute`, params);
    };

    readClicked = () => {
        if (!this.state.selected) {
            toast.warn(<Toaster message={'Please select a version to read'}/>);
            return;
        }
        this.props.history.push(`/project/read/${this.props.id}/${this.state.selected}`, {isReviewer: false});
    };

    render() {
        return (
            <Card>
                <Card.Body style={{padding: 0}}>
                    <Row>
                        <Col xs={6} className={'bg pt-1 pr-3'}>
                            <Card.Title className={'m-3 pl-3'}>
                                <strong>{this.props.title}</strong>
                            </Card.Title>
                        </Col>
                        <Col xs={2} className={'bg pt-1 pr-3 mt-2'}>
                            <div className={'text-right'}>
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    variant="outline-secondary"
                                    title={
                                        this.state.selected > 0
                                            ? this.state.selected
                                            : "Select a version"
                                    }
                                    onSelect={event => this.handleSelected(event)}
                                >
                                    <Dropdown.Header>Select a version</Dropdown.Header>
                                    {this.state.version.map((item, index) => (
                                        <Dropdown.Item
                                            key={index}
                                            eventKey={item.ver}
                                            onSelect={() => {
                                                this.selectedValue(item);
                                            }}
                                        >
                                            {item.ver}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>
                        </Col>
                        <Col className={'bg bg-info'} xs={2}
                             onClick={this.readClicked}
                             disabled={this.state.disableRead}>
                            <div style={{flex: 1}} className={'mt-3'}>
                                <h6 style={{color: 'white', textAlign: 'center'}}>Read</h6>
                            </div>
                        </Col>
                        <Col className={'bg bg-secondary'} xs={2}
                            // disabled={this.state.disableContribute}
                             onClick={this.contributorClicked}>
                            <div style={{flex: 1}} className={'mt-3'}>
                                <h6 style={{color: 'white', textAlign: 'center'}}>Contribute</h6>
                            </div>
                        </Col>

                    </Row>
                </Card.Body>
            </Card>
        );
    }
}
