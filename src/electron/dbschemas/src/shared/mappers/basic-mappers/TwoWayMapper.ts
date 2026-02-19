
export abstract class TwoWayMapper<TInput, TOutput>
{
    protected abstract isInput(payload: any): payload is TInput;
    protected abstract toOutput(payload: TInput): TOutput;
    protected abstract toInput(payload: TOutput): TInput;

    public map(payload: TOutput[]): TInput[];
    public map(payload: TInput[]): TOutput[];
    public map(payload: TOutput): TInput;
    public map(payload: TInput): TOutput;
    public map(payload: TInput | TInput[] | TOutput | TOutput[]): TOutput | TInput | TOutput[] | TInput[]
    {
        if (!Array.isArray(payload))
        {
            if (this.isInput(payload))
            {
                return this.toOutput(payload);
            }

            else
            {
                return this.toInput(payload);
            }
        }

        if (payload.length === 0)
        {
            return [];
        }

        if (this.isInput(payload[0]))
        {
            return payload.map(x => this.toOutput(x));
        }

        else
        {
            return payload.map(x => this.toInput(x));
        }
    }
}
