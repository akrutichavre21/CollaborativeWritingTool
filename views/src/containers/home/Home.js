import React from "react";
import CustomNavbar from "../../components/nav-bar/navbar";
import {getData} from "../../utils/storage";
import ProjectCard from "../../components/project-card/projectcard";
import {getProjectsAPI} from "../../utils/HTTP";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            name: ''
        };
    }

    componentWillMount() {
        if (!getData("token")) {
            this.props.history.push("/login");
        }
    }

    componentWillUnmount() {
        this.setState({
            projects: [],
            name: ''
        })
    }

    addProjects = project => {
        this.setState({
            projects: [...this.state.projects, project]
        });
    };

    async componentDidMount() {
        this.setState({
            name: localStorage.getItem('name')
        });
        await this.fetchProjectList();
    }

    fetchProjectList = async () => {
        const requestData = {
            name: localStorage.getItem("name")
        };

        try {
            const response = await getProjectsAPI(requestData);
            if (response.status === 200) {
                const projectList = response.data.pdetails;
                projectList.forEach(project => {
                    this.addProjects(project);
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const WelcomeText = () => {
            const name = localStorage.getItem('name');
            const text = name.charAt(0).toUpperCase() + name.slice(1);
            return (<h4>
                Welcome {text}!
            </h4>);
        };

        return (
            <>
                <CustomNavbar history={this.props.history} addProjects={this.addProjects}/>
                <div className={'container'}>
                    <div className='pb-2 mt-4 mb-2 border-bottom'>
                        <h4>Your Projects</h4>
                    </div>
                    <div className='container pb-2 mt-4 mb-2'>
                        {
                            this.state.projects.length ?
                                this.state.projects.map((item, index) => (
                                    <li key={index} style={{listStyleType: "none"}}>
                                        <div className='container mt-2 ml-10 mr-10'>
                                            {
                                                <ProjectCard title={item.pname}
                                                             version={item.pver || 0}
                                                             history={this.props.history}
                                                             id={item.pid}/>
                                            }
                                        </div>
                                    </li>
                                )) :
                                <div className={'jumbotron text-center'}>
                                    <WelcomeText/>
                                    <br/>
                                    <p>
                                        Please add a few projects to continue.<br/>
                                        Have a nice day.
                                    </p>
                                </div>
                        }
                    </div>
                </div>
            </>
        );
    }

    componentWillUnmount() {
        this.setState({
            projects: []
        });
    }
}
