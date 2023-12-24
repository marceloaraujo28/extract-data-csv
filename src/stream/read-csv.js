import { parse } from "csv-parse";
import fs from "fs";

const databasePath = new URL("../data.csv", import.meta.url);

const processFile = async () => {
  const parser = fs.createReadStream(databasePath).pipe(parse());

  for await (const record of parser) {
    record.map((item) => {
      const method = item.split(";");
      const title = method[0];
      const description = method[1];

      if (title.trim() !== "title") {
        fetch("http://localhost:3333/tasks", {
          method: "POST",
          body: JSON.stringify({
            title,
            description,
          }),
          duplex: "half",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    });
  }
};

const execute = async () => {
  await processFile();
};

execute();
