import React from 'react';

import Gear from './svg/Gear';
import SettingsModal from './SettingsModal';

const Settings = (props) => (
  <div>
    <div className="settings__button" onClick={props.handleRevealSettings}>
      <Gear />
    </div>
    {props.revealSettings &&
      <SettingsModal
        colors={props.colors}
        backgroundColor={props.backgroundColor}
        handleShowColorPicker={props.handleShowColorPicker}
        handleHideSettingsModal={props.handleHideSettingsModal}
        restoreDefaults={props.restoreDefaults}
        deleteAllNotes={props.deleteAllNotes}
      />}
  </div>
);

export default Settings;
