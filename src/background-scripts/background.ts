import Activity from '@/background-scripts/_activity';
import Auth from '@/background-scripts/_auth';
import * as Menus from '@/background-scripts/_menus';

const browser = require('webextension-polyfill'); // eslint-disable-line

function handleMessage(request: any, sender: any, sendResponse: Function) { // eslint-disable-line
  switch (request.code) {
    case 'AUTH_START':
      Auth.authStart(sendResponse);
      break;

    case 'USER_REFRESH':
      Auth.userRefresh(sendResponse);
      break;

    case 'USER_LOGOUT':
      Auth.userLogout(sendResponse);
      break;

    case 'ACTIVITY_CLEAR':
      Activity.clearActivity(sendResponse);
      break;

    case 'MENUS_TOGGLE':
      Menus.toggle(request.value);
      sendResponse({ code: 'SUCCESS' });
      break;

    case 'SAVE_ACTIVITY':
      Activity.saveActivity(request.data as AniSearch.Activity.Activity, sendResponse);
      break;

    case 'SEARCH':
      // TODO:
      sendResponse({ code: 'SEARCH_SUCCESS' });
      break;

    default:
      sendResponse({ code: 'UNKNOWN_ACTION' });
      break;
  }

  // Keep listener active to wait for async response.
  return true;
}

browser.runtime.onMessage.addListener(handleMessage);

// Init contextual menus.
Menus.init();
