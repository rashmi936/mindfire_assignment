import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, AirportService } from '@app/_services';

@Component({ templateUrl: 'add-edit-airport.component.html' })


export class AddEditAirportComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private airportService: AirportService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
       
        this.form = this.formBuilder.group({
            airport_name: ['', Validators.required],
            fuel_capacity: ['', Validators.required],
            fuel_available: ['', Validators.required]
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
        this.createAirport();
    }

    private createAirport() {
        this.airportService.create(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Airport Create successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['.', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}