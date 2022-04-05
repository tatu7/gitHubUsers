const userInput = document.querySelector(".userInput");
const userBox = document.querySelector(".user");
const magic = document.querySelector(".magic");
const repoBox = document.querySelector(".repo");
const repo__title = document.querySelector(".repo__title");

const fetchFunc = async function (user) {
  let dataJson = await fetch(`https://api.github.com/users/${user}`);
  let data = await dataJson.json();
  let repoJson = await fetch(`https://api.github.com/users/${user}/repos`);
  let repos = await repoJson.json();
  renderFunc(data);
  renderRepo(repos);
};
userInput.addEventListener("input", () => {
  fetchFunc(`${userInput.value}`);
});
const renderFunc = (obj) => {
  if (!userInput.value == "") {
    userBox.style.display = "flex";
    magic.style.display = "none";
    let yil = new Date(obj.created_at).getFullYear();
    let oy = String(new Date(obj.created_at).getMonth()).padStart(2, 0);
    let kun = new Date(obj.created_at).getDate();
    userBox.innerHTML = "";
    let user = ` 
  <div class="left">
    <img src="${obj.avatar_url}" alt="" />
    <a target="_blank" href="${obj.html_url}">View Profile</a>
  </div>
  <div class="right">
    <div class="buttons">
      <button class="publicBtn">Public Repos:${obj.public_repos}</button>
      <button class="publicGist">Public Gists:${obj.public_gists}</button>
      <button class="followers">Followers:${obj.followers}</button>
      <button class="following">Following:${obj.following}</button>
    </div>
    <div class="table">
      <p>Company:${obj.company}</p>
      <p>Website/Blog:<a target="_blank" href="${obj.blog}">${obj.blog}</a></p>
      <p>Member Since: ${kun}.${oy}.${yil}</p>
    </div>
</div>`;
    userBox.insertAdjacentHTML("afterbegin", user);
  } else {
    userBox.style.display = "none";
    magic.style.display = "block";
  }
};
const renderRepo = (repoArr) => {
  if (!userInput.value == "") {
    repo__title.style.display = "block";
    repoBox.innerHTML = "";
    repoArr.forEach((repo) => {
      let repoHtml = `
    <div class="element">
      <p>${repo.name}</p>
      <div class="repo__btn">
        <a href="">Starts:${repo.stargazers_count}</a>
        <a href="">Watchers:${repo.watchers_count}</a>
        <a href="">Forks:${repo.forks_count}</a>
      </div>
  </div>`;
      repoBox.insertAdjacentHTML("afterbegin", repoHtml);
    });
  } else {
    repoBox.style.display = "none";
    repo__title.style.display = "none";
  }
};
