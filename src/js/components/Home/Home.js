// @flow

import React, {Component} from "react";
import Pillar from "./Pillar";
import TaskButton from "./TaskButton";
import type {HomeState} from "../../store/HomeState";
import type {SiteConfig} from "../../store/SiteConfig";
import LogoutButton from "../Button/LogoutButton";
import MySubmissionButton from "../Button/MySubmissionButton";
import AwaitingApprovalsButton from "../Button/AwaitingApprovalsButton";
import MyProductButton from "../Button/MyProductButton";
import type {Task} from "../../types/Task";

type Props = {
  homeState: HomeState,
  siteConfig: SiteConfig,
};

class Home extends Component<Props> {

  render() {
    const {title, subtitle, pillars, tasks} = {...this.props.homeState};
    const {logoPath} = {...this.props.siteConfig};

    return (
      <div className="Home">
        <LogoutButton classes={["clearfix","float-right", "mt-5", "mr-4"]}/>

        <MySubmissionButton classes={["clearfix","float-right", "mt-5", "mr-1"]}/>

        <AwaitingApprovalsButton classes={["clearfix","float-right", "mt-5", "mr-1"]}/>
        <MyProductButton classes={["clearfix","float-right", "mt-5", "mr-1"]}/>
        <div className="layout">
          <a href="/"><img src={logoPath} className="logo"/></a>
          <h1>
            {title}
          </h1>
          <h2>
            {subtitle}
          </h2>
          <div className="pillars">
            <div className="row">
              {pillars.map((pillar, index) => {
                return (
                  <Pillar link={`/questionnaire/start/${pillar.questionnaireID}`}
                          classes={["col", "mx-1"]}
                          pillar={pillar}
                          key={'pillar_'+(index+1)}
                  />
                );
              })}
            </div>
          </div>
          <div className="tasks">
            {tasks.map((task: Task, index) => {
              let link = `/tasks/standalone/${task.id}`;
              if (task.type === "selection") {
                link = `/component-selection/standalone/${task.id}?componentTarget=${task.componentTarget}`;
              }
              return (
                <TaskButton link={link} classes={["mx-1"]} title={task.name} key={'standalone_task_'+(index+1)}/>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
