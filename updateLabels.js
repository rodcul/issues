var token = process.env.GITHUB_API;

var GitHubApi = require("github");

var github = new GitHubApi({
	version: "3.0.0",
});


github.authenticate({
	type: "oauth",
	token: token
});


github.issues.repoIssues({
	user: "rodcul",
	repo: "issues",
	state: "open"
}, function(err, res) {
	console.log(JSON.stringify(err));
	var issues = [];
	for (i = 0; i < res.length; i++) {

		var date = new Date(res[i]["created_at"]);
		var hoursAgo = Date.hoursBetween(date);
		var issue = res[i]["number"];
		updateLabel(issue, hoursAgo);
	};
});


Date.hoursBetween = function(date) {
	//Get 1 day in milliseconds
	var one_hour = 1000 * 60 * 60;

	var today = new Date();

	// Convert both dates to milliseconds
	var date1_ms = date.getTime();
	var date2_ms = today.getTime();

	// Calculate the difference in milliseconds
	var difference_ms = date2_ms - date1_ms;

	// Convert back to days and return
	return Math.round(difference_ms / one_hour);
}


var updateLabel = function(issueNumber, hoursOld) {

	if (hoursOld >= 2) {

		var label = hoursOld < 6 ? "wf-2h" : "wf-6h";

		github.issues.edit({
			user: "rodcul",
			repo: "issues",
			number: issueNumber,
			labels: [label]
		}, function(err, res) {
			// console.log(JSON.stringify(err));
		});
	}


};
