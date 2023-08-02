export const questionsData1 = [
	{
		no: 1,
		title: "Oddity of Symmetrical String",
		difficultyLevel: "Easy",
		description:
			"You will be provided with a string as an input whose length is odd. Process the string and return the middle character if the string is an odd palindrome, Else print -1",
		sampleInput: "MALAYALAM",
		sampleOutput: "Y",
		explanation:
			"The length of the input string is 9. Malayalam is a palindrome string. Hence, the program returns the middle character ‘Y’",
		constrains: `1 <= s[length] <= 104.
1 <= words[length] <= 5000.
1 <= words[i][length] <= 30.
s and words[i] consist of lowercase English letters`,
		inputFormat:
			"The first line contains a single integer, the number of rows and columns in the square matrix .Each of the next  lines describes a row, and consists of  space-separated integers .",
		outputFormat: "A single character.",
	},
];

export const questionsData = [
	{
		no: 1,
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
	},
	{
		no: 3,
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
	},
	{
		no: 4,
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
			"In the given string S the substring ‘uv’ of length 2 occurs 3 times. Hence we return the sub-string with maximum frequency. In this case ‘uv’ is displayed",
		constrains: `10<=S[length]<=50
`,
		inputFormat: "String",
		outputFormat: "String",
	},
	{
		no: 6,
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
			"Given, the string 'ababbaaab' and integer 3, we remove all subsets of length 3 with the same letters. We remove ‘aaa’ from the string and it becomes 'ababbb'. Again we remove 'bbb' and the string becomes 'aba'. Now we do not have string consisting of the same letters of length 3 we return 'aba'",
		constrains: `5<=W[length]<=20.
    1<=R<=5`,
		inputFormat: " A String and an Integer are space separated.",
		outputFormat: "String",
	},
];
