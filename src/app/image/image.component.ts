import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'image',
  template: ` <img [defaultImage]="defaultImage" [lazyLoad]="image" /> `,
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  constructor() {}
  defaultImage: String = '';
  image: String = '';

  ngOnInit(): void {}
}
