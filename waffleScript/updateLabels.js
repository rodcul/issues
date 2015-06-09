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
	if (err) {console.log(JSON.stringify(err))};
	updateIssues(res);
	console.log("Updated " + issuesCount + " issues");
});


function updateIssues(issues){

issues.forEach(function(issue){
		var date = new Date(issue.created_at);
		var hoursAgo = hoursBetween(date);
		updateLabel(issue.number, hoursAgo);
		issuesCount += 1;
	});

};


function updateLabel (issueNumber, hoursOld) {

	if (hoursOld >= 2) {

		var label = hoursOld < 6 ? "2h" : "6h";

		github.issues.edit({
			user: githubUser,
			repo: githubRepo,
			number: issueNumber,
			labels: [label]
		}, function(err, res) {
			if (err) {console.log(JSON.stringify(err))};
		});
	}
};


function hoursBetween (date) {
	var one_hour = 1000 * 60 * 60;

	var today = new Date();
	var difference_ms = today - date;
	return Math.round(difference_ms / one_hour);
}
