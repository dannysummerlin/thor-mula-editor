//TODO add missing functions
const functionMap = {
	"BEGINS": [
		"BEGINS(text,compare_text)",
		"Boolean function",
		"Determines if text begins with specific characters and returns TRUE if it does. Returns FALSE if it does not."
	],
	"BLANKVALUE": [
		"BLANKVALUE(expression,substitute_expression)",
		"Boolean function",
		"Determines if an expression has a value and returns a substitute expression if it does not. If the expression has a value, returns the value of the expression."
	],
	"BR": [
		"BR()",
		"Format function",
		"Inserts a line break in a string of text."
	],
	"CASE": [
		"CASE(expression,value1,result1)",
		"Conditional function",
		"Checks a given expression against a series of values. If the expression is equal to a value, returns the corresponding result. If it is not equal to any values, it returns the else_result."
	],
	"CASESAFEID": [
		"CASESAFEID(objectId)",
		"Boolean function",
		"Converts a 15-character ID to a case-insensitive 18-character ID."
	],
	"CEILING": [
		"CEILING(number)",
		"Number function",
		"Rounds a number up to the nearest integer."
	],
	"CONTAINS": [
		"CONTAINS(field,string)",
		"Number function",
		"Compares two arguments of text and returns TRUE if the first argument contains the second argument. If not, returns FALSE."
	],
	"DATE": [
		"DATE(year,month,day)",
		"Date function",
		"Returns a date value from year, month, and day values you enter. "
	],
	"DATEVALUE": [
		"DATEVALUE(expression)",
		"Date function",
		"Returns a date value for a date/time or text expression."
	],
	"DATETIMEVALUE": [
		"DATETIMEVALUE(expression)",
		"Date function",
		"Returns a year, month, day and GMT time value. "
	],
	"DAY": [
		"DAY(date)",
		"Date function",
		"Returns a day of the month in the form of a number between 1 and 31."
	],
	"DISTANCE": [
		"DISTANCE(mylocation1,mylocation2,unit)",
		"Geo function",
		"Calculates the distance between two locations in miles or kilometers."
	],
	"EXP": [
		"EXP(number)",
		"Calculate function",
		"Returns a value for e raised to the power of a number you specify."
	],
	"FIND": [
		"FIND(search_text,field_name)",
		"Text function",
		"Returns the position of a string within a string of text represented as a number."
	],
	"FLOOR": [
		"FLOOR(number)",
		"Calculate function",
		"Returns a number rounded down to the nearest integer."
	],
	"GEOLOCATION": [
		"GEOLOCATION(latitude,longitude)",
		"Geo function",
		"Returns a geolocation based on the provided latitude and longitude. Must be used with the DISTANCE function."
	],
	"GETRECORDIDS": [
		"GETRECORDIDS(object_type)",
		"Geo function",
		"Returns an array of strings in the form of record IDs for the selected records in a list, such as a list view or related list."
	],
	"GETSESSIONID": [
		"GETSESSIONID()",
		"Data function",
		"Returns the user’s session ID."
	],
	"HTMLENCODE": [
		"HTMLENCODE(text)",
		"Format function",
		"Encodes text and merge field values for use in HTML by replacing characters that are reserved in HTML, such as the greater-than sign (>), with HTML entity equivalents, such as &gt;."
	],
	"HYPERLINK": [
		"HYPERLINK(url,friendly_name,target)",
		"Format function",
		"Creates a link to a URL specified that is linkable from the text specified."
	],
	"IF": [
		"IF(logical_test,value_if_true,value_if_false)",
		"Conditional function",
		"Determines if expressions are true or false. Returns a given value if true and another value if false."
	],
	"IMAGE": [
		"IMAGE(image_url,alternate_text,height,width)",
		"Display function",
		"Inserts an image with alternate text and height/width specifications."
	],
	"INCLUDE": [
		"INCLUDE(source,inputs)",
		"Data function",
		"Returns content from an s-control snippet. Use this function to reuse common code in many s-controls."
	],
	"INCLUDES": [
		"INCLUDES(multiselect_picklist_field,text_literal)",
		"Boolean function",
		"Determines if any value selected in a multi-select picklist field equals a text literal you specify."
	],
	"ISBLANK": [
		"ISBLANK(expression)",
		"Boolean function",
		"Determines if an expression has a value and returns TRUE if it does not. If it contains a value, this function returns FALSE."
	],
	"ISCLONE": [
		"ISCLONE()",
		"Boolean function",
		"Checks if the record is a clone of another record and returns TRUE if one item is a clone. Otherwise, returns FALSE."
	],
	"ISNEW": [
		"ISNEW()",
		"Boolean function",
		"Checks if the formula is running during the creation of a new record and returns TRUE if it is. If an existing record is being updated, this function returns FALSE."
	],
	"ISNULL": [
		"ISNULL(field_name)",
		"Boolean function",
		"Determines if an expression is null (blank) and returns TRUE if it is. If it contains a value, this function returns FALSE."
	],
	"ISNUMBER": [
		"ISNUMBER(field_name)",
		"Boolean function",
		"Determines if a text value is a number and returns TRUE if it is. Otherwise, it returns FALSE."
	],
	"JSENCODE": [
		"JSENCODE(text)",
		"Format function",
		"Encodes text and merge field values for use in JavaScript by inserting escape characters, such as a backslash (\\), before unsafe JavaScript characters, such as the apostrophe (')."
	],
	"JSINHTMLENCODE": [
		"JSINHTMLENCODE(text)",
		"Text function",
		"Encodes text and merge field values for use in JavaScript inside HTML tags by replacing characters that are reserved in HTML with HTML entity equivalents and inserting escape characters before unsafe JavaScript characters."
	],
	"JUNCTIONIDLIST": [
		"JUNCTIONIDLIST(id,id2,id3,...)",
		"Data function",
		"A JunctionIDList is a string array of referenced ID values that represent the many-to-many relationship of an underlying junction entity."
	],
	"SUBSTITUTE": [
		"SUBSTITUTE(text,old_text,new_text)",
		"Text function",
		"Substitutes new text for old text in a text string."
	],
	"LEFT": [
		"LEFT(text,num_chars)",
		"Text function",
		"Returns the specified number of characters from the beginning of a text string."
	],
	"LEN": [
		"LEN(text)",
		"Text function",
		"Returns the number of characters in a specified text string."
	],
	"LINKTO": [
		"LINKTO(label,target,id)",
		"Format function",
		"Returns a relative URL in the form of a link (href and anchor tags) for a custom s-control or Salesforce page."
	],
	"LOWER": [
		"LOWER(text)",
		"Text function",
		"Converts all letters in the specified text string to lowercase. Any characters that are not letters are unaffected by this function. Locale rules are applied if a locale is provided."
	],
	"MAX": [
		"SUBSTITUTE(number,number,number,....)",
		"Number function",
		"Returns the highest number from a list of numbers."
	],
	"MID": [
		"MID(text,start_num,num_chars)",
		"Text function",
		"Returns the specified number of characters from the middle of a text string given the starting position."
	],
	"Min": [
		"Min(number,number,number,....)",
		"Number function",
		"Returns the lowest number from a list of numbers."
	],
	"MONTH": [
		"MONTH(date)",
		"Date function",
		"Returns the month, a number between 1 (January) and 12 (December) in number format of a given date."
	],
	"NOW": [
		"NOW()",
		"Date function",
		"Returns a date/time representing the current moment."
	],
	"NULLVALUE": [
		"NULLVALUE(expression,substitute_expression)",
		"Text function",
		"Substitutes new text for old text in a text string."
	],
	"ISPICKVAL": [
		"ISPICKVAL(picklist_field,text_literal)",
		"Boolean function",
		"Determines if the value of a picklist field is equal to a text literal you specify."
	],
	"PRIORVALUE": [
		"PRIORVALUE(field)",
		"Data function",
		"Returns the previous value of a field"
	],
	"REGEX": [
		"REGEX(text,regex_text,new_text)",
		"Text function",
		"	Compares a text field to a regular expression and returns TRUE if there is a match. Otherwise, it returns FALSE. A regular expression is a string used to describe a format of a string according to certain syntax rules."
	]
}
let functionValues = new Array()
Object.keys(functionMap).map((f) => {
	const v = functionMap[f]
	functionValues.push({ label: f + ": " + v[2], value: v[0]})
})