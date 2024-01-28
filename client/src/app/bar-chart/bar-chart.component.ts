import { Component, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {
  radioValue = 'A';
  private newLabel? = 'New label';

  constructor() {
    Chart.register(Annotation);
  }


  chefCapacity : number[] = [
  36000, 31000, 33000, 36000, 31000, 34000,
  37000, 34000, 32000, 37000, 37000, 30000,
  34000, 33000, 32000, 39000, 35000, 30000,
  32000, 34000, 37000, 32000, 38000, 34000,
  37000, 39000, 31000, 37000, 35000, 30000,
  30000, 33000, 33000, 40000, 35000, 38000,
  30000, 39000, 37000, 35000, 40000, 34000,
  34000, 36000, 36000, 36000, 40000, 31000,
  38000, 33000, 32000, 30000, 39000, 34000,
  34000, 37000, 34000, 37000, 35000, 30000
]


  orderVolume : number[] = [
  23901, 20811, 21890, 40862, 25477, 29644,
  44678, 41630, 44037, 33843, 44006, 34311,
  38187, 44773, 43895, 41200, 29439, 21454,
  43923, 48776, 34570, 29390, 27421, 37987,
  34211, 44969, 48459, 26174, 23227, 20045,
  48104, 48918, 26903, 28610, 35764, 31861,
  24339, 49607, 48331, 49096, 42967, 33277,
  29662, 28577, 44913, 38094, 48602, 45559,
  38309, 36557, 38985, 44941, 43389, 34605,
  23143, 47346, 48991, 49637, 28873, 20813
]
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.orderVolume,
        label: 'Order Volume',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: this.chefCapacity,
        label: 'Chef Capacity',
        yAxisID: 'y',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [165, 165, 165, 165, 615,65, 65],
        label: 'Chef Capacity',
        yAxisID: 'y',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: [
  'Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5',
  'Feb 1', 'Feb 2', 'Feb 3', 'Feb 4', 'Feb 5',
  'Mar 1', 'Mar 2', 'Mar 3', 'Mar 4', 'Mar 5',
  'Apr 1', 'Apr 2', 'Apr 3', 'Apr 4', 'Apr 5',
  'May 1', 'May 2', 'May 3', 'May 4', 'May 5',
  'Jun 1', 'Jun 2', 'Jun 3', 'Jun 4', 'Jun 5',
  'Jul 1', 'Jul 2', 'Jul 3', 'Jul 4', 'Jul 5',
  'Aug 1', 'Aug 2', 'Aug 3', 'Aug 4', 'Aug 5',
  'Sep 1', 'Sep 2', 'Sep 3', 'Sep 4', 'Sep 5',
  'Oct 1', 'Oct 2', 'Oct 3', 'Oct 4', 'Oct 5',
  'Nov 1', 'Nov 2', 'Nov 3', 'Nov 4', 'Nov 5',
  'Dec 1', 'Dec 2', 'Dec 3', 'Dec 4', 'Dec 5'
],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      y: {
        position: 'left',
        title: {
          display: true, 
          text: 'Time in minutes', 
          font: {
            size: 12,
            family: 'Proxima'
          },
        } 
      },
      // y1: {
      //   position: 'right',
      //   grid: {
      //     color: 'rgba(255,0,0,0.3)',
      //   },
      //   ticks: {
      //     color: 'red',
      //   },
      // },
    },

    plugins: {
      legend: { display: true },
      // annotation: {
      //   annotations: [
      //     {
      //       type: 'line',
      //       scaleID: 'x',
      //       value: '',
      //       borderColor: 'orange',
      //       borderWidth: 2,
      //       label: {
      //         display: true,
      //         position: 'center',
      //         color: 'orange',
      //         content: 'LineAnno',
      //         font: {
      //           weight: 'bold',
      //         },
      //       },
      //     },
      //   ],
      // },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor(Math.random() * (i < 2 ? 100 : 1000) + 1);
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        this.lineChartData.datasets[i].data[j] =
          BarChartComponent.generateNumber(i);
      }
    }
    this.chart?.update();
  }

  // events
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

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.datasets.forEach((x, i) => {
      const num = BarChartComponent.generateNumber(i);
      x.data.push(num);
    });
    this.lineChartData?.labels?.push(
      `Label ${this.lineChartData.labels.length}`
    );

    this.chart?.update();
  }

  public changeColor(): void {
    this.lineChartData.datasets[2].borderColor = 'green';
    this.lineChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;

    this.chart?.update();
  }

  public changeLabel(): void {
    const tmp = this.newLabel;
    this.newLabel = this.lineChartData.datasets[2].label;
    this.lineChartData.datasets[2].label = tmp;

    this.chart?.update();
  }

  shiftChange(): void {
    this.randomize()
  }
}
