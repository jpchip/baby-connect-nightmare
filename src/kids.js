var Nightmare = require("nightmare");
var Promise = require("promise");

/**
 * @param {string} email
 * @param {string} password
 * @returns {promise}
 * @todo split out login logic
 */
module.exports = function (email, password) {
	return new Promise(function (fulfill, reject){
		var foundKids;

		var babyConnect = new Nightmare()
			.goto("https://www.baby-connect.com/login")
			.wait("#email")
			.type("#email", email)
			.wait(100)
			.type("#pass", password)
			.wait(100)
			.click("#save")
			.wait(5000)
			.evaluate(function() {
				var kids = [], kid = {};
				var items = document.querySelectorAll('#kid_select_row li');
				for (var i = 0; i < items.length; ++i) {
					var item = items[i], kid = {};
					if(item.id !== 'kid0') {
						kid.id = item.id;
						kid.name = item.getElementsByTagName("span")[0].innerHTML;
						kids.push(kid);
					}
				}
				return kids;
			})
			.end()
			.then(function(results) {
				console.log(results);
				foundKids = results;
				fulfill(foundKids);
			})
			//catch errors if they happen
			.catch(function(error){
				reject(error);
			});
	});
};