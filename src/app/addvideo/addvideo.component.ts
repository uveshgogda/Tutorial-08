import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-addvideo',
  templateUrl: './addvideo.component.html',
  styleUrls: ['./addvideo.component.css']
})
export class AddvideoComponent implements OnInit {

  videoForm!: FormGroup;
  submitted = false;
  constructor(private _authService:AuthService,private _router:Router, private formBuilder: FormBuilder) { 
    this.videoForm = new FormGroup({
      title:new FormControl(''),
      desc:new FormControl(''),
      posted_by:new FormControl(''),
      cat:new FormControl(''),
      likes:new FormControl(''),
      url:new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.videoForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      posted_by: ['', [Validators.required]],
      cat: ['', [Validators.required]],
      likes: ['', [Validators.required]],
      url: ['', [Validators.required]],
    });
  }

  get f() { return this.videoForm.controls; }

  //post video
  postVideo(){
    this.submitted = true;
    if (this.videoForm.invalid) {
      return;
    } else {
      this._authService.postVideo(this.videoForm.value).subscribe(res=>{
        this._router.navigate(['/videos']);
      });
    }
  }

}
