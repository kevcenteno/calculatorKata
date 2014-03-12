(function () {

  "use strict";

  function Calculator() {
    this.baseMarkup = 0.05;
    this.personMarkup = 0.012;
    this.materialMarkup = {
      "drugs" : 0.075,
      "food" : 0.13,
      "electronics" : 0.02
    };

    this._subTotal = 0.00;
    this._peopleMarkup = 0.00;
    this._materialMarkup = 0.00;
 }

  Calculator.prototype.getFinalCost = function (job) {
    var finalCost, parsedJob;

    this._subTotal = 0.00;
    this._peopleMarkup = 0.00;
    this._materialMarkup = 0.00;

    parsedJob = this._parseJob(job);

    this._applyFlatMarkup(parsedJob);
    this._applyPeopleMarkup(parsedJob);
    this._applyMaterialMarkup(parsedJob);

    finalCost = this._subTotal + this._peopleMarkup + this._materialMarkup;
    return '$' + this._roundToNearestPenny(finalCost);
  };

  Calculator.prototype._applyFlatMarkup = function (parsedJob) {
    var markedUpPrice;

    markedUpPrice = parsedJob.basePrice * (1 + this.baseMarkup);

    this._subTotal = markedUpPrice;
  };

  Calculator.prototype._applyPeopleMarkup = function (parsedJob) {
    var markupPercentageTotal;

    markupPercentageTotal = this.personMarkup * parsedJob.people;

    this._peopleMarkup = this._subTotal * markupPercentageTotal;
  };

  Calculator.prototype._applyMaterialMarkup = function (parsedJob) {
    var markupPercentage;

    if (!(parsedJob.material in this.materialMarkup)) return;

    markupPercentage = this.materialMarkup[parsedJob.material];

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
