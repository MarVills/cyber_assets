import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-notes',
  templateUrl: './dashboard-notes.component.html',
  styleUrls: ['./dashboard-notes.component.scss']
})
export class DashboardNotesComponent implements OnInit {

  notes = NOTES;

  constructor() { }

  ngOnInit(): void {
  }

}

export const NOTES= [
  {
    title: "Note 1",
    description: "desc 1",
  },
  {
    title: "Note 2",
    description: "desc 2",
  },
  {
    title: "Note 3",
    description: "desc 3",
  },
  {
    title: "Note 4",
    description: "desc 4",
  },
  {
    title: "Note 5",
    description: "desc 5",
  },
  {
    title: "Note 6",
    description: "desc 6",
  },
  {
    title: "Note 7",
    description: "desc 7",
  },
  {
    title: "Note 8",
    description: "desc 8",
  },
  {
    title: "Note 9",
    description: "desc 9",
  },
]
