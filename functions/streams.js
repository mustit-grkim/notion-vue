const { Client } = require("@notionhq/client");

exports.handler = async function (event, context) {
  // Initializing a client
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });
  const database = notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });

  const streams = [];

  (await database).results.map((row) => {
    // console.log(database);
    // console.log(row, "row");
    streams.push({
      id: row.id,
      title: row.properties.Name.title[0].text.content,
      startDate: row.properties.Date.date.start,
      endDate: row.properties.Date.date.end,
      url: row.properties.URL.url,
      tags: row.properties.Tags.multi_select.map((tag) => {
        return tag.name;
      }),
    });
  });

  return {
    statusCode: 200,
    body: JSON.stringify(streams),
  };
};
