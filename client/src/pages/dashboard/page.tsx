import { memo, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Chip,
  CircularProgress,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Drawer,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Zoom,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  keyframes,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import {
  Close as CloseIcon,
  FilterList as FilterIcon,
  Speed as AvgIcon,
  ShowChart as TrendIcon,
} from '@mui/icons-material';
import { Layout } from '../../components/Layout';
import feedIcon from '../../assets/mis-feed-icon.jpg';
import biogasIcon from '../../assets/mis-biogas-icon.jpg';
import cbgIcon from '../../assets/mis-cbg-icon.jpg';
import soldIcon from '../../assets/mis-sold-icon.jpg';
import fomIcon from '../../assets/mis-fom-icon.jpg';
import fomSoldIcon from '../../assets/mis-fom-sold-icon.jpg';
import powerIcon from '../../assets/mis-power-icon.jpg';
import safetyIcon from '../../assets/mis-safety-icon.jpg';
import { PageBanner } from '../../components/PageBanner';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { misService } from '../../services/misService';
import MESSAGES from '../../utils/messages';
import { getCalendarWeek, getWeeksInYear, formatWeekRangeLabel } from '../../utils/calendarUtils';
import { buildPeriodSeries, type FilterPeriod, type TrendPoint } from './periodSeries';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const currentDate = new Date();
const currentYear = currentDate.getFullYear(); // Year options run from current year down to minYear (updates automatically each year)
const minYear = 2020;
const SHOW_DAILY_AVERAGES = false;

const CHART_COLORS = {
  feed: '#8B5CF6',
  raw: '#17a2b4',
  produced: '#10B981',
  sold: '#F97316',
};

const chartFadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

const DashboardMetricCard = memo(function DashboardMetricCard({
  title,
  value,
  unit,
  subtitle,
  color,
  icon,
  onClick,
}: {
  title: string;
  value: string;
  unit?: string;
  subtitle?: string;
  color: string;
  icon: ReactNode;
  onClick?: () => void;
}) {
  return (
    <Box
      className="metric-card"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      } : undefined}
      sx={{
        height: '100%',
        minHeight: 168,
        p: '14px 14px 22px',
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '18px',
        border: `1.5px solid ${color}8C`,
        background: `linear-gradient(165deg, ${color}22 0%, #fff 46%)`,
        boxShadow: `0 0 0 3px ${color}14, 0 14px 30px -18px ${color}73`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s, border-color 0.3s',
        '&:hover': {
          transform: 'translateY(-6px)',
          borderColor: color,
          boxShadow: `0 0 0 4px ${color}24, 0 22px 40px -14px ${color}80`,
        },
        '&:hover .kpi-badge': {
          transform: 'rotate(-8deg) scale(1.08)',
        },
        '&:focus-visible': {
          outline: `3px solid ${color}55`,
          outlineOffset: 2,
        },
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          zIndex: 0,
          width: 150,
          height: 150,
          right: -48,
          top: -62,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25, position: 'relative', zIndex: 1 }}>
        <Box
          className="kpi-badge"
          sx={{
            width: 48,
            height: 48,
            flexShrink: 0,
            borderRadius: '14px',
            overflow: 'visible',
            display: 'grid',
            placeItems: 'center',
            background: `linear-gradient(135deg, ${color}, ${color}cc)`,
            boxShadow: `0 10px 20px -8px ${color}aa, inset 0 1px 0 rgba(255,255,255,0.35)`,
            position: 'relative',
            transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: -5,
              borderRadius: '18px',
              border: `2px solid ${color}`,
              animation: 'kpi-badge-ring 2.8s ease-out infinite',
              pointerEvents: 'none',
            },
            '& img': { width: 48, height: 48, objectFit: 'cover', display: 'block', borderRadius: '14px' },
          }}
        >
          {icon}
        </Box>
        <Box sx={{ minWidth: 0, flex: 1, pt: 0.25 }}>
          <Typography sx={{ color: '#111a28', fontSize: 13.5, fontWeight: 700, lineHeight: 1.25 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography
              sx={{
                mt: 0.35,
                color: '#3a4656',
                fontSize: 12,
                fontWeight: 550,
                lineHeight: 1.3,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ position: 'relative', zIndex: 1, mt: 'auto', pt: 1.5, display: 'flex', alignItems: 'baseline', gap: 0.75 }}>
        <Typography sx={{ color: '#0e1726', fontSize: 32, lineHeight: 1, fontWeight: 800, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums' }}>
          {value}
        </Typography>
        {unit && (
          <Typography component="span" sx={{ color, fontSize: 13, fontWeight: 700 }}>
            {unit}
          </Typography>
        )}
      </Box>
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          zIndex: 1,
          left: 14,
          right: 14,
          bottom: 10,
          height: 4,
          borderRadius: 4,
          background: `linear-gradient(90deg, ${color}, ${color}99)`,
        }}
      />
    </Box>
  );
});

function monotoneCubicPath(xs: number[], ys: number[], closeY?: number): string {
  const count = xs.length;
  if (!count) return '';
  if (count === 1) {
    return closeY === undefined
      ? `M ${xs[0]} ${ys[0]}`
      : `M ${xs[0]} ${closeY} L ${xs[0]} ${ys[0]} L ${xs[0]} ${closeY} Z`;
  }

  const dx: number[] = [];
  const slopes: number[] = [];
  for (let index = 0; index < count - 1; index += 1) {
    dx[index] = xs[index + 1] - xs[index] || 1e-6;
    slopes[index] = (ys[index + 1] - ys[index]) / dx[index];
  }

  const tangents = new Array<number>(count);
  tangents[0] = slopes[0];
  tangents[count - 1] = slopes[count - 2];
  for (let index = 1; index < count - 1; index += 1) {
    tangents[index] = slopes[index - 1] * slopes[index] <= 0
      ? 0
      : (slopes[index - 1] + slopes[index]) / 2;
  }

  for (let index = 0; index < count - 1; index += 1) {
    if (Math.abs(slopes[index]) < 1e-12) {
      tangents[index] = 0;
      tangents[index + 1] = 0;
      continue;
    }
    const left = tangents[index] / slopes[index];
    const right = tangents[index + 1] / slopes[index];
    const magnitude = left * left + right * right;
    if (magnitude > 9) {
      const scale = 3 / Math.sqrt(magnitude);
      tangents[index] = scale * left * slopes[index];
      tangents[index + 1] = scale * right * slopes[index];
    }
  }

  let path = `M ${xs[0]} ${ys[0]}`;
  for (let index = 0; index < count - 1; index += 1) {
    const width = dx[index];
    path += ` C ${xs[index] + width / 3} ${ys[index] + (tangents[index] * width) / 3}, ${xs[index + 1] - width / 3} ${ys[index + 1] - (tangents[index + 1] * width) / 3}, ${xs[index + 1]} ${ys[index + 1]}`;
  }
  if (closeY !== undefined) path += ` L ${xs[count - 1]} ${closeY} L ${xs[0]} ${closeY} Z`;
  return path;
}

