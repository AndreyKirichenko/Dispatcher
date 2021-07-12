// Simple script for dispatcher debug
class Script {  
  created = Date.now();

  async start(page) {
    console.log(`Script is started`);

    this.page = page;

    try {
      this.page.goto('http://yandex.ru')
      this.page.waitForTimeout(5000);
      this.watcher = setInterval(this.stop, 10000);
    } catch (error) {
      throw error;
    }
  }

  stop = async () => {
    console.log(`Script is stoped`);
    try {
      clearInterval(this.watcher);
      await this.page.close();
    } catch (error) {
      throw error;
    }
  }
}

export default Script;
