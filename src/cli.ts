import { Command, flags } from '@oclif/command';
import { args } from '@oclif/parser';
import { exportJson, GsejConfigInput } from '.';

class Gsej extends Command {
  static description = 'Export Google Sheets to JSON';

  static flags: flags.Input<GsejFlags> = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    clientId: flags.string({ description: 'Google OAuth client id' }),
    clientSecret: flags.string({ description: 'Google OAuth client secret' }),
    accessToken: flags.string({ description: 'Google OAuth access token' }),
    refreshToken: flags.string({ description: 'Google OAuth refresh token' }),
  };

  static args: args.Input = [
    { name: 'spreadsheet_id', description: 'Google SpreadSheet Id', required: true },
    { name: 'sheet_title', description: 'Sheet Title', required: true },
  ];

  async run(): Promise<void> {
    const { args, flags } = this.parse<GsejFlags, GsejArgs>(Gsej);
    const config: GsejConfigInput = {
      clientId: flags.clientId,
      clientSecret: flags.clientSecret,
      accessToken: flags.accessToken,
      refreshToken: flags.refreshToken,
    };
    try {
      const result = await exportJson(args.spreadsheet_id, args.sheet_title, config);
      this.log(JSON.stringify(result));
    } catch (e) {
      this.error(e);
      // this.error('Google Oauth Config', {
      //   suggestions: [
      //     'create .env file, (try our helper: https://github.com/vdelacou/iblis-cli-token-google-oauth-web-server)',
      //     'add options --clientId=clientId --clientSecret=clientSecret --accessToken=accessToken --refreshToken=refreshToken',
      //   ],
      //   ref: 'https://github.com/vdelacou/google-sheets-export-json#readme',
      // });
    }
  }
}

export = Gsej;

type GsejFlags = {
  version: void;
  help: void;
  clientId?: string;
  clientSecret?: string;
  accessToken?: string;
  refreshToken?: string;
};

type GsejArgs = {
  spreadsheet_id: string;
  sheet_title: string;
};
