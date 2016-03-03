/// <reference path="../../models.ts"/>

import {Component, View} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control, AbstractControl} from 'angular2/common';
import {Validators} from 'angular2/common';
import {HomeItem} from '../../models';

@Component({
    selector: 'image',
    viewProviders: [FormBuilder]
})
@View({
    templateUrl: './app/components/home/home.html',
    directives: [FORM_DIRECTIVES]
})
export class Home {
    images: Array<HomeItem>;

    fb: FormBuilder;
    myForm: ControlGroup;
    newHome: Control;

    constructor(fb: FormBuilder) {
        this.fb = fb;
        this.images = new Array<HomeItem>();
        this.buildForm();
    }

    buildForm(): void {
        this.newHome = new Control('', Validators.required);

        this.myForm = this.fb.group({
            'newHome': this.newHome
        });
    }

    removeHome(item: HomeItem) {
        this.images.splice(this.images.indexOf(item), 1);
    }

    onSubmit(): void {
        if (this.myForm.valid) {
            this.images.push(new HomeItem(this.newHome.value, false));

            // How in hell do I reset this thing and prevent it from being validated?
            // The only thing that works is rebuilding the whole form/&%¤#""
            this.buildForm();
        }
    }

    toggleAll($event) {
        var isComplete = $event.target.checked;
        this.images.forEach(function(image) {
            image.completed = isComplete;
        });
    }
}
