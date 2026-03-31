export const countTiers = (tiers: number[]) => {

    const tierCounts = [...Array(6).keys()].map(_ => 0);

    for (const tier of tiers) {
        tierCounts[tier] += 1;
    }

    return tierCounts;

}


export const dateToString = (date: Date) => {
    return `${date.getFullYear()}-${dateToStringHelper(date.getMonth()+1)}-${dateToStringHelper(date.getDate())}`
}

const dateToStringHelper = (dateSegment: number) => {
    return dateSegment < 10 ? "0"+dateSegment.toString() : dateSegment.toString();
}