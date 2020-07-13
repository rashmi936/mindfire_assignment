import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, AirportService, AircraftService, TransactionService } from '@app/_services';

@Component({ templateUrl: 'add-edit-transcation.component.html' })


export class AddEditTransactionComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    aircrafts : any;
    airports : any;
    transaction_type = ['IN',"OUT"];


    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private aircraftService: AircraftService,
        private airportService: AirportService,
        private transcationService: TransactionService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        
        this.aircraftService.get().subscribe((res: any)=>{
            this.aircrafts =  res.data;
        })

        this.airportService.get().subscribe((res: any)=>{
            this.airports =  res.data;
        })
        

        this.form = this.formBuilder.group({
            airport_id: ['', Validators.required],
            aircraft_id: [''],
            quantity: ['', Validators.required],
            transaction_type: ['',Validators.required],
        });

    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.createAircraft();
    }

    private createAircraft() {
        this.transcationService.create(this.form.value)
            .subscribe(
                data => {
                    this.alertService.success('Transaction successfully', { keepAfterRouteChange: true });
                    this.transcationService.get().subscribe((transcation: any) =>{
                        this.router.navigate(['.', { relativeTo: this.route }]);
                    } );
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}