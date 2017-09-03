#CSVToolkit
Parse and write CSV files efficiently with an intuitive API.

## Parsing CSV files
Let's say you have a CSV called `data.csv`, with this structure:

```
Player's Name,Player's Ranking,Player's Height
Jason,110,1.65
Derek,55,1.45
Anne,63,1.34
```

How would I deal with this in Javascript?  With CSVToolkit, it's simple!

```
var CSVToolkit = require('csv-toolkit');

CSVToolkit.parseFile('./data.csv', {}, (data) => {
	console.log("Rank of player #0: ", data[0]["Player's Ranking"]);
});
```

Which would provide the following output: 

```
Rank of player #0: 110
```

## Writing CSV files
CSVToolkit enables you to convert arrays of JavaScript objects into CSV files with a reasonable degree of flexibility.

```
var CSVToolkit = require('csv-toolkit');

// Make up some data
var myData = [
	{
		"Name": "Will",
		"Language": "JavaScript",
		"Favorite Color": "Teal"
	},
	{
		"Name": "Derek",
		"Language": "English",
		"Favorite Color": "Blue"
	}
]

// Write this data to a CSV
CSVToolkit.write('./my-data-ouput.csv', {
	fields: "Language,Name,Favorite Color"
}, (err) => {
	if (err) {
		return console.error("Uh oh, an error occured: ", err);
	}
	console.log("CSV saved!  Great job!");
});
```

This would output the following CSV:

```
Language,Name,Favorite Color
JavaScript,Will,Teal
English,Derek,Blue
```

# Documentation

### CSVToolkit.parse(`string`,`options`,`callback`)
*Converts a CSV string to an intuitive JavaScript representation*

`string` a CSV string from which data will be extracted,
`options` is an object which allows you to specify the delimiting strings: 

```
{
    fieldDelimiter: (String, this string seperates values in the CSV; Default: ','),
    rowDelimiter: (String, this string seperates rows in the CSV; Default: '\n'),
    headerDelimiter: (String, this string seperates header/column names in the CSV; Default: ','),
}
``` 

Note: if you specify `fieldDelimiter` this value will also be used for the `headerDelimiter` if the `headerDelimiter` has not been specified!

`callback` is a function with signature (`error`,`data`). (Here `error` is an error if one occurs, and `data` is the JavaScript object containing the data extracted from the CSV)

### CSVToolkit.parseFile(`path`,`options`,`callback`)
*Converts a CSV file on disk to an intuitive JavaScript representation*

`path` path from which the CSV will be read,
`options` is an object which allows you to specify the delimiting strings: 


```
{
    fieldDelimiter: (String, this string seperates values in the CSV; Default: ','),
    rowDelimiter: (String, this string seperates rows in the CSV; Default: '\n'),
    headerDelimiter: (String, this string seperates header/column names in the CSV; Default: ','),
}
```

Note: if you specify `fieldDelimiter` this value will also be used for the `headerDelimiter` if the `headerDelimiter` has not been specified!

`callback` is a function with signature (`error`,`data`). (Here `error` is an error if one occurs, and `data` is the JavaScript object containing the data extracted from the CSV)

### CSVToolkit.convert(`data`,`options`,`callback`)
*Converts properly structured data to a CSV string*

`data` the object to be converted and passed to `callback` as a string

`options` an object used to control the string output:

```
{
	prepend: (String, prepend this string to the output),
	fields: (String (comma seperated) or Array, a list of fields, order is preserved),
	
	fieldDelimiter: (String, this string seperates values in the CSV; Default: ','),
	rowDelimiter: (String, this string seperates rows in the CSV; Default: '\n'),
	headerDelimiter: (String, this string seperates header/column names in the CSV; Default: ',')
}
```

Note: if you specify `fieldDelimiter` this value will also be used for the `headerDelimiter` if the `headerDelimiter` has not been specified!

### CSVToolkit.write(`path`,`data`,`options`,`callback`)
*Converts properly structured data to a CSV string and writes it to disk*

`path` path to which the CSV will be written

`data` the object to be converted and written to CSV

`options` an object used to control the CSV output file:

```
{    
	prepend: (String, prepend this string to the CSV file),
	fields:  (String (comma seperated) or Array, a list of fields, order is preserved),
	
	fieldDelimiter: (String, this string seperates values in the CSV; Default: ','),
	rowDelimiter: (String, this string seperates rows in the CSV; Default: '\n'),
	headerDelimiter: (String, this string seperates header/column names in the CSV; Default: ',')
}
```


Note: if you specify `fieldDelimiter` this value will also be used for the `headerDelimiter` if the `headerDelimiter` has not been specified!

`callback` is a function with signature (`error`)

# Bug Reports, Improvements
Please open a new *issue* on this package's [GitHub Repository](https://github.com/wbrickner/CSVToolkit) (Issues: https://github.com/wbrickner/CSVToolkit/issues)

# License
This package uses the `ISC License`.  

If this package saved you time, money, or effort, please consider adding somewhere `Thanks to Will Brickner for CSVToolkit`.  **I worked hard on it and gave it to you for free <3.**

# DISCLAIMER

THIS SOFTWARE IS PROVIDED "AS IS" AND ANY EXPRESSED 
OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, 
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS 
FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY 
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, 
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN 
IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
