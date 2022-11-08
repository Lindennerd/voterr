export function useFormatDate() {
    return {
        format(dateStr: string) {
            var date = new Date(dateStr);
            var dateFormat = Intl.DateTimeFormat();
            return dateFormat.format(date);
        }
    }
}