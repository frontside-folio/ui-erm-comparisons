/* eslint-disable no-console */

const warn = console.warn;
const warnBlacklist = [
  /componentWillReceiveProps has been renamed/,
  /componentWillUpdate has been renamed/,
  /componentWillMount has been renamed/,
];

const error = console.error;
const errorBlacklist = [
  /\[React Intl\]/,
  /\[React Intl Error MISSING_TRANSLATION\]/,
  /Cannot update a component from inside the function body of a different component/,
  /Warning: Failed prop typ/,
  /perform a React state update on an unmounted component/,
];

export default function turnOffWarnings() {
  console.warn = function (...args) {
    if (warnBlacklist.some(rx => rx.test(args[0]))) {
      return;
    }
    warn.apply(console, args);
  };

  console.error = function (...args) {
    if (errorBlacklist.some(rx => rx.test(args[0]))) {
      return;
    }
    error.apply(console, args);
  };
}
