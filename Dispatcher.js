const Tab = require('./Tab.js');

const GARBAGE_COLLECTOR_TIMEOUT = 1000;
const TAB_CLOSE_TIMEOUT = 30000;
const TAB_LIMIT = 4;

class Dispatcher {
  constructor(props) {
    this.props = props;    
  }

  tabs = [];
  queue = [];

  add(script) {
    const {
      browser,
      garbageTimeoit = GARBAGE_COLLECTOR_TIMEOUT,
    } = this.props;

    if (!this.watcher) {
      this.watcher = setInterval(this.garbageCollector, garbageTimeoit);
    }

    const tab = new Tab(script, browser);
    
    this.queue.push(tab);
    this.run();

    return tab;
  }

  run = () => {
    const { tabLimit = TAB_LIMIT } = this.props;

    if(this.queue.length && this.tabs.length < tabLimit) {
      this.tabs.push(this.queue.shift());
      this.tabs[this.tabs.length - 1].start();
    }
  }

  garbageCollector = () => {
    const { tabCloseTimeout = TAB_CLOSE_TIMEOUT } = this.props;
    
    if (!this.tabs.length) return;

    const tab = this.tabs.shift();

    if (!tab) return;

    if ((tab.created + tabCloseTimeout) < Date.now()) {
      tab.close(); 
    }

    if (tab?.page?.isClosed()) {
      return this.run();
    }

    this.tabs.push(tab);
  }
}

module.exports =  Dispatcher;
