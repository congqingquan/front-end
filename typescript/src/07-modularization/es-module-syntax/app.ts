import { printArg, Dog, Cat } from './animals'
// import { printArg, type Dog, type Cat } from './animals'
// import type { Dog, Cat } from './animals'
// import {printArg} from './animals'

printArg("123");

type Animal = Dog & Cat

export { }