import chalk from 'chalk';
import puppeteer from 'puppeteer-extra';

const ARGS = ['--window-size=1280,800', '--disable-features=site-per-process'];
const isDev = process.env.NODE_ENV === 'development';

export const browser = puppeteer.launch({
  args: ARGS,
  headless: !isDev,
}).then(async(browser) => {
  console.log(chalk.green('Browser is opened'));
  return browser
});

export default browser;
