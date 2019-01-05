//@flow
import * as React from 'react';
import classnames from 'classnames';

import TabViewTab from './TabViewTab';

import './TabView.scss';

type Props = {
  activeTab: string,
  children: React.Node
};

class TabView extends React.Component<Props> {
  render() {
    const { activeTab, children } = this.props;
    const tabs: Array<TabViewTab> = React.Children.toArray(children);
    const tabTitles = tabs.map((t) => t.props.tabTitle);
    const activeTabContent = tabs.find((t) => t.props.tabTitle === activeTab);

    return (
      <>
        <div className="tabs-container">
          {tabTitles.map((t) => (
            <span key={t} className={classnames('tab-name', { 'active-tab': t === activeTab })}>
              {t}
            </span>
          ))}
        </div>
        {activeTabContent}
      </>
    );
  }
}

export default TabView;
