/**
 * Configure database using class Database
 */
import yaml from "yamljs";

const config = yaml.load("config.yaml");

let env = process.env.ENV || "development";

function Configure(config: any) {
  let configs = {
    client: config[`${env}`].client,
    connection: {
      host: config[`${env}`].host,
      user: config[`${env}`].username,
      password: config[`${env}`].password,
      database: config[`${env}`].database
    },
    debug: config[`${env}`].debug
  }
  return configs
}

export let Configures = Configure(config)