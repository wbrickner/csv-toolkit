# CSVToolkit

Parse and write CSV files efficiently with an intuitive API.

# Installation

```shell
$ npm install csv-toolkit
```

# Quick Start

### Parsing CSV files

Let's say you have a CSV file, `data.csv`, with this structure:

```
Name,Ranking,Height
Jason,110,1.65
Derek,55,1.45
Anne,63,1.34
```
Parsing the CSV file:

```
const CSVToolkit = require("csv-toolkit")

CSVToolkit.parseFile("./data.csv"))
          .then(data => console.log("Player #0 rank:", data[0].Ranking))

```

### Writing CSV files
CSVToolkit enables you to convert arrays of JavaScript objects into CSV files with a reasonable degree of flexibility.

```
const CSVToolkit = require("csv-toolkit")

const myData = [
  {
    name: "Will",
    language: "JavaScript",
    "Favorite Color": "Teal"
  },
  {
    name: "Derek",
    language: "English",
    "Favorite Color": "Blue"
  }
]

// write our data to disk as a CSV
CSVToolkit.serializeAndWrite("./ouput.csv", {
    fields: [ "language", "name" ]
}).then((csvString) => console.log("CSV saved! Great job!"))

```

This would output the following CSV:

```
language,name
JavaScript,Will
English,Derek
```

# Documentation

### CSVToolkit.parse(`string`,`options?`)

**Parameters**

`string` a CSV string from which data will be extracted,

`options` is an (optional) object which allows you to specify the delimiting strings: 

```
{
  fieldDelimiter: (String, this string seperates values in the CSV; Default: ","),
  rowDelimiter: (String, this string seperates rows in the CSV; Default: "\n"),
  headerDelimiter: (String, this string seperates header/column names in the CSV; Default: ",")
}
``` 

Note: if you specify `fieldDelimiter` this value will also be used for the `headerDelimiter` if the `headerDelimiter` has not been specified.

**Returns**: an `array` of row objects.


### CSVToolkit.parseFile(`path`,`options?`)

`path` path from which the CSV will be read,

`options` is an (optional) object which allows you to specify the delimiting strings: 


```
{
  fieldDelimiter: (String, this string seperates values in the CSV; Default: ','),
  rowDelimiter: (String, this string seperates rows in the CSV; Default: '\n'),
  headerDelimiter: (String, this string seperates header/column names in the CSV; Default: ','),
}
```

Note: if you specify `fieldDelimiter` this value will also be used for the `headerDelimiter` if the `headerDelimiter` has not been specified.

**Returns**: a `promise` which resolves to an `array` of row objects.

### CSVToolkit.serialize(`data`,`options?`)

`data` the object to be converted,

`options` an (optional) object used to control the string output:

```
{
  prepend: (String, prepend this string to the output),
  fields: (String (comma seperated) or Array, a list of fields, order is preserved),
  
  fieldDelimiter: (String, this string seperates values in the CSV; Default: ","),
  rowDelimiter: (String, this string seperates rows in the CSV; Default: "\n"),
  headerDelimiter: (String, this string seperates header/column names in the CSV; Default: ",")
}
```

Note: if you specify `fieldDelimiter` this value will also be used for the `headerDelimiter` if the `headerDelimiter` has not been specified.

**Returns**: a csv string, or an `Error` if serialization fails.

### CSVToolkit.serializeAndWrite(`data`,`outputPath`,`options?`)

`data` the array of rows to be converted and written to CSV

`outputPath` path to which the CSV will be written

`options` an (optional) object used to control the CSV output file:

```
{
  prepend: (String, prepend this string to the CSV file),
  fields:  (A comma-delimited String, or an Array. A list of fields, order is preserved),
  
  fieldDelimiter: (String, this string seperates values in the CSV; Default: ","),
  rowDelimiter: (String, this string seperates rows in the CSV; Default: "\n"),
  headerDelimiter: (String, this string seperates header/column names in the CSV; Default: ",")
}
```


Note: if you specify `fieldDelimiter` this value will also be used for the `headerDelimiter` if the `headerDelimiter` has not been specified!

**Returns**: a promise which resolves after the file has been written, with the csv string.

# Bug Reports, Improvements

Please open a new *issue* on this package's [GitHub Repository Issue Page](https://github.com/wbrickner/csv-toolkit/issues).

# License
This package uses the `ISC License`.  

If this package saved you time, money, or effort, please consider adding somewhere `Thanks to Will Brickner for CSVToolkit`.  **I worked hard on it and gave it to you for free.**

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
