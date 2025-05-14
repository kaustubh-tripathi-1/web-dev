//- Literal string match - /pattern/
/* const stringToSearch = "Waldo is hiding somewhere here in this text";
const waldoRegex = /Waldo/; // Case sensitive exact/literal match
console.log(waldoRegex.test(stringToSearch)); // true
*/

//- Literal string with different possibilties(p) - /p1|p2|p3/
/* const stringToSearch = "John has a pet cat and dog";
const petRegex = /dog|cat|pet|bird|fish/; // | OR operator
console.log(petRegex.test(stringToSearch)); // true
*/

//- Case Insenstive matching ( ignore case explicitly ) - /pattern/i
/* const stringToSearch = "John has a pet cat and dog";
const petRegexCaseSens = /DOG/; // All Caps
console.log(petRegexCaseSens.test(stringToSearch)); // false as this regex was case sensitive
const petRegexCaseInsens = /DOG/i; // i flag after regex to ignore case
console.log(petRegexCaseInsens.test(stringToSearch)); // true as this regex was case in-sensitive 
*/

//- Extract match(es) in an array - str.match(/pattern/)
/* const extractStr = "Extract the word 'coding', 'coding' from this string";
const codingRegexFirstOccurence = /Coding/i; // case insensitive extraction with i flag
const codingRegexAllOccurences = /Coding/gi; // case insensitive extraction with i flag and all occurences with global g flag
const result1 = extractStr.match(codingRegexFirstOccurence); // Use String.prototype.match with the regex arg. to extract first occurence
console.log(result1);
const result2 = extractStr.match(codingRegexAllOccurences); // Use String.prototype.match with the regex arg. to extract all occurences
console.log(result2);
 */

//- Period wild card for any single character - /char.char/
/* const str =
    "I'll hug you real tight. Let's test this hum. Multiple words starting with hu - HUM, hut, Hunt";
const huRegex = /hu./gi; // . period char in regex represents a single character which can be anything
console.log(str.match(huRegex)); // Returns an array with all the occurences
*/

//- Match single char with multiple possibilties - /char[char(s)]char/
/* const str = "Beware of bugs, big bags and beg";
const bgRegEx = /b[aiu]g/g; // Instead of a dot wildcard to match any single char, we use a set of characters a, i and u only.
console.log(str.match(bgRegEx)); // Logs bug, big and bag, not beg
const vowelRegEx = /[aeiou]/gi;
console.log(str.match(vowelRegEx)); // Logs all extracted vowels
*/

//- Match range of letters in the alphabet - /[range]/
/* const str = "The quick brown fox jumps over a lazy dog.";
const allAlphaRegex = /[a-z]/gi; // All alphabets from a to z with case insensitive match
console.log(str.match(allAlphaRegex));
*/

//- Match numbers and letters in the alphabet - /[range(s)]/
/* const str = "Sample string 129403 49324.321938465 example";
const regex = /[a-h3-6]/gi; // All letters from a-h and 3-6
console.log(str.match(regex));
 */

//- Exclude single characters from the Match - Negated Char sets - /[^range(s)]/
/* const str = "3 blind mice";
const regex = /[^b-e3\s]/gi;  // All letters except b-e, space or whitespaces(\s) and 3
// const regex = new RegExp(/[^b-e3\s]/, "gi"); 
console.log(str.match(regex));
 */

//- Matches 0 or more of the previous character(s) - /char*/
// const str1 = "Goooooooooooooooal";
// const str2 = "gut feeling";
// const str3 = "over the moon";
// const regex = /go*/gi; // 0 or more of 'go' char including ""
// console.log(str1.match(regex)); // Logs ["Gooooooooooooooo"]
// console.log(str2.match(regex)); // Logs ["g", "g"]
// console.log(str3.match(regex)); // Logs null

//- Matches 1 or more of the previous character(s) - /char+/
/* const str = "Difficult spelling - Mississippi";
const regex = /s+/gi; // 1 or more of 's' char
console.log(str.match(regex)); */

//- Greedy and Lazy matches
//$ Greedy (default) - Finds the longest possible part of the string that fits the regex pattern and returns the match

/* const str = "titanic";
const greedyRegex = /t[a-z]*i/g; // 0 or more occurrences of the letters a-z between t and i
console.log(str.match(greedyRegex)); // Logs "titani" as it a greedy and longest possible match 
*/

//$ Lazy (?) - Finds the smallest possible part of the string that fits the regex pattern and returns the match
//* RegEx Default is greedy

/* const lazyRegex = /t[a-z]*?i/g; // 0 or more occurrences of the letters a-z between t and i with a lazy flag ?
console.log(str.match(lazyRegex)); // Logs "ti" as it a lazy and shortest possible match 
*/

/* const str2 = "<h1>Winter is Coming!</h1>";
const greedyRegex2 = /<.*>/; // 0 or more occurrences of any character between < and > with a longest possible match
console.log(str2.match(greedyRegex2)); // Logs the whole "<h1>Winter is Coming!</h1>" as it a greedy and longest possible match 
*/

/* const lazyRegex2 = /<.*?>/g;
console.log(str2.match(lazyRegex2)); // Logs "[ '<h1>', '</h1>' ]" as it a lazy and shortest possible matches
 */

//& Challenge 1
/* const crowd = "P1P2P3P4P5P6CCCP7P8P9";
const reCriminals = /c+/gi;

console.log(crowd.match(reCriminals));
 */

//- Match Beginning String patterns - ^ outside of a charset [] as inside is negation/exclusion[^]
/* const str1 = "Cat and Dog are both animals and pets";
const str2 = "Dog and Cat are both animals and pets";
const catRegex = /^cat/gi;
console.log(catRegex.test(str1)); // true as Cat is at the beginning of the string
console.log(catRegex.test(str2)); // false as Cat is not at the beginning of the string
 */
