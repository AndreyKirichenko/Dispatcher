class Tab {
  constructor(script, browser) {
    this.script = script;
    this.browser = browser;
  }

  created = Date.now();
  watcher;

  async init() {
    return new Promise((resolve) => {
      this.watcher = setInterval(() => {
        if (this?.page?.isClosed()) {
          clearInterval(this.watcher);
          resolve();
        }
      }, 0);
    });
  }

  async start() {
    try {
      this.page = await this.browser.then((browser) => browser.newPage());
      await this.script.start(this.page);
    } catch (error) {
      console.log(error);
    }
  }

  async close() {
    try {
      if (!this?.page?.isClosed()) {
        await this.page.close();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default Tab;
