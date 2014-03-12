describe("Markup Calculator", function () {
  var job, calculator;

  calculator = new Calculator();
  beforeEach(function () {
    job = {
        basePrice : "$0.00",
        people : "0 people",
        material : ""
    }
  });

  describe("getFinalCost(), assuming we have no people and no special materials (flat markup)", function () {

    it("should return $0.00 if the base price is $0.00", function () {
      expect(calculator.getFinalCost(job)).toEqual("$0.00");
    });

    it("should apply a 5% markup on the base price of $1.00", function () {
      job.basePrice = "$1.00";
      expect(calculator.getFinalCost(job)).toEqual("$1.05");
    });

    it("should apply a 5% markup to $0.55 and round up to the nearest penny", function () {
      job.basePrice = "$0.55";
      expect(calculator.getFinalCost(job)).toEqual("$0.58");
    });

    it("should apply a 5% markup to $0.01 and not need to round up", function () {
      job.basePrice = "$0.01";
      expect(calculator.getFinalCost(job)).toEqual("$0.01");
    });

  });

  describe("getFinalCost(), assuming we have people working and no special materials", function () {

    it("should apply a 1.2% markup on the basePrice + flat markup, given 1 person", function () {
      job.basePrice = "$100.00";
      job.people = "1 person";
      expect(calculator.getFinalCost(job)).toEqual("$106.26");
    });

    it("should apply a 4.8% markup on the basePrice + flat markup, given 4 people", function () {
      job.basePrice = "$12456.95";
      job.people = "4 people";
      expect(calculator.getFinalCost(job)).toEqual("$13707.63");
    });

    it("books and 4 people: it should only apply a 4.8% person markup on basePrice + flat markup", function () {
      job.basePrice = "$12456.95";
      job.people = "4 people";
      job.material = "books";
      expect(calculator.getFinalCost(job)).toEqual("$13707.63");
    });

  });

  describe("getFinalCost(), assuming we have to deal with special materials and no people", function (){

    beforeEach(function () {
      job.basePrice = "$100.00";
    });

    it("drugs: should apply a 7.5% markup on the basePrice + flat markup", function () {
      job.material = "drugs";
      expect(calculator.getFinalCost(job)).toEqual("$112.88");
    });

    it("food: should apply a 13% markup on the basePrice + flat markup", function () {
      job.material = "food";
      expect(calculator.getFinalCost(job)).toEqual("$118.65");
    });

    it("electronics: should apply a 2% markup on the basePrice + flat markup", function () {
      job.material = "electronics";
      expect(calculator.getFinalCost(job)).toEqual("$107.10");
    });

  });

  describe("getFinalCost(), assuming we have to deal with people working and special materials", function (){

    it("food and 3 people: should apply 13% markup for the food and 3.6% markup for the people on basePrice + flat markup", function () {
      job.basePrice = "$1299.99";
      job.people = "3 people";
      job.material = "food";
      expect(calculator.getFinalCost(job)).toEqual("$1591.58");
    });

    it("drugs and 1 person: should apply 7.5% markup for the drugs and 1.2% markup for the people on basePrice + flat markup", function () {
      job.basePrice = "$5432.00";
      job.people = "1 person";
      job.material = "drugs";
      expect(calculator.getFinalCost(job)).toEqual("$6199.81");
    });
  });
});
