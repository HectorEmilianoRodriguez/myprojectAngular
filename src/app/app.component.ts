import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    public loading = false

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }

    showLoading() {
        setTimeout(() => {
            this.loading = true;
        }, 0);
    }


    hideLoading() {
        setTimeout(() => {
            this.loading = false;
        }, 100);
    }


}


