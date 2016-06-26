var Nightmare = require('nightmare');
var config = require( "../config.js" );
var Promise = require("promise");

/**
 * @param {string} type
 * @returns {promise}
 * @todo split out login and kid select logic
 */
module.exports = function (type) {
	return new Promise(function (fulfill, reject){
		var babyConnect = new Nightmare()
			.goto('https://www.baby-connect.com/login')
			.wait()
			.type('#email', config.email)
			.type('#pass', config.password)
			//.screenshot('google.png')
			.click('#save')
			.wait()
			.wait(5000)
			.click('#' + config.kidId)
			.wait(500)
			.click("a[href='javascript:showDiaperDlg()']")
			.wait(500)
			.screenshot('diaper.png');

		switch(type) {
			case 'bm':
				babyConnect = babyConnect.click('#diaper1');
				break;
				case 'bmWet':
				babyConnect = babyConnect.click('#diaper2');
			case 'wet':
				babyConnect = babyConnect.click('#diaper3');
		}

		babyConnect
			.click('.defaultDlgButton')
			.run(function(err, nightmare) {
			if (err) {
				reject(err);
			} else {
				fulfill(nightmare);
			}
		});
	});
};