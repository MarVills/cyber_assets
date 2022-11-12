
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild, OnInit } from '@angular/core';
import { TEXTS } from '../../dashboardTexts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexResponsive
} from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard-equipment',
  templateUrl: './dashboard-equipment.component.html',
  styleUrls: ['./dashboard-equipment.component.scss']
})
export class DashboardEquipmentComponent implements OnInit {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public inexpuchartOptions: Partial<inexpuchartOptions>;

  texts = TEXTS;

  constructor(){
    
    this.inexpuchartOptions = {
      series: [
        {
          name: '',
          data: [1.1, 1.4, 1.1, 0.9, 1.9, 1, 0.3, 1.1]
        }
      ],
      chart: {
        type: 'bar',
        height: 90,
        fontFamily: 'Poppins,sans-serif',
        sparkline: {
          enabled: true
        }
      },
      grid: {
        borderColor: 'rgba(0,0,0,.2)',
        strokeDashArray: 3,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '60%',
          // endingShape: 'flat'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul'
        ]
      },

      legend: {
        show: false,
      },
      fill: {
        colors: ['rgba(255, 255, 255, 0.5)'],
        opacity: 1
      },
      tooltip: {
        theme: "light",
        fillSeriesColor: false,
        marker: {
          show: true,
          fillColors: ['#fff']
        },
        x: {
          show: false
        }
      }
    };
  }
  ngOnInit(): void{}
}

export interface inexpuchartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
}





