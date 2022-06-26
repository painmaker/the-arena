import { console } from './utils/console'

type ConsoleType = typeof console

declare global {
	interface Console extends ConsoleType {}
	var console: Console
}

const global: typeof globalThis = new Function('return this')()
global.console = console
