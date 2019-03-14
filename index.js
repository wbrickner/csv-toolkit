//
//  CSVToolkit v3.0.0
//  Written by Will Brickner with love <3
//
//  Documentation is in the README.md, or on NPM: https://npmjs.com/package/csv-toolkit
//
//  If you find an issue or have a suggestion to make this package better, please
//  open an issue on this package's Github Repository (https://github.com/wbrickner/csv-toolkit/issues)
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

const fs = require("fs")

function splitFields(fields) {
    if (typeof fields === "string") {
        return fields.split(",")
    } else if (typeof fields === "object") {
        return fields
    }
}

module.exports = {
    parse: function parse(string, options = {}) {
        const rows = string.split(options.rowDelimiter || "\n")
        ,     cols = rows[0].split(options.headerDelimiter || options.fieldDelimiter || ",")
        ,     results = new Array(rows.length)
        
        for (var j = 1, rowCount = rows.length; j < rowCount; ++j) {
            results[j] = { }
            let items = rows[j].split(options.fieldDelimiter || ",");
            for (var k = 0, klen = items.length; k < klen; ++k) {
                results[j][cols[k]] = items[k]
            }
        }
        results.shift()

        return results
    },

    parseFile: function parseFile(path, options) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, csv) => {
                if (err) { return reject(err) }
                
                resolve(this.parse(csv + "", options))
            })
        })
    },

    serialize: function serialize(data, options) {
        if (!data || !options.fields) {
            return new Error("Invalid arguments: specify data to convert, and fields to include")
        }
        
        const dataLength = data.length
        ,     rows = new Array(dataLength)
        ,     fields = splitFields(options.fields)
        ,     fieldsLength = fields.length
        
        for (var j = 0; j < dataLength; ++j) {
            rows[j] = new Array(fieldsLength)
            for (var k = 0; k < fieldsLength; ++k) {
                rows[j][k] = data[j][fields[k]]
            }
            rows[j] = rows[j].join(options.fieldDelimiter)
        }
        
        return (
            (options.prepend ? options.prepend + (options.rowDelimiter || "\n") : "") + 
            fields.join(options.headerDelimiter || options.fieldDelimiter || ",") + (options.rowDelimiter || "\n") + 
            rows.join(options.rowDelimiter || "\n")
        )
    },

    serializeAndWrite: function serializeAndWrite(data, outputPath, options = {}) {
        const csv = this.serialize(data, options)

        return new Promise((resolve, reject) => {
            fs.writeFile(outputPath, csv, (err) => {
                if (err) { return reject(err) }
                resolve(csv)
            })
        })
    }
}
