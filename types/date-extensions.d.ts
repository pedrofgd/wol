export {};

declare global {
    interface Date {
        addDays(days: number): Date;
        addYears(years: number): Date;
        getMonthPretty(): string;
        weeksUntil(limitDate: Date): number;
    }
}
