# Calculator Kata

A little calculator for working on my JS and Jasmine chops

### Example Usage

``` js
var job = {
  basePrice : "$100.00",
  people : "3 people",
  material : "food"
};

var calc = new Calculator();

alert(calc.getFinalCost(job));
```

### Custom Markup Values

``` js
var calc = new Calculator({
  flat : 0.05, // flat markup percentage. 0.05 is default
  person : 0.012, //per person markup percentage.  0.012 is default
  material : { // key/value pair for special materials and their respective markup percentages
    "drugs" : 0.075,
    "food" : 0.013,
    "electronics" : 0.02
  } 
});
```
