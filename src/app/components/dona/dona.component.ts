import { Component, OnInit, Input } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent implements OnInit {

  @Input('p_title') title: string = "Component Odre_Graph";

  // Doughnut
  @Input('p_labelsGrafica') doughnutChartLabels: Label[] = ["g1", "g2", "g3"]
  @Input('p_chartData') doughnutChartData: MultiDataSet = [ 
    [350, 450, 100] 
  ];
  public doughnutChartType: ChartType = 'doughnut';

  colors:  Color[] = [
    { backgroundColor: ['#6857E6', '#FFB414', '#F02059'] }
  ]

  constructor() { }

  ngOnInit(): void {

  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
