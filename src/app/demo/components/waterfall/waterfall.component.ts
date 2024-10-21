import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { waterfallService } from './services/waterfall-service';
@Component({
  templateUrl: './waterfall.component.html',
  styleUrl: './waterfall.component.scss'
})
export class WaterfallComponent implements OnInit{
 /* events: any[] = [
    { date: '2023-10-01', detail: 'Event 1' },
    { date: '2023-10-02', detail: 'Event 2' },
    { date: '2023-10-03', detail: 'Event 3' },
    { date: '2023-10-04', detail: 'Event 4' }
  ];*/  
  events: any[] = [];
  idw: string;
  idb: string;
  constructor(private ar: ActivatedRoute, private ws: waterfallService){
      

  }

  ngOnInit(): void {
    this.ar.paramMap.subscribe(params =>{

      this.idb = params.get('idb');
      this.idw = params.get('id');

      this.ws.getCards(this.idb).subscribe({

          next: (res) =>{
            this.events = res;
          },
          error: (er) =>{
            console.log(er);
          }

      });

    });
  }


}
