module.exports.questionsData = [
	{
		no: 1,
		title: "Alphabet Extraction Program",
		difficultyLevel: "Easy",
		description:
			"Given a string S that contains alphabets that are uppercase, lowercase, numbers, special characters, and symbols, write a program to extract only the alphabets and display it ",
		sampleInput:
			"Hello! This is a 1234 long string with special characters *&^%$#@!",
		sampleOutput: "HelloThisisalongstringwithspecialcharacters",
		explanation:
			"The given string has spaces, numbers, and special characters. On removing the unwanted characters, we get the final output as ‘HelloThisisalongstringwithspecialcharacters’",
		constrains: `S[length]<=100.
S contains space, uppercase, lowercase, numbers, symbols, and special characters
`,
		inputFormat: "String",
		outputFormat: "String",
		hiddenTestCase: [
			{
				input: "$%8 *#R0_0* !^-^! [%A7] &&B$$",
				output: "RAB",
			},
			{
				input: "H23E** L%%L#@_O",
				output: "HELLO",
			},
			{
				input: "**@a$^@(*nb(()&32hjsd*(239{“(*#@",
				output: "anbhjsd",
			},
			{
				input: "B &*21)&)&u &*$(*v(&*$# a*@$ n{{{$",
				output: "Buvan",
			},
			{
				input: "#()!$(%b$)#79{“}a*&$307t9992{{@75",
				output: "bat",
			},
		],
		finalOutput: "RAB",
	},
	{
		no: 2,
		title: "Binary-to-Character Decoder",
		difficultyLevel: "Easy",
		description:
			"You are provided with two binary inputs. Write a program to convert the binary numbers into ASCII values. Further, convert the ASCII values to their respective characters, concatenate the characters, and print them",
		sampleInput: "01010100 01001111",
		sampleOutput: "TO",
		explanation:
			"On converting the binary 01010100 to ASCII, we get 084. Similarly, on converting 01001111 to ASCII, we get 079. On converting ASCII values 084 and 079, we get “T” and “O” respectively. Concatenate T and O to display “TO”",
		constrains: `The two binary inputs consist of only binary digits (0 or 1).
binaryInput1[length]==8.
binaryInput2[length]==8
`,
		inputFormat: "Both the binary inputs are separated by a space.",
		outputFormat: "String",
		hiddenTestCase: [
			{
				input: "01001110 01000101",
				output: "NE",
			},
			{
				input: "01010011 01001111",
				output: "SO",
			},
			{
				input: "01001111 01001011",
				output: "OK",
			},
			{
				input: "01001101 01000101",
				output: "ME",
			},
			{
				input: "01010111 01000101",
				output: "WE",
			},
		],
		finalOutput: "NE",
	},
	{
		no: 3,
		title: "Oddity of Symmetrical String",
		difficultyLevel: "Easy",
		description:
			"You will be provided with a string S as an input. Process the string and return the middle character if the string is an odd palindrome. Else return -1",
		sampleInput: "MALAYALAM",
		sampleOutput: "Y",
		explanation:
			"The length of the input string is 9. Malayalam is a palindrome string. Hence, the program returns the middle character ‘Y’",
		constrains: `1 <= S[length] <= 20
Length of S of can be even or odd.
S contains only both uppercase and lowercase alphabets
`,
		inputFormat: "String",
		outputFormat: "Character or -1",
		hiddenTestCase: [
			{
				input: "MALAVALAM",
				output: "V",
			},
			{
				input: "ABBA",
				output: "-1",
			},
			{
				input: "level",
				output: "v",
			},
			{
				input: "something",
				output: "-1",
			},
			{
				input: "racecar",
				output: "e",
			},
		],
		finalOutput: "V",
	},
	{
		no: 4,
		title: "Letter Vanisher",
		difficultyLevel: "Hard",
		description: `You are given a word W and a positive integer value R. You need to perform a "remove" operation on word W as follows: Find a subset M of length R within word W. The subset M must consist of the same letter repeated R times. Remove this subset M from the word W.
    After removing subset M, concatenate the remaining portions of the word W on its left side and right side.
    
    Repeat the "remove" operation until there are no more subsets M of length R that satisfy the conditions.
    
    Return the final string after all the blasting operations have been done
    `,
		sampleInput: "ababbaaab 3",
		sampleOutput: "aba",
		explanation:
			"Given, the string 'ababbaaab' and an integer 3, we have removed a subset of length 3 consisting of the same letters, so we remove ‘aaa’ from the string and it becomes 'ababbb' then again we perform the remove operation removing 'bbb' as it satisfies condition then string becomes 'aba'.As we cannot find any string consisting of the same letters of length R we return 'aba'",
		constrains: `5<=W[length]<=20.
    1<=R<=5`,
		inputFormat: " A String and an Integer are space separated",
		outputFormat: "String",
		hiddenTestCase: [
			{
				input: "IIBBICCCCTTTBBY 2",
				output: "ITY",
			},
			{
				input: " CAAABBBAACDDDD 2",
				output: "CABC",
			},
			{
				input: "ANNAPALLIKOOKIM 2",
				output: "PAM",
			},
			{
				input: "BBBACDDDCCEFFEEEF 3",
				output: "AE",
			},
			{
				input: "AABBBCCDEF 2",
				output: "BDEF",
			},
		],
		finalOutput: "ITY",
	},
	{
		no: 5,
		title: "Frequently occurring substring",
		difficultyLevel: "Medium",
		description:
			"Given an input string S. Generate all possible substrings of length 2 from the input string S. A substring is a contiguous sequence of characters within the original string. Find and return the frequently occurring substring ",
		sampleInput: "abkduvabpuvjkmuv",
		sampleOutput: "uv",
		explanation:
			"In the given string S the substring ‘uv’ of length 2 occurs 3 times and the substring ‘ab’ of length 2 occurs 2 times. Hence we return the sub-string with maximum frequency. In this case ‘uv’ is displayed",
		constrains: `10<=S[length]<=50
`,
		inputFormat: "String",
		outputFormat: "String of length 2",
		hiddenTestCase: [
			{
				input: "abcdulfghuljkmul",
				output: "ul",
			},
			{
				input: "heabchexyzhehe",
				output: "he",
			},
			{
				input: "onafteranyesterday",
				output: "te",
			},
			{
				input: "mynamemyfriendmybook",
				output: "my",
			},
			{
				input: "OKabcOKhelloxyz",
				output: "OK",
			},
		],
		finalOutput: "UL",
	},
	{
		no: 6,
		title: "Longest Common Substring Finder",
		difficultyLevel: "Medium",
		description:
			"Given an integer N, get an input array that contains N strings separated by space. Write a program to find and return the longest common sub-string. Assuming that the set of strings has at least one character in common",
		sampleInput: "3\napple ape april",
		sampleOutput: "ap",
		explanation:
			"The given string has spaces, numbers, and special characters. On removing the unwanted characters, we get the final output as ‘HelloThisisalongstringwithspecialcharacters’",
		constrains: `2<=N<=10.
3<=String[length]<=10`,
		inputFormat: `Integer N.
Array - contains N strings separated by space.
`,
		outputFormat: "String",
		hiddenTestCase: [
			{
				input: "4\nsmile civil oil chill",
				output: "il",
			},
			{
				input: "3\nrock chalk hawk",
				output: "k",
			},
			{
				input: "4\ntech mech bech check",
				output: "ch",
			},
			{
				input: "3\nface place race",
				output: "ace",
			},
			{
				input: "3\nlove dove glove",
				output: "ove",
			},
		],
		finalOutput: "IL",
	},
];
