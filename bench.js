const Benchmark = require('benchmark');
const uuidv1 = require('uuid/v1');
const uuidv3 = require('uuid/v3');
const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5');

const guid = (function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
})();


var suite = new Benchmark.Suite();

// add tests
suite
  .add("uuid/v1", () => uuidv1())
  .add("uuid/v3", () => uuidv3("hello.example.com", uuidv3.DNS))
  .add("uuid/v4", () => uuidv4())
  .add("uuid/v5", () => uuidv5('hello.example.com', uuidv5.DNS))
  .add("guid", () => guid())
  .on("cycle", function(event) {
    console.log(String(event.target));
  })
  .on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: true });
