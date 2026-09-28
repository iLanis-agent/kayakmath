/* KayakMath engine - pure functions, no DOM. Honest kayak touring math.
   Constants stated in the UI: honest cruise 2.5 mph loaded, headwind or
   contrary current costs about 0.5 mph per notch, breaks eat 15% of the day,
   0.5 gal of water per paddler per day, 3000 kcal per paddling day, and the
   120-degree rule for cold water. */
var KayakMath = (function () {
  function cruiseMph(baseMph, windNotches, currentMph) {
    return Math.max(0.5, baseMph - windNotches * 0.5 + currentMph);
  }
  function speedVerdict(mph) {
    if (mph >= 3.5) return 'That is brochure speed - fine for an hour, fiction for a day.';
    if (mph >= 2.5) return 'A strong honest cruise - hold it and the miles pile up.';
    if (mph >= 2) return 'Loaded-boat honest - two and change is what the GPS actually says.';
    return 'Grinding - wind, load, or a long day; plan shorter legs.';
  }
  function dayMiles(hoursPaddled, mph) {
    var effective = hoursPaddled * 0.85;
    return effective * mph;
  }
  function dayVerdict(miles) {
    if (miles < 8) return 'A gentle day - campsite by early afternoon, energy for the evening paddle.';
    if (miles <= 16) return 'A solid touring day - 8 to 16 miles is the sweet spot with a loaded boat.';
    if (miles <= 25) return 'A big day - doable, memorable, and paid for in shoulders.';
    return 'Expedition mileage - few people hold this past day two.';
  }
  function tripDays(totalMiles, milesPerDay, weatherDayPer) {
    var paddle = Math.ceil(totalMiles / milesPerDay);
    var weather = Math.floor(paddle / weatherDayPer);
    return { paddleDays: paddle, weatherDays: weather, total: paddle + weather };
  }
  function waterGal(days, paddlers, hotFactor) {
    return days * paddlers * 0.5 * hotFactor;
  }
  function foodKcal(days, paddlers) {
    return days * paddlers * 3000;
  }
  function coldVerdict(airF, waterF) {
    var sum = airF + waterF;
    if (waterF >= 70) return 'Warm water - swim for fun, capsize drill as a game.';
    if (sum >= 120) return 'Over the 120-degree rule - dress for the air but rehearse the wet exit.';
    if (waterF >= 50) return 'Under the 120 rule - wetsuit territory; the water, not the air, is the hazard.';
    return 'Cold water - drysuit or stay near shore; a swim here is an emergency, not an anecdote.';
  }
  function packVerdict(boatLb, gearLb) {
    var total = boatLb + gearLb;
    if (total <= 70) return 'Light rig - car-toppable alone, portage without tears.';
    if (total <= 100) return 'Standard touring load - two-person carries and sensible packing.';
    return 'Heavy - rethink the gear list before the first portage does it for you.';
  }
  return {
    cruiseMph: cruiseMph, speedVerdict: speedVerdict, dayMiles: dayMiles, dayVerdict: dayVerdict,
    tripDays: tripDays, waterGal: waterGal, foodKcal: foodKcal, coldVerdict: coldVerdict, packVerdict: packVerdict
  };
})();
if (typeof module !== 'undefined') module.exports = KayakMath;
