
---
cssclass: yellowCab, whiteRed-rounded, centerAlign, coffeebean-full-screen
---
```dataviewjs
const reFreshPageButtonMaker = (intest) => {
  const freshButton = this.container.createEl("button");
  freshButton.innerHTML = intest;
  freshButton.addEventListener("click", async (evt) => {
    let content = app.vault.adapter.read(dv.current().file.path);
    app.vault.adapter.append(dv.current().file.path, "\na");
    content.then((content) => { app.vault.adapter.write(dv.current().file.path, content); });
  }
  );
  return freshButton;
};
dv.el("center", "当前已启用【" + app.plugins.enabledPlugins.size + "】个插件");
dv.el("br","")
dv.el("center", reFreshPageButtonMaker("点此刷新本页"));
let list = [];
let namel = 0;
for (let i = 0; i < Object.keys(app.plugins.manifests).length; i++) {
  if (namel < app.plugins.manifests[Object.keys(app.plugins.manifests)[i]].name.length) {
    namel = app.plugins.manifests[Object.keys(app.plugins.manifests)[i]].name.length;
  }
  let name = '<a href="obsidian://advanced-uri?settingid=' + encodeURI(app.plugins.manifests[Object.keys(app.plugins.manifests)[i]].id) + '">' + app.plugins.manifests[Object.keys(app.plugins.manifests)[i]].name + "</a>";
  let status = "[<button>🔴</button>](obsidian://advanced-uri?enable-plugin=" + encodeURI(app.plugins.manifests[Object.keys(app.plugins.manifests)[i]].id) + ")";
  if (Array.from(app.plugins.enabledPlugins).indexOf(Object.keys(app.plugins.manifests)[i]) != -1) {
    status = "[<button>✔</button>](obsidian://advanced-uri?disable-plugin=" + encodeURI(app.plugins.manifests[Object.keys(app.plugins.manifests)[i]].id) + ")";
  }
  let version = app.plugins.manifests[Object.keys(app.plugins.manifests)
  [i]].version;

  let enableLink = "[<button>ON</button>](obsidian://advanced-uri?enable-plugin=" + encodeURI(app.plugins.manifests[Object.keys(app.plugins.manifests)[i]].id) + ")";
  let disableLink = "[<button>OFF</button>](obsidian://advanced-uri?disable-plugin=" + encodeURI(app.plugins.manifests[Object.keys(app.plugins.manifests)[i]].id) + ")";
  let x = ["<div align=center>" + name + "</div>", status];
  list.push(x);
}
list = list.sort(function (a, b) {return a[0].split(">")[2].slice(0,-3).length- b[0].split(">")[2].slice(0,-3).length}).sort(function (a, b) { return a[1].includes("🔴") - b[1].includes("🔴"); });
dv.el("div", dv.el("div", dv.markdownTable(["<div align=right>插件设置</div>", "<div align=left>状态</div>"], list), { attr: { style: "width:" + (namel / 1.25) + "em" } }), { attr: { align: "center" } });
```


