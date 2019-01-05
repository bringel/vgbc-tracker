//@flow
import * as React from 'react';
import classnames from 'classnames';

import TabViewTab from './TabViewTab';

import './TabView.scss';

type Props = {
  activeTab: string,
  children: React.Node,
  onTabClicked: (tabTitle: string) => void
};

class TabView extends React.Component<Props> {
  handleTabClick = (title: string) => {
    if (title !== this.props.activeTab) {
      this.props.onTabClicked(title);
    }
  };

  render() {
    const { activeTab, children } = this.props;
    const tabs = React.Children.toArray(children);
    const tabTitles = tabs.map((t: TabViewTab) => t.props.tabTitle);
    const activeTabContent = tabs.find((t: TabViewTab) => t.props.tabTitle === activeTab);

    return (
      <div className="tab-view-wrapper">
        <div className="tabs-container">
          {tabTitles.map((t) => (
            <span
              key={t}
              className={classnames('tab-name', { 'active-tab': t === activeTab })}
              onClick={() => this.handleTabClick(t)}>
              {t}
            </span>
          ))}
        </div>
        <div className="tab-content-container">{activeTabContent || null}</div>
      </div>
    );
  }
}

export default TabView;
