// SUT
import * as WF from '../src/main';

import { configure } from '@storybook/html';

function loadStories() {

  WF.registerBanner([]);
  WF.registerSurface();

  WF.registerMenu();
  WF.registerMultiSelect();

  require('../src/multiselect/multiselect.story');
  require('../src/banner/banner.story');
  require('../src/menu/Menu.story');
  require('../src/surface/Surface.story');
}

configure(loadStories, module);
