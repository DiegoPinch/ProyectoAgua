import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'gst-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private route: ActivatedRoute) { }
  activeRoute!: string;
  ngOnInit() {
    this.route.url.subscribe(segments => {
      this.activeRoute = segments[0].path;
    });
  }
  activeButton: string | null = null;
  onButtonClick(route: string): void {
    this.activeButton = route;
    localStorage.removeItem('activeTabIndex');
  }
}
