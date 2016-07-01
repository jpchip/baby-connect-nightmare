var Nightmare = require("nightmare");
var Promise = require("promise");

/**
 * @param {string} email
 * @param {string} password
 * @param {string} kidId (eg. 'kid123456')
 * @param {string} type
 * @returns {promise}
 * @todo split out login and kid select logic
 */
module.exports = function (email, password, kidId, type) {
	return new Promise(function (fulfill, reject){
		var babyConnect = new Nightmare()
			.goto("https://www.baby-connect.com/login")
			.wait("#email")
			.type("#email", email)
			.wait(100)
			.type("#pass", password)
			.wait(100)
			.click("#save")
			.wait(5000)
			.click("#" + kidId + "> a")
			.wait(500)
			.click("a[href='javascript:showDiaperDlg()']")
			.wait(500);

		switch(type) {
		case "bm":
			babyConnect = babyConnect.click("#diaper1");
			break;
		case "bmWet":
			babyConnect = babyConnect.click("#diaper2");
			break;
		case "wet":
			babyConnect = babyConnect.click("#diaper3");
			break;
			default:
				reject("Unknown type");
				return;
		}

		babyConnect
		.wait(100)
		.click(".defaultDlgButton")
		.wait(500)
		.end();

		fulfill(babyConnect);
	});
};