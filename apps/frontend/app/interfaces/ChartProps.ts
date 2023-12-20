interface ChartProps {
  data: {time: string, value: number}[],
  colors: {
    backgroundColor: string | null,
    lineColor: string | null,
    textColor: string | null,
    areaTopColor: string | null,
    areaBottomColor: string | null,
  }
}