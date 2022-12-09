import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { TEXTS } from '../../dashboardTexts';
import {
  EquipmentsWithSelectedStatus,
  EQUIPMENT_DATA,
} from 'src/app/Models/equipment.model';
import { CATEGORY_DATA } from 'src/app/Models/category.model';
import { EquipmentsService } from 'src/app/store/services/inventory/equipments/equipments.service';
import { CategoriesService } from 'src/app/store/services/inventory/equipments/categories.service';
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
import { Equipments } from 'src/app/store/state/equipments.state';

@Component({
  selector: 'app-dashboard-equipment',
  templateUrl: './dashboard-equipment.component.html',
  styleUrls: ['./dashboard-equipment.component.scss'],
})
export class DashboardEquipmentComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  @Input() totalEquipment: number = 0;
  public inexpuchartOptions: Partial<inexpuchartOptions>;
  equipmentsByCategory: Map<string, Equipments[]> = new Map<
    string,
    Equipments[]
  >();
  texts = TEXTS;

  constructor(
    private equipmentsService: EquipmentsService,
    private categoriesService: CategoriesService
  ) {
    this.inexpuchartOptions = {
      series: [
        {
          name: '',
          data: [1.1, 1.4, 1.1, 0.9, 1.0, 1, 0.3, 1.1],
        },
      ],
      chart: {
        type: 'bar',
        height: 90,
        fontFamily: 'Poppins,sans-serif',
        sparkline: {
          enabled: true,
        },
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
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },

      legend: {
        show: false,
      },
      fill: {
        colors: ['rgba(255, 255, 255, 0.5)'],
        opacity: 1,
      },
      tooltip: {
        theme: 'light',
        fillSeriesColor: false,
        marker: {
          show: true,
          fillColors: ['#fff'],
        },
        x: {
          show: false,
        },
      },
    };
  }
  ngOnInit(): void {
    this.categoriesService.onFetchCategories();
  }

  setEquipmentsByCategories() {
    CATEGORY_DATA.forEach((category) => {
      let filteredEquipment = EQUIPMENT_DATA.filter(
        (equipment) => equipment.category === category.category_name
      );
      const values = {
        isSelected: false,
        items: filteredEquipment,
      };
    });
  }
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
