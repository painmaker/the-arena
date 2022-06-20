

function assert() {
  throw new Error('console.assert is not implemented');
}

function error(...args: any[]) {
  $.Warning(args);
}

function warn(...args: any[]) {
  $.Warning(args);
}

function log(...args: any[]) {
  $.Msg(args);
}

function debug(...args: any[]) {
  $.Msg(args);
}

function info(...args: any[]) {
  $.Msg(args);
}

function time() {
  throw new Error('console.time is not implemented');
}

function timeEnd() {
  throw new Error('console.timeEnd is not implemented');
}

function trace() {
  throw new Error('console.trace is not implemented');
}

function clear() {
  throw new Error('console.clear is not implemented');
}

function dir() {
  throw new Error('console.dir is not implemented');
}

function dirxml() {
  throw new Error('console.dirxml is not implemented');
}

function table() {
  throw new Error('console.table is not implemented');
}

function count() {
  throw new Error('console.count is not implemented');
}

function countReset() {
  throw new Error('console.countReset is not implemented');
}

function group() {
  throw new Error('console.group is not implemented');
}

function groupCollapsed() {
  throw new Error('console.groupCollapsed is not implemented');
}

function groupEnd() {
  throw new Error('console.groupEnd is not implemented');
}

function profile() {
  throw new Error('console.profile is not implemented');
}

function profileEnd() {
  throw new Error('console.profileEnd is not implemented');
}

function timeStamp() {
  throw new Error('console.timeStamp is not implemented');
}

export const console = {
  assert,
  warn,
  error,
  log,
  debug,
  info,
  time,
  timeEnd,
  trace,
  clear,
  dir,
  dirxml,
  table,
  count,
  countReset,
  group,
  groupCollapsed,
  groupEnd,
  profile,
  profileEnd,
  timeStamp,
};