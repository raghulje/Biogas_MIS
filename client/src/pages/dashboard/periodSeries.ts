export type TrendPoint = {
  date?: string;
  label?: string;
  totalFeed?: number;
  rawBiogas?: number;
  cbgProduced?: number;
  cbgSold?: number;
  [key: string]: unknown;
};

export type FilterPeriod = 'day' | 'week' | 'month' | 'year' | 'custom';

const numberValue = (value: unknown) => Number(value ?? 0) || 0;

function parseDate(value?: string): Date | null {
  if (!value) return null;
  const date = new Date(value.includes('T') ? value : `${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function dayKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function normalizeTrendPoint(point: TrendPoint): TrendPoint {
  const raw = point as Record<string, unknown>;
  return {
    ...point,
    date: point.date != null ? String(point.date).slice(0, 10) : point.date,
    totalFeed: numberValue(
      raw.totalFeed ?? raw.total_feed ?? raw.feed,
    ),
    rawBiogas: numberValue(
      raw.rawBiogas ?? raw.raw_biogas ?? raw.totalRawBiogas ?? raw.total_raw_biogas,
    ),
    cbgProduced: numberValue(raw.cbgProduced ?? raw.cbg_produced ?? raw.produced),
    cbgSold: numberValue(raw.cbgSold ?? raw.cbg_sold),
  };
}

function sumBucket(items: TrendPoint[]): TrendPoint {
  return items.reduce<TrendPoint>(
    (total, item) => {
      const point = normalizeTrendPoint(item);
      total.totalFeed = numberValue(total.totalFeed) + numberValue(point.totalFeed);
      total.rawBiogas = numberValue(total.rawBiogas) + numberValue(point.rawBiogas);
      total.cbgProduced = numberValue(total.cbgProduced) + numberValue(point.cbgProduced);
      total.cbgSold = numberValue(total.cbgSold) + numberValue(point.cbgSold);
      return total;
    },
    { totalFeed: 0, rawBiogas: 0, cbgProduced: 0, cbgSold: 0 },
  );
}

function collapseByDate(trends: TrendPoint[]) {
  const buckets = new Map<string, TrendPoint[]>();
  trends.map(normalizeTrendPoint).forEach((point) => {
    if (!point.date) return;
    const key = String(point.date).slice(0, 10);
    buckets.set(key, [...(buckets.get(key) ?? []), point]);
  });

  return [...buckets.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([date, items]) => ({ date, ...sumBucket(items) }));
}

function expandDayToHours(day: TrendPoint | null) {
  const weights = Array.from({ length: 12 }, (_, index) => {
    const hour = index + 6;
    return Math.max(0.08, 0.35 + 0.65 * Math.max(0, Math.sin(((hour - 5) / 14) * Math.PI)));
  });
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0) || 1;

  return weights.map((weight, index) => ({
    date: day?.date,
    label: `${String(index + 6).padStart(2, '0')}:00`,
    totalFeed: numberValue(day?.totalFeed) * (weight / totalWeight),
    rawBiogas: numberValue(day?.rawBiogas) * (weight / totalWeight),
    cbgProduced: numberValue(day?.cbgProduced) * (weight / totalWeight),
    cbgSold: numberValue(day?.cbgSold) * (weight / totalWeight),
  }));
}

function fillDays(sorted: TrendPoint[], maximumDays: number) {
  if (!sorted.length) return [];
  const last = parseDate(sorted.at(-1)?.date);
  const first = parseDate(sorted[0].date);
  if (!first || !last) return [];

  const start = new Date(first);
  const span = Math.round((last.getTime() - start.getTime()) / 86400000) + 1;
  if (span > maximumDays) start.setTime(last.getTime() - (maximumDays - 1) * 86400000);
  const byDay = new Map(sorted.map((point) => [String(point.date).slice(0, 10), point]));
  const points: TrendPoint[] = [];

  for (const cursor = new Date(start); cursor <= last; cursor.setDate(cursor.getDate() + 1)) {
    const key = dayKey(cursor);
    const point = byDay.get(key);
    points.push({
      date: key,
      label: cursor.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      totalFeed: numberValue(point?.totalFeed),
      rawBiogas: numberValue(point?.rawBiogas),
      cbgProduced: numberValue(point?.cbgProduced),
      cbgSold: numberValue(point?.cbgSold),
    });
  }
  return points;
}

function aggregateByWeekOfMonth(sorted: TrendPoint[]) {
  const buckets = new Map<number, TrendPoint[]>();
  sorted.forEach((point) => {
    const date = parseDate(point.date);
    if (!date) return;
    const week = Math.ceil(date.getDate() / 7);
    buckets.set(week, [...(buckets.get(week) ?? []), point]);
  });
  const maximumWeek = Math.max(4, ...buckets.keys(), 1);
  return Array.from({ length: maximumWeek }, (_, index) => {
    const week = index + 1;
    return { ...sumBucket(buckets.get(week) ?? []), label: `Week ${week}` };
  });
}

function aggregateByMonth(sorted: TrendPoint[], year?: number) {
  const buckets = new Map<number, TrendPoint[]>();
  sorted.forEach((point) => {
    const date = parseDate(point.date);
    if (!date || (year != null && date.getFullYear() !== year)) return;
    buckets.set(date.getMonth(), [...(buckets.get(date.getMonth()) ?? []), point]);
  });
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return labels.map((label, month) => ({ ...sumBucket(buckets.get(month) ?? []), label }));
}

function aggregateByWeek(sorted: TrendPoint[]) {
  const buckets = new Map<string, TrendPoint[]>();
  sorted.forEach((point) => {
    const date = parseDate(point.date);
    if (!date) return;
    const firstDay = new Date(date.getFullYear(), 0, 1);
    const week = Math.ceil((((date.getTime() - firstDay.getTime()) / 86400000) + firstDay.getDay() + 1) / 7);
    const key = `${date.getFullYear()}-W${week}`;
    buckets.set(key, [...(buckets.get(key) ?? []), point]);
  });
  return [...buckets.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, items]) => ({ ...sumBucket(items), label: key.replace(/^\d+-/, '') }));
}

export type PeriodSeriesResult = {
  points: TrendPoint[];
  granularity: 'hour' | 'day' | 'week' | 'month';
  empty: boolean;
};

export function buildPeriodSeries(
  trends: TrendPoint[],
  filterType: FilterPeriod,
  options?: { year?: number },
): PeriodSeriesResult {
  const sorted = collapseByDate(trends);
  const empty = sorted.length === 0;

  if (filterType === 'day') {
    const day = sorted.length ? { date: sorted[0].date, ...sumBucket(sorted) } : null;
    return { points: expandDayToHours(day), granularity: 'hour', empty };
  }

  if (filterType === 'week') {
    if (empty) {
      return {
        points: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label) => ({
          label, totalFeed: 0, rawBiogas: 0, cbgProduced: 0, cbgSold: 0,
        })),
        granularity: 'day',
        empty,
      };
    }
    return { points: fillDays(sorted, 7), granularity: 'day', empty };
  }

  if (filterType === 'month') {
    return {
      points: empty
        ? [1, 2, 3, 4].map((week) => ({ label: `Week ${week}`, totalFeed: 0, rawBiogas: 0, cbgProduced: 0, cbgSold: 0 }))
        : aggregateByWeekOfMonth(sorted),
      granularity: 'week',
      empty,
    };
  }

  if (filterType === 'year') {
    return { points: aggregateByMonth(sorted, options?.year), granularity: 'month', empty };
  }

  if (sorted.length > 60) return { points: aggregateByWeek(sorted), granularity: 'week', empty };
  if (sorted.length > 31) return { points: aggregateByMonth(sorted), granularity: 'month', empty };
  return { points: fillDays(sorted, 31), granularity: 'day', empty };
}
