var token = "";

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
    console.log(JSON.stringify(res));
});

// github.issues.edit({
//     user: "rodcul",
//     repo: "issues",
//     number: 14,
//     labels: ["wf-2h"]
// }, function(err, res) {
//     console.log(JSON.stringify(err));
//     console.log(JSON.stringify(res));
// });
