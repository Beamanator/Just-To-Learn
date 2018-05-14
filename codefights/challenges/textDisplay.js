/**
 * Name: Text Display
 * CODEWRITING
 * Hey! We've all used a text editor before (you're probably about to use one
 * right now!) but have you ever wondered how they work behind the scenes? In
 * this series of challenges we'll be looking at some of the interesting
 * programmatic ideas involved in text editors.
 * 
 * Let's start with something relatively simple: we'll just display some text
 * the user typed. More formally, given a series of keystrokes (in the form of
 * an array of key codes), we'd like to return the resulting string.
 * 
 * Example
 * 
 * For keycodes = [78, 73, 67, 69, 32, 65, 78, 68, 32, 83, 73, 77, 80, 76, 69],
 * the output should be textDisplay(keycodes) = "nice and simple".
 * 
 * For keycodes = [72, 69, 89, 32, 89, 79, 85, 32, 68, 73, 68, 32, 73, 84,
 * 32, 87, 82, 79, 78, 71, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37,
 * 37, 37, 37, 37, 188, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39,
 * 46, 46, 8, 8, 46, 46, 8], the output should be textDisplay(keycodes) =
 * "hey, you did it".
 * 
 * NOTE: For the sake of simplicity, we won't be using the shift key, but you
 * can expect the tests to include backspace, delete, home, end, and the left &
 * right arrow keys, in addition to alphanumeric characters and punctuation.
 * 
 * You can use this reference page or this cool app to look up key codes.
 * https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
 * http://keycode.info/
 */
// letters & numbers (no capitals)
const alphaNum = '48-0;49-1;50-2;51-3;52-4;53-5;54-6;55-7;56-8;57-9;' +
    '65-a;66-b;67-c;68-d;69-e;70-f;71-g;72-h;73-i;74-j;75-k;76-l;' +
    '77-m;78-n;79-o;80-p;81-q;82-r;83-s;84-t;85-u;86-v;87-w;88-x;' +
    '89-y;90-z;32- ;';
// Note: these are without using Shift
const specialChars = '186-;;187-=;188-,;189--;190-.;191-\;192-`;' +
  '219-[;220-/;221-];222-\';';

// adds a new addition to a string, at index (from right)
add = (str, addition, fromRight) => 
    str.substr(0, str.length - fromRight) +
    addition + str.substr(str.length - fromRight);

// deletes a character from a string at index (from right)
del = (str, fromRight) =>
    str.substr(0, str.length - fromRight - 1) +
    str.substr(str.length - fromRight);

// main function
function textDisplay(keycodes) {
    let msg = '', fromRight = 0;
    // loop through keycodes
    for (let c of keycodes) {
        // alphanumeric (note: 58 - 64 are not used) + space
        if (c == 32 || (c >= 48 && c <= 57) || (c >= 65 && c <= 90)) {
            // Get character
            const char = alphaNum.substr(
                alphaNum.indexOf(c) + 3, // add 3 to move past '-'
                1 // length = 1 b/c we're only getting 1 character
            );
            // add to msg
            msg = add(msg, char, fromRight);
        }
        
        // special characters
        else if ((c >= 186 && c <= 192) || (c >= 219 && c <= 222)) {
            // Get character
            const char = specialChars.substr(
                specialChars.indexOf(c) + 4,
                1
            );
            // add to msg
            msg = add(msg, char, fromRight);
        }
        
        // handle final specific cases
        else {
            switch(c) {
                case 8: // backspace
                    msg = del(msg, fromRight);
                    break;
                    
                case 46: // delete from right side
                    msg = del(msg, fromRight - 1);
                    // cursor moves right 1
                    fromRight -= fromRight == 0 ? 0 : 1; 
                    break;
                    
                case 37: // left arrow key
                    fromRight += fromRight >= msg.length ? 0 : 1;
                    break;
                case 39: // right arrow key
                    fromRight -= fromRight > 0 ? 1 : 0;
                    break;
                    
                case 35: // end key
                    fromRight = 0;
                    break;
                case 36: // home key
                    fromRight = msg.length;
                    break;
                    
                default:
                    console.log(`code <$c{}>`)
            }
        }
    }
    return msg;
}
