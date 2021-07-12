import browser from './browser';
import Script from '../src/Script';
import Dispatcher from '../src/Dispatcher';

const LIMIT = 5;

(async function() {
  const dispatcher = new Dispatcher({
    browser,
    limit: LIMIT,
  });

  const script = new Script();

  await dispatcher.add(script);
  console.log('script closed');
})();
