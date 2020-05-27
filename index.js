const reviewers = require("./reviewers.json");
const { WebClient } = require("@slack/web-api");

const slack = new WebClient(process.env.SLACK_TOKEN);

const date = new Date();
const day = date.getDate().toString().padStart(2, "0");
const month = (date.getMonth() + 1).toString().padStart(2, "0");
const today = `${day}/${month}`;

async function convertToMention(name) {
  const { members } = await slack.users.list();

  for (const user of members) {
    if (name === user.real_name) {
      return `<@${user.id}>`;
    }
  }

  return name;
}

(async () => {
  const info = await slack.conversations.info({
    channel: "C014RE71G8H",
  });

  let reviewer = reviewers[today];

  if (!reviewer) {
    console.log("No reviewer");
    return;
  }

  reviewer = await convertToMention(reviewer);

  if (info.channel.topic.value.includes(reviewer)) {
    console.log("Topic already set");
    return;
  }

  reviewer = `Today's reviewer is: ${reviewer} (${Math.random()})`;

  await slack.conversations.setTopic({
    //specific channel Id and topic you want to assign
    channel: "C014RE71G8H",
    topic: reviewer,
  });

  console.log("Successfully set topic");
})();
