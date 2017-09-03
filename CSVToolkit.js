//
//  CSVToolkit v2.0.0
//  Written by Will Brickner with love <3
//
//  Documentation is in the README.md, or on NPM: https://npmjs.com/package/csv-toolkit
//
//  If you find an issue or have a suggestion to make this package better, please
//  open an issue on this package's Github Repository (https://github.com/wbrickner/CSVToolkit/issues)
//
//  ----------------------------------------------------  
//
//  DISCLAIMER
//
//  THIS SOFTWARE IS PROVIDED "AS IS" AND ANY EXPRESSED 
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, 
//  THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS 
//  FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
//  SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY 
//  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
//  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, 
//  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
//  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
//  AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
//  STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
//  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN 
//  IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//

var fs = require('fs');
module.exports.parse = (string, options, cb) => {
    let rows = string.split(options.rowDelimiter || '\n')
    ,   cols = rows[0].split(options.headerDelimeter || options.fieldDelimiter || ',')
    ,   results = new Array(rows.length);
    
    for (var j = 1, _rows = rows.length; j < _rows; ++j) {
        results[j] = { };
        let items = rows[j].split(options.fieldDelimeter || ',');
        for (var k = 0, klen = items.length; k < klen; ++k) {
            results[j][cols[k]] = items[k];
        }
    }
    results.shift();
    if (typeof cb === "function") {
        cb(null, results);
    } 
}
module.exports.parseFile = (path, options, cb) => {
    fs.readFile(path, (err, csv) => {
        if (err) {
            return cb(err);
        }
        
        if (typeof csv !== "string") 
        	csv = csv.toString();
        }
	    let rows = csv.split(options.rowDelimeter || '\n');
        
        let cols = rows[0].split(options.headerDelimeter || options.fieldDelimiter || ',')
        ,   results = new Array(rows.length);
        
        for (var j = 1, _rows = rows.length; j < _rows; ++j) {
            results[j] = { };
            let items = rows[j].split(options.fieldDelimeter || ',');
            for (var k = 0, klen = items.length; k < klen; ++k) {
                results[j][cols[k]] = items[k];
            }
        }
        results.shift();
        if (typeof cb === "function") {
            cb(null, results);
        } 
    });
}
module.exports.convert = (data, options, cb) => {
    if (!data || !options.fields) {
        if (typeof cb === "function") {
            cb("Invalid arguments: specify data to convert, and fields to include");
        }
        return;
    }
    
    let fields
    ,   fields_length
    ,   data_length = data.length
    ,   rows = new Array(data_length);
    
    if (typeof options.fields === "string") {
        fields = options.fields.split(",");
    } else if (typeof options.fields === "object") {
        fields = options.fields;
    }
    fields_length = fields.length;
    
    for (var j = 0, len = data_length; j < len; ++j) {
        rows[j] = new Array(fields_length);
        for (var k = 0, _len = fields_length; k < _len; ++k) {
            rows[j][k] = data[j][fields[k]];
        }
        rows[j] = rows[j].join();
    }
    
    cb(null, (options.prepend ? options.prepend + (options.rowDelimiter || "\n") : "") + fields.join(options.headerDelimiter || options.fieldDelimiter || ',') + (options.rowDelimiter || "\n") + rows.join(options.rowDelimiter || "\n"))

}
module.exports.write = (path, data, options, cb) => {
    if (!path || !data || !options.fields) {
        if (typeof cb === "function") {
            cb("Invalid arguments: specify destination path, data to convert, and fields to include");
        }
        return;
    }
    
    let fields
    ,   fields_length
    ,   data_length = data.length
    ,   rows = new Array(data_length);
    
    if (typeof options.fields === "string") {
        fields = options.fields.split(",");
    } else if (typeof options.fields === "object") {
        fields = options.fields;
    }
    fields_length = fields.length;
    
    for (var j = 0, len = data_length; j < len; ++j) {
        rows[j] = new Array(fields_length);
        for (var k = 0, _len = fields_length; k < _len; ++k) {
            rows[j][k] = data[j][fields[k]];
        }
        rows[j] = rows[j].join();
    }
    
    let export_string = (options.prepend ? options.prepend + "\n" : "") + fields.join() + "\n" + rows.join("\n");
    fs.writeFile(path, export_string, function (err) {
        if (typeof cb === "function") {
            cb(err);
        }
    });
}
