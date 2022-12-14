import { Component, OnInit, ViewChild } from '@angular/core';
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
  ApexResponsive,
} from 'ng-apexcharts';

export interface VisitorChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  colors: string[];
  stroke: any;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
}

@Component({
  selector: 'app-equipment-categories',
  templateUrl: './equipment-categories.component.html',
  styleUrls: ['./equipment-categories.component.scss'],
})
export class EquipmentCategoriesComponent implements OnInit {
  @ViewChild('visitor-chart') chart2: ChartComponent = Object.create(null);
  public VisitorChartOptions: Partial<VisitorChartOptions>;

  texts = TEXTS;

  constructor() {
    this.VisitorChartOptions = {
      series: [45, 15, 27, 18],
      chart: {
        type: 'donut',
        fontFamily: 'Poppins,sans-serif',
        height: 230,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '80px',
          },
        },
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      legend: {
        show: false,
      },
      labels: ['Mobile', 'Tablet', 'Desktop', 'Others'],
      colors: ['#1e88e5', '#26c6da', '#745af2', '#eceff1'],
      responsive: [
        {
          breakpoint: 767,
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
    };
  }

  ngOnInit(): void {}
}
