const OWNER_UID = "61592733813719";
let lockedGroupNames = {};

module.exports.config = {
  name: "lockname",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Ayush x ChatGPT",
  description: "Lock group name. If changed, bot resets it. Owner-only.",
  commandCategory: "group",
  usages: "lockname lock/unlock/reset",
  cooldowns: 3
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, senderID } = event;
  if (senderID !== OWNER_UID) return api.sendMessage("si boss tatara lang pwede gumamit neto", threadID);

  const subcmd = args[0]?.toLowerCase();
  if (!subcmd) return api.sendMessage("⚠️ Usage: lockname lock/unlock/reset <name>", threadID);

  switch (subcmd) {
    case "lock": {
      const name = args.slice(1).join(" ");
      if (!name) return api.sendMessage("❗ Naam bhi do!\nUsage: lockname lock Ayush Army", threadID);
      lockedGroupNames[threadID] = name;
      await api.setTitle(name, threadID);
      return api.sendMessage(`🔒 Group name lock na po: ${name}`, threadID);
    }

    case "unlock": {
      delete lockedGroupNames[threadID];
      return api.sendMessage("🔓 Group name unlock na po.", threadID);
    }

    case "reset": {
      if (!lockedGroupNames[threadID]) return api.sendMessage(" .", threadID);
      await api.setTitle(lockedGroupNames[threadID], threadID);
      return api.sendMessage(` : ${lockedGroupNames[threadID]}`, threadID);
    }

    default:
      return api.sendMessage("⚠️ Usage: lockname lock/unlock/reset <name>", threadID);
  }
};

module.exports.lockedNames = lockedGroupNames;
