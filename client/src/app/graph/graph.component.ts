import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { getISOWeek } from 'date-fns';

interface Details {
  key: string;
  employees: number;
  orders: number;
  sales: number;
  efficiency: number;
}

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
            family: 'Proxima'
          },
        },
      },
      y: {
        min: 10,
        ticks: {
          font: {
            size: 12, 
            family: 'Proxima'
          },
        },
        title: {
          display: true, 
          text: 'Total Employees', 
          font: {
            size: 12,
            family: 'Proxima'
          },
        } 
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 12,
          family: 'Proxima'
        }
      } ,
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'],
    datasets: [
      { data: [12, 16, 19, 15, 11, 12, 20], label: 'Day Shift' },
      { data: [12, 16, 19, 15, 11, 12, 21], label: 'Night Shift' },
    ],
  };
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public randomize(): void {
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 22),
      21,
      19,
      Math.round(Math.random() * 22),
      15,
      Math.round(Math.random() * 22),
      14,
    ];

    this.chart?.update();
  }

  listOfData: Details[] = [
    {
      key: '1',
      employees: 25,
      orders: 32,
      sales: 42599,
      efficiency: .8
    },
    {
      key: '2',
      employees: 25,
      orders: 32,
      sales: 42599,
      efficiency: .5
    },
    {
      key: '3',
      employees: 25,
      orders: 32,
      sales: 42599,
      efficiency: 1
    }
  ];
  date = null;
  isEnglish = false;

  ngOnInit():void {
    
  }


  onChange(result: Date): void {
    console.log('onChange: ', result);
    this.randomize()
  }

  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result));
    this.randomize()
  }

}
