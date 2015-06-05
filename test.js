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
    for (i = 0; i < res.length; i++){
      var obj = {};
      obj[res[i]["number"]] = res[i]["created_at"];
      issues.push(obj);
    };
    console.log(issues);
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
