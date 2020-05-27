const reviewers = require("./reviewers.json");
const { WebClient } = require("@slack/web-api");

// Initialize with token for app
const slack = new WebClient(
  "xoxb-1148859936338-1147487527317-EZN60FjfyCPqg3FoWPnVfPjy"
);

const date = new Date();
const day = date.getDate().toString().padStart(2, "0");
const month = (date.getMonth() + 1).toString().padStart(2, "0");
const today = `${day}/${month}`;

slack.conversations
  .info({
    channel: "C014RE71G8H",
  })
  .then((response) => {
    const reviewer = reviewers[today];

    if (!reviewer) {
      console.log("No reviewer");
      return;
    }

    if (response.channel.topic.value === reviewer) {
      console.log("Topic already set");
      return;
    }

    slack.conversations
      .setTopic({
        //specific channel Id and topic you want to assign
        channel: "C014RE71G8H",
        topic: reviewer,
      })
      .then(
        () => {
          console.log("Successfully set topic");
        },
        (error) => {
          console.log(`Failed to set topic: ${error}`);
        }
      );
  });
