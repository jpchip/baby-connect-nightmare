var Nightmare = require("nightmare");
var Promise = require("promise");

/**
 * @param {string} email
 * @param {string} password
 * @param {string} kidId (eg. 'kid123456')
 * @param {string} type
 * @param {number} quantity (in ounces)
 * @returns {promise}
 * @todo split out login and kid select logic
 */
module.exports = function (email, password, kidId, type, quantity) {
	return new Promise(function (fulfill, reject){
		var babyConnect = new Nightmare()
			.goto("https://www.baby-connect.com/login")
			.wait()
			.type("#email", email)
			.wait(100)
			.type("#pass", password)
			.wait(100)
			.click("#save")
			.wait()
			.wait(500)
			.click("#" + kidId)
			.wait(500)
			.click("a[href='javascript:showBibDlg()']")
			.wait(500);

		switch(type) {
		case "milk":
			babyConnect = babyConnect.click("#bibMilk");
			break;
		case "formula":
			babyConnect = babyConnect.click("#bibFormula");
			break;
		default:
			reject("Unknown type");
			return;
		}

		babyConnect
			.click(".defaultDlgButton")
			.wait(500)
			.run(function(err, nightmare) {
				if (err) {
					reject(err);
				} else {
					fulfill(nightmare);
				}
			});
	});
};