//- Match Ending String patterns - $
/* const str1 = "Cat and Dog are both animals and pets";
const str2 = "Dog and Cat are both pets and animals";
const catRegex = /pets$/gi;
console.log(catRegex.test(str1)); // true as Cat is at the beginning of the string
console.log(catRegex.test(str2)); // false as Cat is not at the beginning of the string
 */

//- Match character classes with shorthand syntax -
//$ \d - digits (same as  [0-9])
//$ \w - Any word character (letters, digits, underscore) [a-z][A-Z][0-9][_]
//$ \s - Any whitespace (space, tab, etc.)
//$ Capital counterparts \D, \W, \S are negations for excluding the above character classes

/* const str =
    "This is a sample string with words_with_Underscore AND DIGITS like 0 1 2 3 4 5 6 7 8 9";

const wordRegex = /\w/gi; // Every occurrence of any letter, digit and underscore
console.log(str.match(wordRegex)); // Logs everything like letter, digit and underscore

const wordOppRegex = /\W/gi; // Every occurrence of any letter, digit and underscore
console.log(str.match(wordOppRegex)); // Logs everything except letter, digit and underscore

const digitsRegex = /\d/g; // Every occurrence of any digit
console.log(str.match(digitsRegex)); // Logs every digit

const digitsOppRegex = /\D/g; // Every occurrence except any digit
console.log(str.match(digitsOppRegex)); // Logs everything except digits

const whitespaceRegex = /\s/g; // Every occurrence of any whitespace
console.log(str.match(whitespaceRegex)); // Logs every whitespace

const whitespaceOppRegex = /\S/g; // Every occurrence except any whitespace
console.log(str.match(whitespaceOppRegex)); // Logs everything except whitespaces
 */

//& Challenge 2 - Username validation
/* const username = "kaustubh_tripathi123";
const usernameCheckRegex = /^[a-zA-Z_]{2,}\d*$/;
console.log(usernameCheckRegex.test(username));
 */

//- Quantity specifiers or Quantifiers
//$ {n}: Exactly n occurrences
//$ {n,m}: Between n and m occurrences
//$ {n,}: n or more

/* const str1 = "Ohhhh noo!";
const regex1 = /^oh{3,6}\sno/gi; //  Occurrences of h between 3 and 6
console.log(regex1.test(str1));

const str2 = "Timmmber";
const regex2 = /Tim{3}ber/gi; // Exactly 4 occurrences of m
console.log(regex2.test(str2));

const str3 = "Hellllllll yeaaahhhhhhh!";
const regex3 = /Hel{2,}\syea{1,}h+/gi; //  Occurrences of l 2 or more
console.log(regex3.test(str3));
 */

//- Check for 0 or 1 (optional character) - ?
/* const str1 = "favorite";
const str2 = "color";
const regex1 = /favou?rite/i;
const regex2 = /colou?r/i;

console.log(regex1.test(str1));
console.log(regex2.test(str2));
 */

//- Positive and Negative LOOKAHEADS for later in the string
//$ ?= for if it is there later in the string (Positive)
//$ ?! for if it is not there later in the string (Negative)

/* const quit = "qu";
const noQuit = "qt";
const quRegex = /q(?=u)/g;
const qRegex = /q(?!u)/g;

console.log(quRegex.test(quit));
console.log(quit.match(quRegex));
console.log(qRegex.test(noQuit));
console.log(noQuit.match(qRegex));

const samplePassword = "astronaut";
const passRegex = /(?=\w{5,})(?=\D*\d{2,}$)/;
console.log(passRegex.test(samplePassword));
*/

//- Positive and Negative LOOKBEHINDS for earlier in the string
//$ ?<= for if it is there earlier in the string (Positive)
//$ ?<! for if it is not there earlier in the string (Negative)

const quit = "qu";
const noQuit = "qt";
const quRegex = /(?<=u)q/g;
const qRegex = /(?<!u)q/g;

console.log(quRegex.test(quit));
console.log(quit.match(quRegex));
console.log(qRegex.test(noQuit));
console.log(noQuit.match(qRegex));

const samplePassword = "astronaut12";
const passRegex = /(?=\w{5,})(?=\D*\d{2,}$)/;
console.log(passRegex.test(samplePassword));

//- Reuse patterns using Capture groups - to avoid rewriting a group and save space
/* const repeatStr = "regex regex regex";
const repeatRegex = /(\w+)\s\1/; // \1 to repeat (\w+)

console.log(repeatRegex.test(repeatStr));
console.log(repeatStr.match(repeatRegex));
 */

/* const repeatNum = "42 42 42";
const reNumRegex = /^(\d+)\s\1\s\1$/; // Instead of writing (\d+) again and again, we write \1 (for group no. 1), for another group - \2 (for group no. 2)

console.log(reNumRegex.test(repeatNum));
console.log(repeatNum.match(reNumRegex));
 */

//- Search and replace using RegEx and String.prototype.replace
/* const str =
    "This string with dog in it has multiple occurrences of Dog dog dog.";
const regex = /dog/gi; // Without g flag, only 1st occurrence will be replaced
const replacedStr = str.replace(regex, "cat");

console.log(replacedStr);
 */

/* const reStr = "Free Code Camp".replace(/(\w+)\s(\w+)\s(\w+)/, "$3 $2 $1"); // Can't use \1 to repeat group here, $1 and $2 represents the group in RegEx and reorders them
console.log(reStr);
*/

//& Challenge 3 - Remove whitespaces from beginning and the end

/* const str = "     Hello, World!    ";
const regex = /^\s*|\s*$/g;
const reStr = str.replace(regex, "");
console.log(reStr);
console.log(reStr.length); */
