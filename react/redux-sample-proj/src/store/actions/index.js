// group exports from other files so we can just have 1 file to
//  import from
export {
    add,
    subtract,
    increment,
    decrement
} from './counter';

export {
    // don't need saveResult in other files
    storeResult,
    deleteResult
} from './result';