const ProductionTrendChart = memo(function ProductionTrendChart({
  trends,
  filterType,
  year,
}: {
  trends: TrendPoint[];
  filterType: FilterPeriod;
  year: number;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const periodSeries = useMemo(
    () => buildPeriodSeries(trends, filterType, { year }),
    [trends, filterType, year],
  );

  const chart = useMemo(() => {
    const data = periodSeries.points.length
      ? periodSeries.points
      : [{ label: '—', totalFeed: 0, rawBiogas: 0, cbgProduced: 0, cbgSold: 0 }];
    const feed = data.map((point) => Number(point.totalFeed ?? 0) || 0);
    const raw = data.map((point) => Number(point.rawBiogas ?? 0) || 0);
    const produced = data.map((point) => Number(point.cbgProduced ?? 0) || 0);
    const sold = data.map((point) => Number(point.cbgSold ?? 0) || 0);
    const width = 960;
    const height = 220;
    const left = 48;
    const right = width - 52;
    const top = 28;
    const bottom = height - 40;
    const maximum = Math.max(...raw, ...produced, ...sold, 1);
    const feedMaximum = Math.max(...feed, 1);
    const xAt = (index: number) => left + (index / Math.max(data.length - 1, 1)) * (right - left);
    const yAt = (value: number) => bottom - (value / maximum) * (bottom - top);
    const feedYAt = (value: number) => bottom - (value / feedMaximum) * (bottom - top);
    const xValues = data.map((_, index) => xAt(index));

    return {
      data, width, height, left, right, top, bottom, maximum, feedMaximum, xAt, yAt, feedYAt,
      feedPath: monotoneCubicPath(xValues, feed.map(feedYAt)),
      rawPath: monotoneCubicPath(xValues, raw.map(yAt)),
      producedPath: monotoneCubicPath(xValues, produced.map(yAt)),
      soldPath: monotoneCubicPath(xValues, sold.map(yAt)),
      rawArea: monotoneCubicPath(xValues, raw.map(yAt), bottom),
    };
  }, [periodSeries.points]);

  const activePoint = hoveredIndex === null ? null : chart.data[hoveredIndex];
  const tooltipLeft = hoveredIndex === null ? 0 : (chart.xAt(hoveredIndex) / chart.width) * 100;
  const formatAxis = (value: number) => value >= 1000
    ? `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`
    : String(Math.round(value));
  const granularity = `${periodSeries.granularity[0].toUpperCase()}${periodSeries.granularity.slice(1)}ly`;
  const legend = [
    { label: 'Total Feed', color: CHART_COLORS.feed },
    { label: 'Total Raw Biogas', color: CHART_COLORS.raw },
    { label: 'CBG Produced', color: CHART_COLORS.produced },
    { label: 'CBG Sold', color: CHART_COLORS.sold },
  ];

  return (
    <Card
      sx={{
        mb: 1.5,
        border: '1px solid rgba(23, 162, 180, 0.16)',
        borderRadius: '16px',
        boxShadow: '0 10px 32px rgba(30, 75, 110, 0.08)',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 85% 70% at 8% 0%, rgba(23, 162, 180,0.12) 0%, transparent 55%), radial-gradient(ellipse 55% 65% at 100% 100%, rgba(16,185,129,0.08) 0%, transparent 58%), #fff',
        transition: 'box-shadow 220ms ease, transform 220ms ease',
        '&:hover': {
          boxShadow: '0 16px 42px rgba(30, 75, 110, 0.12)',
          transform: 'translateY(-1px)',
        },
      }}
    >
      <CardContent sx={{ p: { xs: 1.5, md: 2.25 }, '&:last-child': { pb: { xs: 1.5, md: 2.25 } } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 34, height: 34, display: 'grid', placeItems: 'center', borderRadius: '10px', bgcolor: 'rgba(23, 162, 180,0.1)', color: CHART_COLORS.raw }}>
              <TrendIcon sx={{ fontSize: 19 }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#25313C', lineHeight: 1.2 }}>
                Production Trend
              </Typography>
              <Typography sx={{ fontSize: 11.5, color: '#7A8793', mt: 0.2 }}>
                Production and dispatch performance
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.75, alignItems: 'center', flexWrap: 'wrap' }}>
            {legend.map((item) => (
              <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.55 }}>
                <Box sx={{ width: 9, height: 3, borderRadius: 2, bgcolor: item.color }} />
                <Typography sx={{ fontSize: 11.5, fontWeight: 500, color: '#58595B' }}>{item.label}</Typography>
              </Box>
            ))}
            <Chip label={`${granularity} · ${chart.data.length} pts`} size="small" variant="outlined" />
          </Box>
        </Box>

        {periodSeries.empty ? (
          <Box sx={{ height: 240, display: 'grid', placeItems: 'center', borderRadius: '12px', border: '1px dashed rgba(23, 162, 180,0.3)', bgcolor: 'rgba(23, 162, 180,0.03)' }}>
            <Box sx={{ textAlign: 'center', px: 2 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#333842' }}>No trend data for this period</Typography>
              <Typography sx={{ mt: 0.5, fontSize: 12.5, color: '#666' }}>Try another filter range or create MIS entries.</Typography>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              overflowX: { xs: 'auto', md: 'visible' },
              overflowY: 'hidden',
              animation: `${chartFadeIn} 320ms ease-out`,
              '&::-webkit-scrollbar': { height: 5 },
              '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(23, 162, 180,0.22)', borderRadius: 4 },
            }}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Box sx={{ minWidth: { xs: 680, md: 0 }, width: '100%', aspectRatio: `${chart.width} / ${chart.height}` }}>
            <svg viewBox={`0 0 ${chart.width} ${chart.height}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Production trend chart">
              <defs>
                <linearGradient id="production-trend-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS.raw} stopOpacity="0.14" />
                  <stop offset="100%" stopColor={CHART_COLORS.raw} stopOpacity="0" />
                </linearGradient>
              </defs>

              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const tick = chart.maximum * ratio;
                const y = chart.yAt(tick);
                return (
                  <g key={ratio}>
                    <line x1={chart.left} x2={chart.right} y1={y} y2={y} stroke="rgba(148,163,184,0.28)" strokeWidth="1" strokeDasharray="4 5" />
                    <text x={chart.left - 10} y={y + 4} fontSize="11" fontFamily="Inter, system-ui, sans-serif" fontWeight="500" textAnchor="end" fill="#777">{formatAxis(tick)}</text>
                    <text x={chart.right + 10} y={y + 4} fontSize="11" fontFamily="Inter, system-ui, sans-serif" fontWeight="600" textAnchor="start" fill={CHART_COLORS.feed}>{formatAxis(chart.feedMaximum * ratio)}</text>
                  </g>
                );
              })}

              <path d={chart.rawArea} fill="url(#production-trend-fill)" />
              <path d={chart.soldPath} fill="none" stroke={CHART_COLORS.sold} strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              <path d={chart.producedPath} fill="none" stroke={CHART_COLORS.produced} strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              <path d={chart.rawPath} fill="none" stroke={CHART_COLORS.raw} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              <path d={chart.feedPath} fill="none" stroke={CHART_COLORS.feed} strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="7 5" vectorEffect="non-scaling-stroke" />

              {hoveredIndex !== null && (
                <line x1={chart.xAt(hoveredIndex)} x2={chart.xAt(hoveredIndex)} y1={chart.top} y2={chart.bottom} stroke="rgba(100,116,139,0.45)" strokeWidth="1.25" strokeDasharray="3 4" />
              )}

              {chart.data.map((point, index) => {
                const x = chart.xAt(index);
                const radius = hoveredIndex === index ? 5.5 : 4;
                const hitWidth = (chart.right - chart.left) / Math.max(chart.data.length, 1);
                return (
                  <g key={`${point.label ?? point.date}-${index}`}>
                    <circle cx={x} cy={chart.feedYAt(Number(point.totalFeed ?? 0))} r={radius} fill="#fff" stroke={CHART_COLORS.feed} strokeWidth="2" />
                    <circle cx={x} cy={chart.yAt(Number(point.cbgSold ?? 0))} r={radius} fill="#fff" stroke={CHART_COLORS.sold} strokeWidth="2" />
                    <circle cx={x} cy={chart.yAt(Number(point.cbgProduced ?? 0))} r={radius} fill="#fff" stroke={CHART_COLORS.produced} strokeWidth="2" />
                    <circle cx={x} cy={chart.yAt(Number(point.rawBiogas ?? 0))} r={radius + 0.5} fill="#fff" stroke={CHART_COLORS.raw} strokeWidth="2.25" />
                    <rect x={x - hitWidth / 2} y={chart.top} width={hitWidth} height={chart.bottom - chart.top} fill="transparent" onMouseEnter={() => setHoveredIndex(index)} style={{ cursor: 'crosshair' }} />
                  </g>
                );
              })}

              {chart.data.map((point, index) => {
                const step = Math.max(1, Math.floor((chart.data.length - 1) / 6));
                if (index % step !== 0 && index !== chart.data.length - 1) return null;
                return (
                  <text key={`label-${index}`} x={chart.xAt(index)} y={chart.height - 12} fontSize="11" fontFamily="Inter, system-ui, sans-serif" fontWeight="500" textAnchor="middle" fill="#777">
                    {point.label ?? ''}
                  </text>
                );
              })}
            </svg>
            </Box>

            {activePoint && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 12,
                  left: `clamp(8px, calc(${tooltipLeft}% - 90px), calc(100% - 192px))`,
                  width: 180,
                  px: 1.5,
                  py: 1.15,
                  borderRadius: '12px',
                  bgcolor: 'rgba(15, 23, 42, 0.92)',
                  color: '#fff',
                  pointerEvents: 'none',
                  zIndex: 3,
                  boxShadow: '0 12px 32px rgba(15,23,42,0.22)',
                }}
              >
                <Typography sx={{ fontSize: 11, fontWeight: 600, mb: 0.75, opacity: 0.7 }}>{activePoint.label ?? activePoint.date ?? '—'}</Typography>
                {[
                  { label: 'Total Feed', value: activePoint.totalFeed, unit: 'tons', color: CHART_COLORS.feed },
                  { label: 'Total Raw Biogas', value: activePoint.rawBiogas, unit: 'm³', color: CHART_COLORS.raw },
                  { label: 'CBG Produced', value: activePoint.cbgProduced, unit: 'kg', color: CHART_COLORS.produced },
                  { label: 'CBG Sold', value: activePoint.cbgSold, unit: 'kg', color: CHART_COLORS.sold },
                ].map((item) => (
                  <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, py: 0.3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.65 }}>
                      <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: item.color }} />
                      <Typography sx={{ fontSize: 11, opacity: 0.85 }}>{item.label}</Typography>
                    </Box>
                    <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                      {(Number(item.value ?? 0) || 0).toLocaleString(undefined, { maximumFractionDigits: 1 })} {item.unit}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
});

export default function DashboardPage() {
  const isPhone = useMediaQuery('(max-width:768px)');
  const [filterType, setFilterType] = useState<FilterPeriod>('month');
  // Format numbers: max 2 decimal places (avoid float noise), trim trailing zeros
  const formatNumber = (val: any) => {
    if (val === null || val === undefined) return '0';
    const n = Number(val);
    if (Number.isNaN(n)) return String(val);
    if (Number.isInteger(n)) return String(n);
    const s = n.toFixed(2);
    return s.replace(/\.?0+$/, '') || '0';
  };
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedWeek, setSelectedWeek] = useState(getCalendarWeek(currentDate));
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [draftType, setDraftType] = useState<FilterPeriod>('month');
  const [draftDate, setDraftDate] = useState<Date | null>(new Date());
  const [draftStart, setDraftStart] = useState<Date | null>(null);
  const [draftEnd, setDraftEnd] = useState<Date | null>(null);
  const [draftYear, setDraftYear] = useState(currentYear);
  const [draftMonth, setDraftMonth] = useState(currentDate.getMonth() + 1);
  const [draftWeek, setDraftWeek] = useState(getCalendarWeek(currentDate));
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [cbgBreakdownOpen, setCBGBreakdownOpen] = useState(false);
  const [cbgBreakdownData, setCBGBreakdownData] = useState<any[]>([]);
  const [cbgLoading, setCBGLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // When year changes in weekly filter, clamp week to that year's max weeks (52 or 53)
  useEffect(() => {
    if (filterType !== 'week') return;
    const maxWeeks = getWeeksInYear(selectedYear);
    if (selectedWeek > maxWeeks) setSelectedWeek(maxWeeks);
  }, [filterType, selectedYear]);

  useEffect(() => {
    if (filterType === 'day') return;
    if (filterType === 'custom') return;
    fetchDashboardData();
  }, [filterType, selectedYear, selectedMonth, selectedWeek]);

  useEffect(() => {
    if (filterType === 'day' && selectedDate) fetchDashboardData();
  }, [filterType, selectedDate]);

  const buildParams = (): { period: string; startDate?: string; endDate?: string; year?: number; week?: number; month?: number } => {
    const params: { period: string; startDate?: string; endDate?: string; year?: number; week?: number; month?: number } = { period: filterType };
    if (filterType === 'custom' && startDate && endDate) {
      params.startDate = startDate.toISOString().slice(0, 10);
      params.endDate = endDate.toISOString().slice(0, 10);
    }
    if (filterType === 'day' && selectedDate) {
      const offset = selectedDate.getTimezoneOffset() * 60000;
      const localDate = new Date(selectedDate.getTime() - offset).toISOString().slice(0, 10);
      params.startDate = localDate;
      params.endDate = localDate;
    }
    if (filterType === 'week') {
      params.year = selectedYear;
      params.week = selectedWeek;
    }
    if (filterType === 'month') {
      params.year = selectedYear;
      params.month = selectedMonth;
    }
    if (filterType === 'year') {
      params.year = selectedYear;
    }
    return params;
  };

  const fetchDashboardData = async (override?: { period: string; startDate?: string; endDate?: string; year?: number; week?: number; month?: number }) => {
    setLoading(true);
    setFetchError(null);
    try {
      const data = await misService.getDashboardData(override || buildParams());
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
      setFetchError('Failed to load dashboard. Please try again.');
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCBGSoldClick = async () => {
    setCBGBreakdownOpen(true);
    setCBGLoading(true);
    try {
      const data = await misService.getCBGSalesBreakdown(buildParams());
      setCBGBreakdownData(data);
    } catch (error) {
      console.error('Failed to fetch CBG sales breakdown', error);
      enqueueSnackbar(MESSAGES.FAILED_LOAD_BREAKDOWN, { variant: 'error' });
    } finally {
      setCBGLoading(false);
    }
  };

  const openMobileFilters = () => {
    setDraftType(filterType);
    setDraftDate(selectedDate);
    setDraftStart(startDate);
    setDraftEnd(endDate);
    setDraftYear(selectedYear);
    setDraftMonth(selectedMonth);
    setDraftWeek(selectedWeek);
    setFiltersOpen(true);
  };

  const applyMobileFilters = (next?: {
    filterType: FilterPeriod;
    selectedDate: Date | null;
    startDate: Date | null;
    endDate: Date | null;
    selectedYear: number;
    selectedMonth: number;
    selectedWeek: number;
  }) => {
    const chosen = next || {
      filterType: draftType,
      selectedDate: draftDate,
      startDate: draftStart,
      endDate: draftEnd,
      selectedYear: draftYear,
      selectedMonth: draftMonth,
      selectedWeek: draftWeek,
    };
    const week = Math.min(chosen.selectedWeek, getWeeksInYear(chosen.selectedYear));
    setFilterType(chosen.filterType);
    setSelectedDate(chosen.selectedDate);
    setStartDate(chosen.startDate);
    setEndDate(chosen.endDate);
    setSelectedYear(chosen.selectedYear);
    setSelectedMonth(chosen.selectedMonth);
    setSelectedWeek(week);
    setFiltersOpen(false);
    if (chosen.filterType === 'custom' && chosen.startDate && chosen.endDate) {
      void fetchDashboardData({
        period: 'custom',
        startDate: chosen.startDate.toISOString().slice(0, 10),
        endDate: chosen.endDate.toISOString().slice(0, 10),
      });
    }
  };

  const filterButtons: Array<{ value: FilterPeriod; label: string }> = [
    { value: 'day', label: 'Daily' },
    { value: 'week', label: 'Weekly' },
    { value: 'month', label: 'Monthly' },
    { value: 'year', label: 'Yearly' },
    { value: 'custom', label: 'Custom' },
  ];

  if (loading && !dashboardData) {
    return (
      <Layout>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  if (fetchError || !dashboardData?.summary) {
    return (
      <Layout>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 5, gap: 2 }}>
          <Typography color="textSecondary">{fetchError || 'No dashboard data available.'}</Typography>
          <Button variant="contained" onClick={() => { setFetchError(null); fetchDashboardData(); }} sx={{ textTransform: 'none' }}>
            Retry
          </Button>
        </Box>
      </Layout>
    );
  }

  const { summary } = dashboardData;
  const trends: TrendPoint[] = Array.isArray(dashboardData.trends) ? dashboardData.trends : [];

  const periodLabel = filterType === 'week'
    ? `Week ${selectedWeek}, ${selectedYear}`
    : filterType === 'month'
      ? `${MONTHS[selectedMonth - 1]} ${selectedYear}`
      : filterType === 'year'
        ? String(selectedYear)
        : filterType.toUpperCase();

  return (
    <Layout>
      <Box
        sx={{
          maxWidth: 1540,
          mx: 'auto',
          p: { xs: 0.25, sm: 0.75 },
          borderRadius: '24px',
          background: 'radial-gradient(circle at 0% 0%, rgba(23, 162, 180,0.05), transparent 28%), radial-gradient(circle at 100% 12%, rgba(125,194,68,0.05), transparent 24%)',
        }}
      >
        <PageBanner title="Operations Dashboard" subtitle={`Plant performance overview · ${periodLabel}`}>
          <Chip
            label="Live data"
            size="small"
            icon={<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#2EA44F', ml: 1 }} />}
            sx={{
              height: 32,
              px: 0.5,
              fontWeight: 700,
              color: '#0f6b7a',
              bgcolor: '#e6f6f8',
              border: '1px solid #b7e4ea',
              '& .MuiChip-icon': { ml: 0.75 },
            }}
          />
        </PageBanner>

        <Card
          className="aos-fade-up aos-delay-100"
          sx={{
            mb: 2.5,
            borderRadius: '16px',
            border: '1px solid rgba(23, 162, 180,0.14)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(246,251,255,0.96))',
            boxShadow: '0 8px 28px rgba(30,75,110,0.07)',
            overflow: 'visible',
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 2.5 }, '&:last-child': { pb: { xs: 2, md: 2.5 } } }}>
            <Box sx={{ display: isPhone ? 'none' : 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box sx={{ width: 34, height: 34, borderRadius: '10px', display: 'grid', placeItems: 'center', bgcolor: 'rgba(23, 162, 180,0.1)' }}>
                <FilterIcon sx={{ color: '#17a2b4', fontSize: 19 }} />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 700, color: '#25313C', lineHeight: 1.2 }}>
                  Reporting Period
                </Typography>
                <Typography sx={{ fontSize: 11.5, color: '#7A8793', mt: 0.2 }}>
                  Choose a period to update all metrics
                </Typography>
              </Box>
            </Box>
            {isPhone ? (
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={openMobileFilters}
                sx={{
                  minHeight: 48,
                  borderRadius: '14px',
                  textTransform: 'none',
                  fontWeight: 700,
                  justifyContent: 'center',
                  whiteSpace: 'normal',
                  lineHeight: 1.3,
                  color: '#17a2b4',
                  borderColor: 'rgba(23, 162, 180,0.35)',
                  backgroundColor: 'rgba(23, 162, 180,0.06)',
                  '&:hover': { borderColor: '#17a2b4', backgroundColor: 'rgba(23, 162, 180,0.1)' },
                }}
              >
                All filters · {filterType === 'day' && selectedDate
                  ? selectedDate.toLocaleDateString()
                  : filterType === 'custom' && startDate && endDate
                    ? `${startDate.toLocaleDateString()} – ${endDate.toLocaleDateString()}`
                    : periodLabel}
              </Button>
            ) : null}
            <Box sx={{
              display: isPhone ? 'none' : 'block',
              mb: 2,
              overflowX: 'auto',
              pb: 1,
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}>
              <ButtonGroup
                variant="outlined"
                sx={{
                  flexWrap: 'nowrap',
                  p: 0.5,
                  bgcolor: 'rgba(23, 162, 180,0.05)',
                  borderRadius: '13px',
                  gap: 0.5,
                  '& .MuiButtonGroup-grouped:not(:last-of-type)': { borderRightColor: 'rgba(23, 162, 180,0.16)' },
                }}
              >
                {filterButtons.map((btn) => (
                  <Button
                    key={btn.value}
                    onClick={() => setFilterType(btn.value)}
                    variant={filterType === btn.value ? 'contained' : 'outlined'}
                    size={isPhone ? 'large' : 'medium'}
                    sx={{
                      textTransform: 'none',
                      minWidth: { xs: '70px', sm: '100px' },
                      minHeight: isPhone ? 48 : undefined,
                      fontSize: { xs: '0.8rem', sm: '0.875rem' },
                      px: { xs: 1, sm: 2 },
                      backgroundColor: filterType === btn.value ? '#17a2b4' : 'transparent',
                      borderColor: filterType === btn.value ? '#17a2b4' : 'transparent',
                      color: filterType === btn.value ? '#ffffff' : '#17a2b4',
                      borderRadius: '10px !important',
                      fontWeight: 600,
                      boxShadow: filterType === btn.value ? '0 5px 12px rgba(23, 162, 180,0.2)' : 'none',
                      '&:hover': {
                        backgroundColor: filterType === btn.value ? '#0f6b7a' : 'rgba(23, 162, 180, 0.08)',
                        borderColor: filterType === btn.value ? '#17a2b4' : 'transparent',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {btn.label}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
            <Box sx={{ display: isPhone ? 'none' : 'block' }}>
            {filterType === 'day' && (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box sx={{ mt: 2, maxWidth: 300 }}>
                  <DatePicker
                    label="Select Date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue ?? null)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        sx: { '& .MuiOutlinedInput-root': { borderRadius: '12px' } }
                      }
                    }}
                  />
                </Box>
              </LocalizationProvider>
            )}
            {filterType === 'week' && (
              <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="medium" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}>
                    <InputLabel id="dashboard-week-year-label">Year</InputLabel>
                    <Select
                      labelId="dashboard-week-year-label"
                      label="Year"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                      {Array.from({ length: currentYear - minYear + 1 }, (_, i) => currentYear - i).map((y) => (
                        <MenuItem key={y} value={y}>{y}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="medium" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}>
                    <InputLabel id="dashboard-week-label">Week</InputLabel>
                    <Select
                      labelId="dashboard-week-label"
                      label="Week"
                      value={selectedWeek}
                      onChange={(e) => setSelectedWeek(Number(e.target.value))}
                    >
                      {Array.from({ length: getWeeksInYear(selectedYear) }, (_, i) => i + 1).map((w) => (
                        <MenuItem key={w} value={w}>Week {w}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 500,
                      py: 1.5,
                      px: 2,
                      borderRadius: '12px',
                      bgcolor: 'action.hover',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    {formatWeekRangeLabel(selectedYear, selectedWeek)}
                  </Typography>
                </Grid>
              </Grid>
            )}
            {filterType === 'month' && (
              <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="medium" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}>
                    <InputLabel id="dashboard-month-year-label">Year</InputLabel>
                    <Select
                      labelId="dashboard-month-year-label"
                      label="Year"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                      {Array.from({ length: currentYear - minYear + 1 }, (_, i) => currentYear - i).map((y) => (
                        <MenuItem key={y} value={y}>{y}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="medium" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}>
                    <InputLabel id="dashboard-month-label">Month</InputLabel>
                    <Select
                      labelId="dashboard-month-label"
                      label="Month"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    >
                      {MONTHS.map((name, i) => (
                        <MenuItem key={name} value={i + 1}>{name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            )}
            {filterType === 'year' && (
              <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="medium" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}>
                    <InputLabel id="dashboard-year-label">Year</InputLabel>
                    <Select
                      labelId="dashboard-year-label"
                      label="Year"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                      {Array.from({ length: currentYear - minYear + 1 }, (_, i) => currentYear - i).map((y) => (
                        <MenuItem key={y} value={y}>{y}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            )}
            {filterType === 'custom' && (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue ?? null)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          sx: { '& .MuiOutlinedInput-root': { borderRadius: '12px' } }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue ?? null)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          sx: { '& .MuiOutlinedInput-root': { borderRadius: '12px' } }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      onClick={() => fetchDashboardData()}
                      disabled={!startDate || !endDate || startDate > endDate}
                      fullWidth={isPhone}
                      size={isPhone ? 'large' : 'medium'}
                      sx={{ textTransform: 'none', borderRadius: '12px', minHeight: isPhone ? 48 : undefined }}
                    >
                      Apply
                    </Button>
                  </Grid>
                </Grid>
              </LocalizationProvider>
            )}
            </Box>
          </CardContent>
        </Card>

        <Drawer
          anchor="bottom"
          open={isPhone && filtersOpen}
          onClose={() => setFiltersOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: '18px 18px 0 0',
              maxHeight: '88vh',
              pb: 'env(safe-area-inset-bottom, 0px)',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5, borderBottom: '1px solid #f1f5f9' }}>
            <Box>
              <Typography sx={{ fontWeight: 700, color: '#0f172a' }}>All filters</Typography>
              <Typography sx={{ fontSize: 12, color: '#64748b' }}>Choose a period, then apply</Typography>
            </Box>
            <IconButton aria-label="Close filters" onClick={() => setFiltersOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ px: 2, py: 2, overflow: 'auto' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {filterButtons.map((btn) => (
                <Button
                  key={btn.value}
                  onClick={() => setDraftType(btn.value)}
                  variant={draftType === btn.value ? 'contained' : 'outlined'}
                  sx={{
                    textTransform: 'none',
                    flex: '1 1 calc(33% - 8px)',
                    minHeight: 44,
                    borderRadius: '10px',
                    fontWeight: 700,
                    backgroundColor: draftType === btn.value ? '#17a2b4' : 'transparent',
                    borderColor: '#17a2b4',
                    color: draftType === btn.value ? '#fff' : '#17a2b4',
                  }}
                >
                  {btn.label}
                </Button>
              ))}
            </Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {draftType === 'day' && (
                <DatePicker
                  label="Select Date"
                  value={draftDate}
                  onChange={(value) => setDraftDate(value)}
                  slotProps={{ textField: { fullWidth: true, sx: { '& .MuiOutlinedInput-root': { borderRadius: '12px' } } } }}
                />
              )}
              {draftType === 'week' && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Year</InputLabel>
                      <Select label="Year" value={draftYear} onChange={(e) => setDraftYear(Number(e.target.value))}>
                        {Array.from({ length: currentYear - minYear + 1 }, (_, i) => currentYear - i).map((y) => (
                          <MenuItem key={y} value={y}>{y}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Week</InputLabel>
                      <Select label="Week" value={draftWeek} onChange={(e) => setDraftWeek(Number(e.target.value))}>
                        {Array.from({ length: getWeeksInYear(draftYear) }, (_, i) => i + 1).map((w) => (
                          <MenuItem key={w} value={w}>Week {w}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>{formatWeekRangeLabel(draftYear, draftWeek)}</Typography>
                  </Grid>
                </Grid>
              )}
              {draftType === 'month' && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Year</InputLabel>
                      <Select label="Year" value={draftYear} onChange={(e) => setDraftYear(Number(e.target.value))}>
                        {Array.from({ length: currentYear - minYear + 1 }, (_, i) => currentYear - i).map((y) => (
                          <MenuItem key={y} value={y}>{y}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Month</InputLabel>
                      <Select label="Month" value={draftMonth} onChange={(e) => setDraftMonth(Number(e.target.value))}>
                        {MONTHS.map((name, i) => (
                          <MenuItem key={name} value={i + 1}>{name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              )}
              {draftType === 'year' && (
                <FormControl fullWidth>
                  <InputLabel>Year</InputLabel>
                  <Select label="Year" value={draftYear} onChange={(e) => setDraftYear(Number(e.target.value))}>
                    {Array.from({ length: currentYear - minYear + 1 }, (_, i) => currentYear - i).map((y) => (
                      <MenuItem key={y} value={y}>{y}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {draftType === 'custom' && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <DatePicker
                      label="Start Date"
                      value={draftStart}
                      onChange={(value) => setDraftStart(value)}
                      slotProps={{ textField: { fullWidth: true, sx: { '& .MuiOutlinedInput-root': { borderRadius: '12px' } } } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DatePicker
                      label="End Date"
                      value={draftEnd}
                      onChange={(value) => setDraftEnd(value)}
                      slotProps={{ textField: { fullWidth: true, sx: { '& .MuiOutlinedInput-root': { borderRadius: '12px' } } } }}
                    />
                  </Grid>
                </Grid>
              )}
            </LocalizationProvider>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, p: 2, borderTop: '1px solid #f1f5f9' }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => applyMobileFilters({
                filterType: 'month',
                selectedDate: new Date(),
                startDate: null,
                endDate: null,
                selectedYear: currentYear,
                selectedMonth: currentDate.getMonth() + 1,
                selectedWeek: getCalendarWeek(currentDate),
              })}
              sx={{ minHeight: 48, borderRadius: '12px', textTransform: 'none', fontWeight: 700 }}
            >
              Clear
            </Button>
            <Button
              fullWidth
              variant="contained"
              disabled={draftType === 'custom' && (!draftStart || !draftEnd || draftStart > draftEnd)}
              onClick={() => applyMobileFilters()}
              sx={{ minHeight: 48, borderRadius: '12px', textTransform: 'none', fontWeight: 700, backgroundColor: '#17a2b4' }}
            >
              Apply
            </Button>
          </Box>
        </Drawer>

        <Card
          className="aos-fade-up aos-delay-200"
          sx={{
            borderRadius: '18px',
            border: '1px solid rgba(23, 162, 180,0.12)',
            boxShadow: '0 12px 38px rgba(30,75,110,0.08)',
            background: 'rgba(255,255,255,0.92)',
            overflow: 'hidden',
            '& .hover-lift': {
              boxShadow: '0 5px 16px rgba(30,75,110,0.06)',
              borderTop: '1px solid rgba(255,255,255,0.8)',
              '&:hover': {
                boxShadow: '0 10px 24px rgba(30,75,110,0.11)',
                transform: 'translateY(-2px)',
              },
            },
          }}
        >
          <CardContent sx={{ p: { xs: 1.5, md: 2.25 }, '&:last-child': { pb: { xs: 1.5, md: 2.25 } } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#25313C', letterSpacing: '-0.01em' }}>
                  MIS Summary
                </Typography>
                <Typography sx={{ fontSize: 12, color: '#7A8793', mt: 0.25 }}>{periodLabel}</Typography>
              </Box>
              <Chip
                label="Aggregate"
                size="small"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #7dc244 0%, #139B49 100%)',
                  color: '#ffffff',
                  borderRadius: '9px',
                  px: 1,
                  boxShadow: '0 5px 12px rgba(19,155,73,0.18)',
                }}
              />
            </Box>

            {/* Overall Production Summary */}
            <Box
              className="aos-fade-right aos-delay-300"
              sx={{
                mb: 1.5,
                boxShadow: 'none',
                border: '1px solid rgba(23, 162, 180, 0.2)',
                borderRadius: '16px !important',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                backgroundColor: '#fff',
                '&:hover': {
                  boxShadow: '0 4px 20px rgba(23, 162, 180, 0.15)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Box
                className="gradient-header"
                sx={{
                  background: 'linear-gradient(120deg, #0f6b7a 0%, #2cc4d4 72%, #5fe0e6 100%)',
                  color: '#ffffff',
                  borderRadius: '16px 16px 0 0',
                  minHeight: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  px: 2.25,
                  boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.16)',
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.01em' }}>Overall Production Summary</Typography>
              </Box>
              <Box sx={{ p: { xs: 1.5, md: 2.25 }, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} lg={3}>
                    <DashboardMetricCard
                      title="Total Feed"
                      value={formatNumber(Number(summary.totalFeed ?? 0))}
                      unit="tons"
                      subtitle={`Avg / day ${formatNumber(summary.avgFeed ?? 0)} tons · ${summary.totalEntries ?? 0} days`}
                      color="#8B5CF6"
                      icon={<Box component="img" src={feedIcon} alt="" />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <DashboardMetricCard
                      title="Total Raw Biogas"
                      value={formatNumber(summary.totalRawBiogas ?? 0)}
                      unit="m³"
                      subtitle={`Avg / day ${formatNumber(summary.avgRawBiogas ?? 0)} m³ · ${summary.totalEntries ?? 0} days`}
                      color="#17a2b4"
                      icon={<Box component="img" src={biogasIcon} alt="" />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <DashboardMetricCard
                      title="CBG Produced"
                      value={formatNumber(summary.totalCBGProduced ?? 0)}
                      unit="kg"
                      subtitle={`Avg / day ${formatNumber(summary.avgCBGProduced ?? 0)} kg · ${summary.totalEntries ?? 0} days`}
                      color="#62A93B"
                      icon={<Box component="img" src={cbgIcon} alt="" />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <DashboardMetricCard
                      title="CBG Sold"
                      value={formatNumber(summary.totalCBGSold ?? 0)}
                      unit="kg"
                      subtitle={`Avg / day ${formatNumber(summary.avgCBGSold ?? 0)} kg · ${summary.totalEntries ?? 0} days`}
                      color="#EE6A31"
                      icon={<Box component="img" src={soldIcon} alt="" />}
                      onClick={handleCBGSoldClick}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>

            <ProductionTrendChart
              trends={trends}
              filterType={filterType}
              year={selectedYear}
            />

            {/* Fertilizer & Plant Availability */}
            <Box
              className="aos-fade-right aos-delay-400"
              sx={{
                mb: 1.5,
                boxShadow: 'none',
                border: '1px solid rgba(125, 194, 68, 0.36)',
                borderRadius: '16px !important',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                backgroundColor: '#fff',
                '&:hover': {
                  boxShadow: '0 6px 24px rgba(34,139,34,0.12)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(120deg, #0f6b7a 0%, #2cc4d4 72%, #5fe0e6 100%)',
                  color: '#ffffff',
                  borderRadius: '16px 16px 0 0',
                  minHeight: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  px: 2.25,
                  boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.16)',
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.01em' }}>Fertilizer & Plant Availability</Typography>
              </Box>
              <Box sx={{ p: { xs: 1.5, md: 2.25 }, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                <Grid container spacing={2}>
                  {/* Avg Availability - commented out for now
                  <Grid item xs={12} sm={4}>
                    <Box className="hover-lift" sx={{ p: 2.5, background: 'linear-gradient(135deg, rgba(125, 194, 68, 0.08) 0%, rgba(125, 194, 68, 0.03) 100%)', borderRadius: '12px', borderLeft: '4px solid #7dc244', transition: 'all 0.3s ease' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="caption" sx={{ color: '#58595B', fontWeight: 500 }}>Avg Availability</Typography>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#7dc244', mt: 0.5 }}>{formatNumber(summary.avgPlantAvailability ?? 0)}%</Typography>
                        </Box>
                        <AvgIcon sx={{ fontSize: 32, color: '#7dc244', opacity: 0.7 }} />
                      </Box>
                    </Box>
                  </Grid>
                  */}
                  <Grid item xs={12} sm={6}>
                    <DashboardMetricCard
                      title="FOM Produced"
                      value={formatNumber(summary.totalFOMProduced ?? 0)}
                      unit="kg"
                      subtitle={`Avg / day ${formatNumber(summary.avgFOMProduced ?? 0)} kg`}
                      color="#17a2b4"
                      icon={<Box component="img" src={fomIcon} alt="" />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DashboardMetricCard
                      title="FOM Sold"
                      value={formatNumber(summary.totalFOMSold ?? 0)}
                      unit="kg"
                      subtitle={`Avg / day ${formatNumber(summary.avgFOMSold ?? 0)} kg`}
                      color="#EE6A31"
                      icon={<Box component="img" src={fomSoldIcon} alt="" />}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>

            {/* Input/Output per day & Sold per day & Petrol/Diesel — hidden for now */}
            {SHOW_DAILY_AVERAGES && (
            <Box
              className="aos-fade-right aos-delay-450"
              sx={{
                mb: 1.5,
                boxShadow: 'none',
                border: '1px solid rgba(125, 194, 68, 0.36)',
                borderRadius: '16px !important',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                backgroundColor: '#fff',
                '&:hover': {
                  boxShadow: '0 6px 24px rgba(34,139,34,0.12)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #0f6b7a 0%, #17a2b4 100%)',
                  color: '#ffffff',
                  borderRadius: '12px 12px 0 0',
                  minHeight: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  px: 2,
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: { xs: '0.92rem', sm: '1rem' }, lineHeight: 1.35 }}>Averages per Day · Sold per Day · Petrol/Diesel</Typography>
              </Box>
              <Box sx={{ p: { xs: 1.5, md: 3 }, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 1.5 }}>Based on {summary.totalEntries ?? 0} days in selected period (week / month / year / quarter / custom).</Typography>
                <Typography variant="subtitle2" sx={{ color: '#555', fontWeight: 600, mb: 1.5 }}>Input & Output produced per day (CBG, FOM, LFOM)</Typography>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6} md={2}>
                    <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: 'rgba(23, 162, 180, 0.06)', borderLeft: '3px solid #17a2b4' }}>
                      <Typography variant="caption" sx={{ color: '#58595B' }}>Feed (Input) per day</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: '#17a2b4' }}>{formatNumber(summary.feedPerEntry ?? 0)} tons</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
                    <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: 'rgba(125, 194, 68, 0.08)', borderLeft: '3px solid #7dc244' }}>
                      <Typography variant="caption" sx={{ color: '#58595B' }}>CBG produced/day</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: '#7dc244' }}>{formatNumber(summary.cbgProducedPerEntry ?? 0)} kg</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
                    <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: 'rgba(125, 194, 68, 0.08)', borderLeft: '3px solid #7dc244' }}>
                      <Typography variant="caption" sx={{ color: '#58595B' }}>FOM produced/day</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: '#7dc244' }}>{formatNumber(summary.fomProducedPerEntry ?? 0)} kg</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
                    <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: 'rgba(245, 158, 11, 0.1)', borderLeft: '3px solid #F59E0B' }}>
                      <Typography variant="caption" sx={{ color: '#58595B' }}>LFOM sold/day</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: '#b45309' }}>{formatNumber(summary.lfomSoldPerEntry ?? 0)}</Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Typography variant="subtitle2" sx={{ color: '#555', fontWeight: 600, mb: 1.5 }}>Sold per day (plant wise)</Typography>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6} md={2}>
                    <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: 'rgba(238, 106, 49, 0.08)', borderLeft: '3px solid #ee6a31' }}>
                      <Typography variant="caption" sx={{ color: '#58595B' }}>CBG sold/day</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: '#ee6a31' }}>{formatNumber(summary.cbgSoldPerEntry ?? 0)} kg</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
                    <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: 'rgba(238, 106, 49, 0.08)', borderLeft: '3px solid #ee6a31' }}>
                      <Typography variant="caption" sx={{ color: '#58595B' }}>FOM sold/day</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: '#ee6a31' }}>{formatNumber(summary.fomSoldPerEntry ?? 0)} kg</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
                    <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: 'rgba(238, 106, 49, 0.08)', borderLeft: '3px solid #ee6a31' }}>
                      <Typography variant="caption" sx={{ color: '#58595B' }}>LFOM sold/day</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: '#ee6a31' }}>{formatNumber(summary.lfomSoldPerEntry ?? 0)}</Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Typography variant="subtitle2" sx={{ color: '#555', fontWeight: 600, mb: 1.5 }}>Petrol & Diesel — avg qty per day (customers)</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: 'rgba(34, 197, 94, 0.08)', borderLeft: '3px solid #22c55e' }}>
                      <Typography variant="caption" sx={{ color: '#58595B' }}>Petrol avg per day</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: '#16a34a' }}>{formatNumber(summary.petrolAvgPerEntry ?? 0)}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: 'rgba(234, 179, 8, 0.12)', borderLeft: '3px solid #eab308' }}>
                      <Typography variant="caption" sx={{ color: '#58595B' }}>Diesel avg per day</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: '#ca8a04' }}>{formatNumber(summary.dieselAvgPerEntry ?? 0)}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            )}

            {/* Utilities & HSE Summary */}
            <Box
              className="aos-fade-right aos-delay-500"
              sx={{
                boxShadow: 'none',
                border: '1px solid rgba(238, 106, 49, 0.2)',
                borderRadius: '16px !important',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                backgroundColor: '#fff',
                '&:hover': {
                  boxShadow: '0 4px 20px rgba(238, 106, 49, 0.15)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(120deg, #0f6b7a 0%, #2cc4d4 72%, #5fe0e6 100%)',
                  color: '#ffffff',
                  borderRadius: '16px 16px 0 0',
                  minHeight: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  px: 2.25,
                  boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.16)',
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.01em' }}>Utilities & HSE Summary</Typography>
              </Box>
              <Box sx={{ p: { xs: 1.5, md: 2.25 }, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <DashboardMetricCard
                      title="Electricity Consumption"
                      value={formatNumber(summary.totalElectricityConsumption ?? 0)}
                      unit="kWh"
                      subtitle="Total usage for selected period"
                      color="#17a2b4"
                      icon={<Box component="img" src={powerIcon} alt="" />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DashboardMetricCard
                      title="HSE Incidents"
                      value={formatNumber(summary.totalHSEIncidents ?? 0)}
                      subtitle={Number(summary.totalHSEIncidents ?? 0) === 0 ? 'All systems safe' : 'Review incident records'}
                      color={Number(summary.totalHSEIncidents ?? 0) === 0 ? '#62A93B' : '#EE6A31'}
                      icon={<Box component="img" src={safetyIcon} alt="" />}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Dialog
        open={cbgBreakdownOpen}
        onClose={() => setCBGBreakdownOpen(false)}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Zoom}
        TransitionProps={{ timeout: 400 }}
      >
        <DialogTitle>CBG Sales Detail</DialogTitle>
        <DialogContent className="aos-fade-up">
          {cbgLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box>
          ) : cbgBreakdownData.length === 0 ? (
            <Typography align="center" color="textSecondary">No sales data for this period.</Typography>
          ) : (
            <TableContainer component={Paper} elevation={0} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: '#fff', bgcolor: '#17a2b4', borderBottom: 'none' }}>Customer</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, color: '#fff', bgcolor: '#17a2b4', borderBottom: 'none' }}>Quantity (kg)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cbgBreakdownData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.customerName}</TableCell>
                      <TableCell align="right">{formatNumber(row.totalQuantity)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setCBGBreakdownOpen(false)}
            variant="outlined"
            sx={{
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: 700,
              minHeight: 40,
              px: 2.25,
              color: '#334155',
              borderColor: '#94a3b8',
              borderWidth: 1.5,
              '&:hover': {
                borderWidth: 1.5,
                borderColor: '#17a2b4',
                color: '#17a2b4',
                bgcolor: 'rgba(23, 162, 180, 0.06)',
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
