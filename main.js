// main.js
const players = JSON.parse(localStorage.getItem("players")) || [];

document.getElementById("playerForm").onsubmit = function (e) {
  e.preventDefault();
  const form = e.target;
  const newPlayer = {
    name: form.name.value,
    height: Number(form.height.value),
    position: form.position.value,
    absent: form.absent.checked,
  };
  players.push(newPlayer);
  localStorage.setItem("players", JSON.stringify(players));
  alert("登録しました！");
  form.reset();
};

function createTeams() {
  const groupSize = Number(document.getElementById("groupSize").value);
  const availablePlayers = players.filter(p => !p.absent);

  // グループ分けロジック（ポジションと身長考慮）を後で追加
  const teams = groupPlayers(availablePlayers, groupSize);
  displayTeams(teams);
}

function groupPlayers(players, size) {
  // ポジションバランスを見ながらグループ作成
  // 実装は応用ロジック：guard2/forward2/center1 などを振り分け
  // 今は単純な例としてランダム分け：
  const shuffled = [...players].sort(() => Math.random() - 0.5);
  const teams = [];
  for (let i = 0; i < shuffled.length; i += size) {
    teams.push(shuffled.slice(i, i + size));
  }
  return teams;
}

function displayTeams(teams) {
  const output = document.getElementById("teamsOutput");
  output.innerHTML = "";
  teams.forEach((team, i) => {
    const teamNames = team.map(p => `${p.name} (${p.position}, ${p.height}cm)`).join(", ");
    const div = document.createElement("div");
    div.innerText = `チーム${i + 1}: ${teamNames}`;
    output.appendChild(div);
  });

  // 余剰人数表示
  const lastTeam = teams[teams.length - 1];
  if (lastTeam.length < document.getElementById("groupSize").value) {
    const extras = lastTeam.map(p => p.name).join(", ");
    const extraDiv = document.createElement("div");
    extraDiv.innerHTML = `🧍 余りメンバー: ${extras}`;
    output.appendChild(extraDiv);
  }
}