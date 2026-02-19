import { ConnectionType } from "../../../shared/domain/enums/ConnectionType";
import { HtmlTemplate } from "./HtmlTemplate";

export class ConnectionTypeBadgeTemplate extends HtmlTemplate<ConnectionType>
{
    public toHtml(model: ConnectionType): string
    {
        let connectionText = ``;

        switch (model)
        {
            case ConnectionType.Access:
                connectionText = 'Access';
                break;

            case ConnectionType.MySQL:
                connectionText = 'MySQL';
                break;
            case ConnectionType.Postgres:
                connectionText = 'Postgres';
                break;

            case ConnectionType.SQLite:
                connectionText = 'SQLite';
                break;

            default:
                console.assert(false, `Unknown connection type: ${model}`);
                break;
        }

        let badgeClass = `badge-${connectionText.toLowerCase()}`;

        let html = //html
        `
        <span class="badge ${badgeClass}">${connectionText}</span>
        `;

        return html;
    }
}

const HTML_ENGINE = new ConnectionTypeBadgeTemplate();

export function getConnectionTypeBadgeHtml(connectionType: ConnectionType): string
{
    return HTML_ENGINE.toHtml(connectionType);
}
