function userInfoHTML(user) {
    console.info(user);
    return `<h2>${user.name}
        <span class="small-name">
            (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
        </span>
    </h2>
    <div class="gh-content">
        <div class="gh-avatar">
            <a href="${user.html_url}" target="_blank">
                <img src=${user.avatar_url}" width="80" height="80" alt="${user.login}" />
            </a>
        </div>
        <p>Followers: ${user.followers} - Following ${user.following} 
        <br> Repos: ${user.public_repos}</p>
    </div>`;
}

function repoInfoHTML(repos) {
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }

    var listItemsHTML = repos.map(function(repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`;
}
 
/*Client ID
    8a05f7492e0c0d6c92e2
Client Secret
    c49aff84b80e852010d3db77a67d36e9657ccb35*/

function fetchGithubInfo(event) {
    $("#githubUserData").html("");
    $("#githubRepoData").html("");
    var username = $("#githubUserName").val();
    if (!username) {
        $("#githubUserData").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }
    
    $("#githubUserData").html(`<div id="loader">
                                <img src="assets/img/loader.gif" alt="loading..." />
                            </div>`);

    $.when(
      $.getJSON(`https://api.github.com/users/${username}`),
      $.getJSON(`https://api.github.com/users/${username}/repos`)
      ).then(
          function(firstResponse, secondResponse) {
              var userData = firstResponse[0];
              var repoData = secondResponse[0];
              $("#githubUserData").html(userInfoHTML(userData));
              $("#githubRepoData").html(repoInfoHTML(repoData));
          },  function(errorResponse) {
              if(errorResponse.status === 404) {
                  $("#githubUserData").html(
                      `<h2>No info found for user ${username}</h2>`);
              } else if (errorResponse.status === 403) {
                  var resetTime = new Date(errorResponse.getResponseHeader('X-RateLmit-Reset')*1000);
                  $("#githubUserData").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`)
              } else {
                  console.log(errorResponse);
                  $("#githubUserData").html(
                      `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
              }
          });
}

$(document).ready(fetchGithubInfo);