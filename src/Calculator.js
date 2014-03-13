(function () {

  "use strict";

  function Calculator(markupValues) {
    var i;

    this.markup = {
      flat : 0.05,
      person : 0.012,
      material : {
        "drugs" : 0.075,
        "food" : 0.13,
        "electronics" : 0.02
      }
    }

    for (i in markupValues) {
      this.markup[i] = markupValues[i]
    }

  };

  Calculator.prototype.getFinalCost = function (job) {
    var finalCost, parsedJob;

    if (job.basePrice === "$0.00") {
      return job.basePrice;
    }

    this._subTotal = 0.00;
    this._peopleMarkup = 0.00;
    this._materialMarkup = 0.00;

    parsedJob = this._parseJob(job);

    this._applyFlatMarkup(parsedJob.basePrice);
    this._applyPeopleMarkup(parsedJob.people);
    this._applyMaterialMarkup(parsedJob.material);

    finalCost = this._subTotal + this._peopleMarkup + this._materialMarkup;

    return '$' + this._roundToNearestPenny(finalCost);
  };

  Calculator.prototype._applyFlatMarkup = function (basePrice) {
    var markedUpPrice;

    markedUpPrice = basePrice * (1 + this.markup.flat);

    this._subTotal = markedUpPrice;
  };

  Calculator.prototype._applyPeopleMarkup = function (people) {
    var markupPercentageTotal;

    markupPercentageTotal = this.markup.person * people;

    this._peopleMarkup = this._subTotal * markupPercentageTotal;
  };

  Calculator.prototype._applyMaterialMarkup = function (material) {
    var markupPercentage;

    if (!(material in this.markup.material)) return;

    markupPercentage = this.markup.material[material];

    this._materialMarkup = this._subTotal * markupPercentage;
  };

  Calculator.prototype._roundToNearestPenny = function (price) {
    return (Math.round(price * 100)/100).toFixed(2);
  };

  Calculator.prototype._parseJob = function (job) {
    var parsedJob;

    parsedJob = {
      basePrice : parseFloat(job.basePrice.replace('$', '')),
      people : parseInt(job.people.replace(/person|people/, ''), 10),
      material : job.material
    };

    return parsedJob;
  };

  window.Calculator = Calculator;
}());
