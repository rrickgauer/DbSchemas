
export abstract class HtmlTemplate<T>
{
    public abstract toHtml(model: T): string;

    public toHtmls = (models: T[]): string => models.map(model => this.toHtml(model)).join('');
}


