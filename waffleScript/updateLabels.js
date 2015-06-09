var token = process.env.GITHUB_API;
var githubUser = process.env.USER;
var githubRepo = process.env.REPO;

var GitHubApi = require("github");

var github = new GitHubApi({
	version: "3.0.0",
});

var labelCount = 0;
var issuesCount = 0;


github.authenticate({
	type: "oauth",
	token: token
});


github.issues.repoIssues({
	user: githubUser,
	repo: githubRepo,
	state: "open"
}, function(err, res) {
	updateIssues(res);
	console.log("Updated " + issuesCount + " issues");
});


function updateIssues(issues){
	for (i = 0; i < issues.length; i++) {
		var date = new Date(issues[i]["created_at"]);
		var hoursAgo = hoursBetween(date);
		var issue = issues[i]["number"];
		updateLabel(issue, hoursAgo);
		issuesCount += 1;
	};
};


function hoursBetween (date) {
	var one_hour = 1000 * 60 * 60;

	var today = new Date();
	var difference_ms = today - date;
	return Math.round(difference_ms / one_hour);
}


var updateLabel = function(issueNumber, hoursOld) {

	if (hoursOld >= 2) {

		var label = hoursOld < 6 ? "2h" : "6h";

		github.issues.edit({
			user: githubUser,
			repo: githubRepo,
			number: issueNumber,
			labels: [label]
		}, function(err, res) {
			// console.log(JSON.stringify(err));
		});
	}

};
