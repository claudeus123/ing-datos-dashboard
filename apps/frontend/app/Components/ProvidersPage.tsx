import { ChartComponent } from "./ChartComponent";

export function ProvidersPage(props: ChartProps) {
  
  return (
    <div className="flex justify-center">
        <ChartComponent {...props}></ChartComponent>
    </div>
	);
}