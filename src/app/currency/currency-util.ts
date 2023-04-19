export class CurrencyUtil {
    public static styleTrend(percent: number): string[] {
        return percent < 0 ? ["text-danger"] : ["text-success"];
      }
}