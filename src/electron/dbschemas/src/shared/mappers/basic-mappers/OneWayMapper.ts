
export abstract class OneWayMapper<TSource, TResult>
{
    protected abstract mapModel(payload: TSource): TResult;

    public map(payload: TSource): TResult;
    public map(payload: TSource[]): TResult[];
    public map(payload: TSource | TSource[]): TResult | TResult[]
    {
        if (!Array.isArray(payload))
        {
            return this.mapModel(payload);
        }

        return payload.map((x) => this.mapModel(x));
    }
}
