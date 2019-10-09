import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import CustomInterface from './components/CustomInterface/CustomInterface';
import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'EmergencyContactCenterPlugin';

export default class EmergencyContactCenterPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://black-ferret-8408.twil.io/assets/styles.css';

    document.head.appendChild(link);
    
    flex.CRMContainer.defaultProps.uriCallback = (task) => {
      flex.CRMContainer.Content.replace(<CustomInterface key='custominterface' task={task} />);
    }


    flex.AgentDesktopView.defaultProps.splitterOptions = {
      minimumSecondPanelSize: "70%"
    }
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
