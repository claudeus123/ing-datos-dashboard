'use client'
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const ChartComponent = (props: ChartProps) => {
  const data = props.data;
  const backgroundColor = props.colors.backgroundColor;
  const lineColor = props.colors.lineColor;
  const textColor = props.colors.textColor;
  const areaTopColor = props.colors.areaTopColor;
  const areaBottomColor = props.colors.areaBottomColor;

	const chartContainerRef = useRef<HTMLDivElement>(null);

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
			};

			const chart = createChart(chartContainerRef.current!, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor! },
				},
				width: chartContainerRef.current!.clientWidth,
				height: 300,
			});
			chart.timeScale().fitContent();

			const newSeries = chart.addAreaSeries({ lineColor: lineColor!, topColor: areaTopColor!, bottomColor: areaBottomColor! });
			newSeries.setData(data);

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (
		<div
			ref={chartContainerRef}
		/>
	);
};